import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { fireEvent, type HomeAssistant } from "../ha";
import type { RegionItemConfig, RegionName } from "../card/car-status-card-config";
import { REGION_HINT, REGION_LABEL } from "./labels";
import "./cs-item-row";

@customElement("cs-region-editor")
export class CsRegionEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public items: RegionItemConfig[] = [];
  @property() public region!: RegionName;

  private _emit(items: RegionItemConfig[]): void {
    fireEvent(this, "items-changed", { region: this.region, items });
  }

  private _itemChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const { index, item } = ev.detail;
    const next = [...this.items];
    next[index] = item;
    this._emit(next);
  }

  private _itemRemoved(ev: CustomEvent): void {
    ev.stopPropagation();
    this._emit(this.items.filter((_, i) => i !== ev.detail.index));
  }

  private _itemMoved(ev: CustomEvent): void {
    ev.stopPropagation();
    const { index, to } = ev.detail;
    if (to < 0 || to >= this.items.length) return;
    const next = [...this.items];
    const [moved] = next.splice(index, 1);
    next.splice(to, 0, moved);
    this._emit(next);
  }

  private _add(item: RegionItemConfig): void {
    this._emit([...this.items, item]);
  }

  protected override render() {
    return html`
      <ha-expansion-panel outlined .header=${REGION_LABEL[this.region]}>
        <div class="body">
          <p class="hint">${REGION_HINT[this.region]}</p>

          ${
            this.items.length
              ? this.items.map(
                  (item, index) => html`
                    <cs-item-row
                      .hass=${this.hass}
                      .item=${item}
                      .index=${index}
                      .count=${this.items.length}
                      @item-changed=${this._itemChanged}
                      @item-removed=${this._itemRemoved}
                      @item-moved=${this._itemMoved}
                    ></cs-item-row>
                  `,
                )
              : html`<p class="empty">Nothing here yet.</p>`
          }

          <div class="add">
            <ha-button @click=${() => this._add({ entity: "" })}>
              <ha-icon slot="icon" icon="mdi:plus"></ha-icon>
              Add sensor
            </ha-button>
            <ha-button @click=${() => this._add({ type: "toggle", entity: "" })}>
              <ha-icon slot="icon" icon="mdi:plus"></ha-icon>
              Add control
            </ha-button>
          </div>
        </div>
      </ha-expansion-panel>
    `;
  }

  static override styles = css`
    :host {
      display: block;
      margin-bottom: 8px;
    }
    .body {
      padding: 8px;
    }
    .hint,
    .empty {
      margin: 0 0 10px;
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .add {
      display: flex;
      gap: 8px;
      margin-top: 8px;
      flex-wrap: wrap;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cs-region-editor": CsRegionEditor;
  }
}
