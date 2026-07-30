import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { computeCssColor, handleAction, type HassEntity, type HomeAssistant } from "../ha";
import type { ControlItemConfig } from "../card/car-status-card-config";

const ACTIVE_STATES = new Set(["on", "unlocked", "open", "heat", "cool", "heat_cool", "auto"]);

const DEFAULT_ICON: Record<string, string> = {
  lock: "mdi:lock",
  toggle: "mdi:toggle-switch",
  button: "mdi:gesture-tap-button",
  climate: "mdi:thermostat",
  action: "mdi:play",
};

@customElement("cs-control-button")
export class CsControlButton extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public item!: ControlItemConfig;

  private _stateObj(): HassEntity | undefined {
    if (!this.hass || !this.item?.entity) return undefined;
    return this.hass.states[this.item.entity] as HassEntity | undefined;
  }

  private get _unavailable(): boolean {
    if (this.item?.type === "action") return !this.hass;
    const stateObj = this._stateObj();
    return !stateObj || stateObj.state === "unavailable";
  }

  private get _active(): boolean {
    const stateObj = this._stateObj();
    return !!stateObj && ACTIVE_STATES.has(stateObj.state);
  }

  private _activate() {
    if (!this.hass || this._unavailable) return;
    const { type, entity, confirm } = this.item;

    if (confirm && !window.confirm(confirm)) return;

    switch (type) {
      case "lock": {
        const service = this._stateObj()?.state === "locked" ? "unlock" : "lock";
        void this.hass.callService("lock", service, { entity_id: entity });
        break;
      }
      case "toggle":
        void this.hass.callService("homeassistant", "toggle", { entity_id: entity });
        break;
      case "button":
        void this.hass.callService("button", "press", { entity_id: entity });
        break;
      case "climate":
      case "action":
        if (this.item.tap_action) {
          handleAction(this, this.hass, this.item.tap_action, entity);
        } else if (entity) {
          handleAction(this, this.hass, { action: "more-info" }, entity);
        }
        break;
    }
  }

  private _setTemperature(value: number) {
    if (!this.hass || !this.item.entity) return;
    void this.hass.callService("climate", "set_temperature", {
      entity_id: this.item.entity,
      temperature: value,
    });
  }

  private _renderClimate() {
    const stateObj = this._stateObj();
    const current = Number(stateObj?.attributes.temperature);
    const min = this.item.min ?? Number(stateObj?.attributes.min_temp ?? 16);
    const max = this.item.max ?? Number(stateObj?.attributes.max_temp ?? 30);
    const step = this.item.step ?? Number(stateObj?.attributes.target_temp_step ?? 0.5);
    const value = Number.isFinite(current) ? current : min;

    return html`
      <div class="stepper">
        <button
          class="step"
          ?disabled=${this._unavailable || value <= min}
          @click=${() => this._setTemperature(Math.max(min, value - step))}
          aria-label="Decrease temperature"
        >
          −
        </button>
        <span class="temp">${Number.isFinite(current) ? `${current}°` : "—"}</span>
        <button
          class="step"
          ?disabled=${this._unavailable || value >= max}
          @click=${() => this._setTemperature(Math.min(max, value + step))}
          aria-label="Increase temperature"
        >
          +
        </button>
      </div>
    `;
  }

  protected override render() {
    if (!this.item) return nothing;

    const stateObj = this._stateObj();
    const name =
      this.item.name ?? stateObj?.attributes.friendly_name ?? this.item.entity ?? this.item.type;
    const color = this.item.color ? computeCssColor(this.item.color) : undefined;

    // With an entity, ha-state-icon picks a state-aware icon (a lock shows
    // open vs closed). Without one, only the control type tells us anything.
    const icon = stateObj
      ? html`<ha-state-icon
          class="icon"
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${this.item.icon}
        ></ha-state-icon>`
      : html`<ha-icon
          class="icon"
          .icon=${this.item.icon ?? DEFAULT_ICON[this.item.type] ?? "mdi:car"}
        ></ha-icon>`;

    return html`
      <div
        class="control"
        data-active=${this._active}
        data-unavailable=${this._unavailable}
        style=${color ? `--control-accent:${color}` : ""}
      >
        <button class="main" ?disabled=${this._unavailable} @click=${this._activate} title=${name}>
          ${icon}
          <span class="label">${name}</span>
        </button>
        ${this.item.type === "climate" ? this._renderClimate() : nothing}
      </div>
    `;
  }

  static override styles = css`
    .control {
      --control-accent: var(--primary-color);
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .main {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1 1 auto;
      min-width: 0;
      padding: 8px;
      border: none;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .main:hover:not(:disabled) {
      background: rgba(127, 127, 127, 0.24);
    }
    .main:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .icon {
      flex: 0 0 auto;
      --mdc-icon-size: 20px;
    }
    .label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.9em;
    }

    .control[data-active="true"] .main {
      background: color-mix(in srgb, var(--control-accent) 22%, transparent);
      color: var(--control-accent);
    }
    .control[data-active="true"] .icon {
      color: var(--control-accent);
    }

    .stepper {
      display: flex;
      align-items: center;
      gap: 2px;
      flex: 0 0 auto;
    }
    .step {
      width: 30px;
      height: 30px;
      border: none;
      border-radius: 8px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
      color: var(--primary-text-color);
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
    }
    .step:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
    .temp {
      min-width: 44px;
      text-align: center;
      font-weight: 500;
      font-variant-numeric: tabular-nums;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cs-control-button": CsControlButton;
  }
}
