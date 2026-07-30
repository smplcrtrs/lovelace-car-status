import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { CARD_NAME } from "../const";
import type { HomeAssistant, LovelaceCard, LovelaceGridOptions } from "../ha";
import {
  validateConfig,
  type CarStatusCardConfig,
  type RegionName,
  type SensorItemConfig,
} from "./car-status-card-config";
import "../components/cs-car-graphic";
import "../components/cs-sensor-row";

@customElement(CARD_NAME)
export class CarStatusCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ type: Boolean }) public preview = false;
  @state() private _config?: CarStatusCardConfig;

  public setConfig(config: CarStatusCardConfig): void {
    this._config = validateConfig(config);
  }

  public getCardSize(): number {
    return 8;
  }

  public getGridOptions(): LovelaceGridOptions {
    return { columns: 6, min_columns: 4, min_rows: 6, rows: 9 };
  }

  private _items(region: RegionName): SensorItemConfig[] {
    return this._config?.regions?.[region] ?? [];
  }

  private _renderRegion(region: RegionName) {
    const items = this._items(region);
    if (!items.length) return nothing;
    return html`
      <div class="region region-${region}">
        ${items.map(
          (item) => html`<cs-sensor-row .hass=${this.hass} .item=${item}></cs-sensor-row>`,
        )}
      </div>
    `;
  }

  protected override render() {
    if (!this._config) return nothing;

    return html`
      <ha-card .header=${this._config.name}>
        <div class="content">
          ${this._renderRegion("above")}
          <div class="middle">
            ${this._renderRegion("left")}
            <cs-car-graphic .hass=${this.hass} .config=${this._config}></cs-car-graphic>
            ${this._renderRegion("right")}
          </div>
          ${this._renderRegion("below")}
        </div>
      </ha-card>
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }
    .content {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 12px;
      container-type: inline-size;
    }
    .middle {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .middle cs-car-graphic {
      flex: 1 1 40%;
      min-width: 0;
    }
    .region {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .region-left,
    .region-right {
      flex: 1 1 30%;
    }

    /* Flanking columns need somewhere to go once the card gets narrow. */
    @container (max-width: 460px) {
      .middle {
        flex-direction: column;
        align-items: stretch;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "car-status-card": CarStatusCard;
  }
}
