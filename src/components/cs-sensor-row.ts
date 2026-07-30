import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { computeCssColor, fireEvent, type HassEntity, type HomeAssistant } from "../ha";
import type { SensorItemConfig } from "../card/car-status-card-config";

@customElement("cs-sensor-row")
export class CsSensorRow extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public item!: SensorItemConfig;

  private _stateObj(): HassEntity | undefined {
    if (!this.hass || !this.item?.entity) return undefined;
    return this.hass.states[this.item.entity] as HassEntity | undefined;
  }

  private _showMoreInfo() {
    if (!this.item?.entity) return;
    fireEvent(this, "hass-more-info", { entityId: this.item.entity });
  }

  protected override render() {
    if (!this.item) return nothing;
    const stateObj = this._stateObj();
    const name = this.item.name ?? stateObj?.attributes.friendly_name ?? this.item.entity;

    let value = "—";
    if (stateObj) {
      value = this.hass?.formatEntityState
        ? this.hass.formatEntityState(stateObj)
        : `${stateObj.state}${
            stateObj.attributes.unit_of_measurement
              ? ` ${stateObj.attributes.unit_of_measurement}`
              : ""
          }`;
    }

    const color = this.item.color ? computeCssColor(this.item.color) : undefined;

    return html`
      <button class="row" @click=${this._showMoreInfo} title=${name}>
        <!-- ha-state-icon resolves config icon > entity icon > device_class > domain. -->
        <ha-state-icon
          class="icon"
          .hass=${this.hass}
          .stateObj=${stateObj}
          .icon=${this.item.icon}
          style=${color ? `color:${color}` : ""}
        ></ha-state-icon>
        <span class="name">${name}</span>
        <span class="value">${value}</span>
      </button>
    `;
  }

  static override styles = css`
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 6px 8px;
      border: none;
      border-radius: 10px;
      background: none;
      color: var(--primary-text-color);
      font: inherit;
      text-align: left;
      cursor: pointer;
    }
    .row:hover {
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.12));
    }
    .icon {
      flex: 0 0 auto;
      color: var(--state-icon-color, var(--paper-item-icon-color));
      --mdc-icon-size: 20px;
    }
    .name {
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 0.9em;
    }
    .value {
      flex: 0 0 auto;
      font-weight: 500;
      white-space: nowrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cs-sensor-row": CsSensorRow;
  }
}
