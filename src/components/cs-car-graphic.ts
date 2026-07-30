import { LitElement, css, html, svg, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import { CAR_GRAPHIC_NAME } from "../const";
import { computeCssColor, type HassEntity, type HomeAssistant } from "../ha";
import { getArt, type CarArtContext, type PanelId, type TyrePos } from "../art";
import type { CarStatusCardConfig, OpenStyle } from "../card/car-status-card-config";
import { panelStateFor } from "../util/entity-state";

@customElement(CAR_GRAPHIC_NAME)
export class CsCarGraphic extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @property({ attribute: false }) public config!: CarStatusCardConfig;

  private get _openStyle(): OpenStyle {
    return this.config.open_style ?? "swing";
  }

  private _colorVars(): Record<string, string> {
    const c = this.config.vehicle?.colors ?? {};
    return {
      "--car-body": computeCssColor(c.body ?? "grey"),
      "--car-accent": computeCssColor(c.accent ?? "primary"),
      "--car-open": computeCssColor(c.open ?? "amber"),
      "--car-fault": computeCssColor(c.fault ?? "red"),
      "--car-ok": computeCssColor(c.ok ?? "green"),
    };
  }

  private _context(): CarArtContext {
    const openings = this.config.openings ?? {};
    const tyres = this.config.tyres ?? {};
    return {
      panelState: (id: PanelId) => panelStateFor(this.hass, openings[id]),
      tyreState: (pos: TyrePos) => {
        const warning = tyres[pos]?.warning;
        if (!warning || !this.hass) return "unknown";
        const stateObj = this.hass.states[warning] as HassEntity | undefined;
        if (!stateObj || stateObj.state === "unavailable") return "unavailable";
        if (stateObj.state === "unknown") return "unknown";
        return stateObj.state === "on" ? "warn" : "ok";
      },
      tyreLabel: (pos: TyrePos) => {
        const pressure = tyres[pos]?.pressure;
        if (!pressure || !this.hass) return undefined;
        const stateObj = this.hass.states[pressure] as HassEntity | undefined;
        if (!stateObj || Number.isNaN(Number(stateObj.state))) return undefined;
        return stateObj.state;
      },
    };
  }

  private _ariaLabel(ctx: CarArtContext, panels: readonly PanelId[]): string {
    const open = panels.filter((p) => ctx.panelState(p) === "open");
    return open.length ? `Car: ${open.join(", ").replace(/_/g, " ")} open` : "Car: all closed";
  }

  protected override render() {
    if (!this.config) return nothing;
    const art = getArt(this.config.vehicle?.preset);
    const ctx = this._context();

    return html`
      <svg
        viewBox=${art.viewBox}
        class=${`style-${this._openStyle}`}
        style=${styleMap(this._colorVars())}
        role="img"
        aria-label=${this._ariaLabel(ctx, art.panels)}
      >
        ${svg`${art.render(ctx)}`}
      </svg>
    `;
  }

  static override styles = css`
    :host {
      display: block;
    }

    svg {
      display: block;
      width: 100%;
      height: 100%;
      max-height: var(--car-max-height, 320px);
      margin: 0 auto;
      overflow: visible;
    }

    /* ---- chassis ---- */
    .body {
      fill: var(--car-body);
      opacity: 0.55;
    }
    .aperture {
      fill: var(--card-background-color, #1c1c1c);
    }
    .roof,
    .windscreen {
      fill: var(--car-body);
      opacity: 0.85;
    }

    /* ---- panels ---- */
    .panel-fill {
      fill: var(--car-body);
      transition: fill 0.3s ease;
    }
    .panel-edge {
      fill: none;
      stroke: var(--car-accent);
      stroke-width: 1;
      opacity: 0.5;
      transition:
        stroke 0.3s ease,
        stroke-width 0.3s ease,
        opacity 0.3s ease;
    }
    .glass {
      fill: var(--car-accent);
      opacity: 0.28;
      transition:
        fill 0.3s ease,
        opacity 0.3s ease;
    }

    .panel[data-state="open"] .panel-fill {
      fill: var(--car-open);
    }
    .panel[data-state="open"] .panel-edge {
      stroke: var(--car-open);
      stroke-width: 2.5;
      opacity: 1;
    }
    .panel[data-state="unavailable"] .panel-fill {
      fill: var(--disabled-color, #6f6f6f);
    }
    .panel[data-state="unknown"] .panel-fill {
      opacity: 0.4;
    }

    .glass[data-state="open"] {
      fill: var(--car-open);
      opacity: 0.85;
    }

    /* ---- motion ----
       transform-box: view-box (not fill-box) so transform-origin resolves in
       viewBox user units and the hinge lands where the geometry says it does. */
    .panel[data-kind="door"],
    .panel[data-kind="lid"] {
      transform-box: view-box;
      transition: transform 420ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .panel[data-kind="door"] {
      transform-origin: var(--hinge-x) var(--hinge-y);
    }
    .panel[data-kind="lid"] {
      transform-origin: 50% var(--hinge-y);
    }

    svg:not(.style-highlight) .panel[data-kind="door"][data-side="left"][data-state="open"] {
      transform: rotate(24deg);
    }
    svg:not(.style-highlight) .panel[data-kind="door"][data-side="right"][data-state="open"] {
      transform: rotate(-24deg);
    }
    /* A lid lifting towards the viewer foreshortens; it does not swing. */
    svg:not(.style-highlight) .panel[data-kind="lid"][data-state="open"] {
      transform: scaleY(0.55);
    }

    /* ---- tyres ---- */
    .tyre-body {
      fill: var(--car-body);
      opacity: 0.8;
      transition: fill 0.3s ease;
    }
    .tyre[data-state="warn"] .tyre-body {
      fill: var(--car-fault);
      opacity: 1;
    }
    .tyre[data-state="unavailable"] .tyre-body {
      fill: var(--disabled-color, #6f6f6f);
    }
    .tyre-label {
      fill: var(--secondary-text-color, #9b9b9b);
      font-size: 15px;
      text-anchor: middle;
    }
    .tyre[data-state="warn"] .tyre-label {
      fill: var(--car-fault);
    }

    @media (prefers-reduced-motion: reduce) {
      .panel,
      .panel-fill,
      .panel-edge,
      .glass,
      .tyre-body {
        transition: none;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "cs-car-graphic": CsCarGraphic;
  }
}
