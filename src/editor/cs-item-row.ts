import { LitElement, css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, type HomeAssistant } from "../ha";
import {
  isControl,
  type ControlItemConfig,
  type ControlType,
  type RegionItemConfig,
} from "../card/car-status-card-config";
import { CONTROL_ICON, CONTROL_LABEL } from "./labels";
import type { FormSchema } from "./schema";

const colorSelector = { ui_color: { include_none: true, default_color: "state" } };

const commonSchema: FormSchema[] = [
  { name: "name", label: "Name", selector: { text: {} } },
  {
    name: "icon",
    label: "Icon",
    // Left empty the card falls back to the entity's own icon, so this is an
    // override rather than something the user has to fill in.
    selector: { icon: {} },
  },
  { name: "color", label: "Colour", selector: colorSelector },
];

const sensorSchema: FormSchema[] = [
  { name: "entity", label: "Entity", selector: { entity: {} } },
  ...commonSchema,
  {
    name: "display",
    label: "Show as",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "text", label: "Text" },
          { value: "gauge", label: "Gauge" },
          { value: "bar", label: "Bar" },
        ],
      },
    },
  },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "min", label: "Minimum", selector: { number: { mode: "box" } } },
      { name: "max", label: "Maximum", selector: { number: { mode: "box" } } },
    ],
  },
];

const controlSchema = (type: ControlType): FormSchema[] => [
  {
    name: "type",
    label: "Control type",
    selector: {
      select: {
        mode: "dropdown",
        options: (Object.keys(CONTROL_LABEL) as ControlType[]).map((t) => ({
          value: t,
          label: CONTROL_LABEL[t],
        })),
      },
    },
  },
  // A custom action runs whatever you give it, so it needs no entity.
  ...(type === "action"
    ? [{ name: "tap_action", label: "Action", selector: { ui_action: {} } }]
    : [{ name: "entity", label: "Entity", selector: { entity: {} } }]),
  ...commonSchema,
  ...(type === "climate"
    ? [
        {
          name: "",
          type: "grid" as const,
          schema: [
            { name: "min", label: "Minimum", selector: { number: { mode: "box" } } },
            { name: "max", label: "Maximum", selector: { number: { mode: "box" } } },
            { name: "step", label: "Step", selector: { number: { mode: "box", step: 0.5 } } },
          ],
        },
      ]
    : []),
  { name: "confirm", label: "Confirmation prompt", selector: { text: {} } },
];

@customElement("cs-item-row")
export class CsItemRow extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public item!: RegionItemConfig;
  @property({ type: Number }) public index = 0;
  @property({ type: Number }) public count = 1;

  private get _schema(): FormSchema[] {
    return isControl(this.item)
      ? controlSchema((this.item as ControlItemConfig).type)
      : sensorSchema;
  }

  private _summary(): string {
    const stateObj = this.item.entity ? this.hass?.states[this.item.entity] : undefined;
    return (
      this.item.name ??
      stateObj?.attributes.friendly_name ??
      this.item.entity ??
      (isControl(this.item) ? CONTROL_LABEL[(this.item as ControlItemConfig).type] : "Sensor")
    );
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = { ...(ev.detail.value as RegionItemConfig) };

    // ha-form emits "" for cleared text fields; drop them so the YAML stays
    // clean and the card's own fallbacks kick back in.
    for (const [k, v] of Object.entries(value)) {
      if (v === "" || v === undefined) delete (value as Record<string, unknown>)[k];
    }
    fireEvent(this, "item-changed", { index: this.index, item: value });
  }

  private _move(offset: number, ev: Event): void {
    ev.stopPropagation();
    fireEvent(this, "item-moved", { index: this.index, to: this.index + offset });
  }

  private _remove(ev: Event): void {
    ev.stopPropagation();
    fireEvent(this, "item-removed", { index: this.index });
  }

  protected override render() {
    const control = isControl(this.item);
    const icon = control
      ? (this.item.icon ?? CONTROL_ICON[(this.item as ControlItemConfig).type])
      : this.item.icon;

    return html`
      <ha-expansion-panel outlined>
        <div slot="header" class="header">
          ${
            icon
              ? html`<ha-icon .icon=${icon}></ha-icon>`
              : html`<ha-state-icon
                  .hass=${this.hass}
                  .stateObj=${this.item.entity ? this.hass?.states[this.item.entity] : undefined}
                ></ha-state-icon>`
          }
          <span class="title">${this._summary()}</span>
          <span class="kind">${control ? "Control" : "Sensor"}</span>
        </div>

        <div class="body">
          <ha-form
            .hass=${this.hass}
            .data=${this.item}
            .schema=${this._schema}
            .computeLabel=${(s: FormSchema) => s.label ?? s.name}
            @value-changed=${this._valueChanged}
          ></ha-form>

          <div class="actions">
            <ha-icon-button
              .disabled=${this.index === 0}
              .path=${"M7,15L12,10L17,15H7Z"}
              label="Move up"
              @click=${(e: Event) => this._move(-1, e)}
            ></ha-icon-button>
            <ha-icon-button
              .disabled=${this.index === this.count - 1}
              .path=${"M7,10L12,15L17,10H7Z"}
              label="Move down"
              @click=${(e: Event) => this._move(1, e)}
            ></ha-icon-button>
            <span class="spacer"></span>
            <ha-icon-button
              class="remove"
              .path=${"M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"}
              label="Remove"
              @click=${this._remove}
            ></ha-icon-button>
          </div>
        </div>
      </ha-expansion-panel>
      ${nothing}
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }
    ha-expansion-panel {
      --expansion-panel-summary-padding: 0 8px;
      margin-bottom: 6px;
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .kind {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--secondary-text-color);
    }
    .body {
      padding: 8px;
    }
    .actions {
      display: flex;
      align-items: center;
      margin-top: 4px;
    }
    .spacer {
      flex: 1;
    }
    .remove {
      color: var(--error-color, #db4437);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cs-item-row": CsItemRow;
  }
}
