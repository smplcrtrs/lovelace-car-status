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
      showTyres: Object.values(tyres).some((t) => t?.pressure || t?.warning),
      panelState: (id: PanelId) => panelStateFor(this.hass, openings[id]),
      tyreState: (pos: TyrePos) => {
        const warning = tyres[pos]?.warning;
        if (!warning || !this.hass) return "unknown";
        const stateObj = this.hass.states[warning] as HassEntity | undefined;
        if (!stateObj || stateObj.state === "unavailable") return "unavailable";
        if (stateObj.state === "unknown") return "unknown";
        return stateObj.state === "on" ? "warn" : "ok";
      },
      tyreReading: (pos: TyrePos) => {
        const pressure = tyres[pos]?.pressure;
        if (!pressure || !this.hass) return undefined;
        const stateObj = this.hass.states[pressure] as HassEntity | undefined;
        if (!stateObj || Number.isNaN(Number(stateObj.state))) return undefined;
        return { value: stateObj.state, unit: stateObj.attributes.unit_of_measurement };
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
      max-height: var(--car-max-height, 380px);
      margin: 0 auto;
      overflow: visible;
    }

    /* Outline derived from the body colour so any body colour keeps its edges. */
    svg {
      --car-line: color-mix(in srgb, var(--car-body) 45%, #000);
      --car-shade: color-mix(in srgb, var(--car-body) 82%, #000);
      --car-glass: color-mix(in srgb, var(--car-body) 55%, #4a6b82);
    }

    /* ---- chassis ---- */
    .body {
      fill: var(--car-shade);
      stroke: var(--car-line);
      stroke-width: 2;
    }
    .aperture {
      fill: color-mix(in srgb, var(--car-body) 30%, #000);
    }
    .roof {
      fill: var(--car-body);
      stroke: var(--car-line);
      stroke-width: 1.5;
    }
    .windscreen {
      fill: var(--car-glass);
      stroke: var(--car-line);
      stroke-width: 1.5;
    }
    .lamp {
      fill: #f3e3b8;
      opacity: 0.85;
    }
    .lamp.tail {
      fill: var(--car-fault);
      opacity: 0.75;
    }
    .mirror {
      fill: var(--car-shade);
      stroke: var(--car-line);
      stroke-width: 1.5;
    }

    /* ---- panels ---- */
    .panel-fill {
      fill: var(--car-body);
      transition: fill 0.3s ease;
    }
    .panel-edge {
      fill: none;
      stroke: var(--car-line);
      stroke-width: 1.5;
      transition:
        stroke 0.3s ease,
        stroke-width 0.3s ease;
    }
    .glass {
      fill: var(--car-glass);
      stroke: var(--car-line);
      stroke-width: 1;
      transition:
        fill 0.3s ease,
        opacity 0.3s ease;
    }

    .panel[data-state="open"] .panel-fill {
      fill: var(--car-open);
    }
    .panel[data-state="open"] .panel-edge {
      stroke: color-mix(in srgb, var(--car-open) 55%, #000);
      stroke-width: 2;
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
      fill: #33383d;
      stroke: var(--car-line);
      stroke-width: 1.5;
      transition:
        fill 0.3s ease,
        stroke 0.3s ease;
    }
    .tyre[data-state="ok"] .tyre-body {
      stroke: var(--car-ok);
    }
    .tyre[data-state="warn"] .tyre-body {
      fill: var(--car-fault);
      stroke: color-mix(in srgb, var(--car-fault) 55%, #000);
    }
    .tyre[data-state="unavailable"] .tyre-body {
      fill: var(--disabled-color, #6f6f6f);
    }
    .tyre-value {
      fill: var(--primary-text-color, #e1e1e1);
      font-size: 34px;
      font-weight: 600;
      text-anchor: middle;
    }
    .tyre-unit {
      fill: var(--secondary-text-color, #9b9b9b);
      font-size: 22px;
      text-anchor: middle;
    }
    .tyre[data-state="warn"] .tyre-value,
    .tyre[data-state="warn"] .tyre-unit {
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
