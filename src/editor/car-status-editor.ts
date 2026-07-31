import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { EDITOR_NAME } from "../const";
import { fireEvent, type HomeAssistant, type LovelaceCardEditor } from "../ha";
import {
  REGIONS,
  type CarStatusCardConfig,
  type RegionItemConfig,
  type RegionName,
} from "../card/car-status-card-config";
import { buildSchema, openingsFromForm, openingsToForm, type FormSchema } from "./schema";
import "./cs-region-editor";

@customElement(EDITOR_NAME)
export class CarStatusEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: CarStatusCardConfig;

  public setConfig(config: CarStatusCardConfig): void {
    this._config = config;
  }

  /**
   * What ha-form binds to. Openings are flattened to entity ids; everything
   * else maps straight across.
   */
  private get _formData() {
    return { ...this._config, openings: openingsToForm(this._config?.openings) };
  }

  private _emit(config: CarStatusCardConfig): void {
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const form = ev.detail.value as Record<string, unknown>;

    const config: CarStatusCardConfig = {
      ...this._config,
      ...form,
      openings: openingsFromForm(
        form.openings as Record<string, string>,
        this._config.openings,
      ) as CarStatusCardConfig["openings"],
    };

    // ha-form reports cleared fields as "", which would override the card's
    // own defaults with an empty value.
    for (const key of ["name", "open_style"] as const) {
      if (config[key] === "") delete config[key];
    }
    this._emit(config);
  }

  private _itemsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const { region, items } = ev.detail as { region: RegionName; items: RegionItemConfig[] };
    const regions = { ...this._config.regions, [region]: items };
    if (!items.length) delete regions[region];

    // Don't leave `regions: {}` behind once the last row goes.
    const config: CarStatusCardConfig = { ...this._config, regions };
    if (!Object.keys(regions).length) delete config.regions;
    this._emit(config);
  }

  private _computeLabel = (schema: FormSchema) => schema.label ?? schema.name;

  protected override render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._formData}
          .schema=${buildSchema(this._config)}
          .computeLabel=${this._computeLabel}
          @value-changed=${this._valueChanged}
        ></ha-form>

        <h3>Sensors and controls</h3>
        <p class="hint">
          Rows are grouped by where they sit around the car. Leave an icon blank to use the entity's
          own.
        </p>

        ${REGIONS.map(
          (region) => html`
            <cs-region-editor
              .hass=${this.hass}
              .region=${region}
              .items=${this._config?.regions?.[region] ?? []}
              @items-changed=${this._itemsChanged}
            ></cs-region-editor>
          `,
        )}
      </div>
    `;
  }

  static override styles = css`
    .editor {
      display: flex;
      flex-direction: column;
    }
    h3 {
      margin: 20px 0 4px;
      font-size: 15px;
      font-weight: 500;
    }
    .hint {
      margin: 0 0 12px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "car-status-card-editor": CarStatusEditor;
  }
}
