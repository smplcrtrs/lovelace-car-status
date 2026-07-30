import { svg, type SVGTemplateResult } from "lit";
import type { CarArt, CarArtContext, PanelId, TyrePos } from "../types";
import { PANEL_KIND } from "../types";

/**
 * Crude stand-in artwork in the real 303x643 viewBox. Exists so the card,
 * state plumbing and editor can be built and proven before any real drawing
 * happens. Replaced by the SUV preset once that is drawn.
 */

const PANELS: readonly PanelId[] = [
  "bonnet",
  "boot",
  "door_fl",
  "door_fr",
  "door_rl",
  "door_rr",
  "window_fl",
  "window_fr",
  "window_rl",
  "window_rr",
];

const TYRES: readonly TyrePos[] = ["fl", "fr", "rl", "rr"];

// Body envelope
const BODY = { x: 30, y: 15, w: 243, h: 613, r: 46 };
const LEFT_EDGE = BODY.x;
const RIGHT_EDGE = BODY.x + BODY.w;

// Door bands run down each flank; hinges sit at the leading (upper) outer corner.
const DOOR_W = 48;
const FRONT_DOOR = { y: 200, h: 138 };
const REAR_DOOR = { y: 342, h: 136 };

const BONNET = { x: 48, y: 25, w: 207, h: 125, hingeY: 150 };
const BOOT = { x: 48, y: 545, w: 207, h: 75, hingeY: 545 };

const TYRE = { w: 20, h: 58 };
const TYRE_POS: Record<TyrePos, { x: number; y: number }> = {
  fl: { x: 18, y: 198 },
  fr: { x: 265, y: 198 },
  rl: { x: 18, y: 440 },
  rr: { x: 265, y: 440 },
};

interface DoorGeom {
  id: PanelId;
  window: PanelId;
  side: "left" | "right";
  x: number;
  y: number;
  h: number;
  hingeX: number;
  hingeY: number;
}

const DOORS: DoorGeom[] = [
  {
    id: "door_fl",
    window: "window_fl",
    side: "left",
    x: LEFT_EDGE,
    y: FRONT_DOOR.y,
    h: FRONT_DOOR.h,
    hingeX: LEFT_EDGE,
    hingeY: FRONT_DOOR.y,
  },
  {
    id: "door_rl",
    window: "window_rl",
    side: "left",
    x: LEFT_EDGE,
    y: REAR_DOOR.y,
    h: REAR_DOOR.h,
    hingeX: LEFT_EDGE,
    hingeY: REAR_DOOR.y,
  },
  {
    id: "door_fr",
    window: "window_fr",
    side: "right",
    x: RIGHT_EDGE - DOOR_W,
    y: FRONT_DOOR.y,
    h: FRONT_DOOR.h,
    hingeX: RIGHT_EDGE,
    hingeY: FRONT_DOOR.y,
  },
  {
    id: "door_rr",
    window: "window_rr",
    side: "right",
    x: RIGHT_EDGE - DOOR_W,
    y: REAR_DOOR.y,
    h: REAR_DOOR.h,
    hingeX: RIGHT_EDGE,
    hingeY: REAR_DOOR.y,
  },
];

/** Glass sits inboard of the door skin. */
const glassRect = (d: DoorGeom) => ({
  x: d.side === "left" ? d.x + 16 : d.x + 6,
  y: d.y + 10,
  w: DOOR_W - 26,
  h: d.h - 20,
});

const renderDoor = (ctx: CarArtContext, d: DoorGeom): SVGTemplateResult => {
  const g = glassRect(d);
  return svg`
    <g
      class="panel"
      data-panel=${d.id}
      data-kind=${PANEL_KIND[d.id]}
      data-side=${d.side}
      data-state=${ctx.panelState(d.id)}
      style="--hinge-x:${d.hingeX}px;--hinge-y:${d.hingeY}px"
    >
      <rect class="panel-fill" x=${d.x} y=${d.y} width=${DOOR_W} height=${d.h} rx="6" />
      <rect
        class="glass"
        data-panel=${d.window}
        data-kind=${PANEL_KIND[d.window]}
        data-state=${ctx.panelState(d.window)}
        x=${g.x}
        y=${g.y}
        width=${g.w}
        height=${g.h}
        rx="4"
      />
      <rect class="panel-edge" x=${d.x} y=${d.y} width=${DOOR_W} height=${d.h} rx="6" />
    </g>
  `;
};

const renderTyre = (ctx: CarArtContext, pos: TyrePos): SVGTemplateResult => {
  const p = TYRE_POS[pos];
  const label = ctx.tyreReading(pos)?.value;
  return svg`
    <g class="tyre" data-pos=${pos} data-state=${ctx.tyreState(pos)}>
      <rect class="tyre-body" x=${p.x} y=${p.y} width=${TYRE.w} height=${TYRE.h} rx="7" />
      ${
        label
          ? svg`<text class="tyre-value" x=${p.x + TYRE.w / 2} y=${p.y + TYRE.h + 15}>${label}</text>`
          : null
      }
    </g>
  `;
};

const renderLid = (
  ctx: CarArtContext,
  id: "bonnet" | "boot",
  box: { x: number; y: number; w: number; h: number; hingeY: number },
): SVGTemplateResult => svg`
  <g
    class="panel"
    data-panel=${id}
    data-kind=${PANEL_KIND[id]}
    data-state=${ctx.panelState(id)}
    style="--hinge-y:${box.hingeY}px"
  >
    <rect class="panel-fill" x=${box.x} y=${box.y} width=${box.w} height=${box.h} rx="14" />
    <rect class="panel-edge" x=${box.x} y=${box.y} width=${box.w} height=${box.h} rx="14" />
  </g>
`;

const render = (ctx: CarArtContext): SVGTemplateResult => svg`
  <g class="chassis">
    <rect class="body" x=${BODY.x} y=${BODY.y} width=${BODY.w} height=${BODY.h} rx=${BODY.r} />
    <!-- Apertures: revealed when a door rotates away, so the body is never left holed. -->
    ${DOORS.map(
      (d) => svg`
      <rect class="aperture" x=${d.x} y=${d.y} width=${DOOR_W} height=${d.h} rx="6" />
    `,
    )}
    <rect class="roof" x="78" y="195" width="147" height="305" rx="18" />
    <rect class="windscreen" x="62" y="152" width="179" height="42" rx="12" />
  </g>

  ${renderLid(ctx, "bonnet", BONNET)}
  ${renderLid(ctx, "boot", BOOT)}
  ${DOORS.map((d) => renderDoor(ctx, d))}
  ${ctx.showTyres ? TYRES.map((t) => renderTyre(ctx, t)) : null}
`;

export const placeholderArt: CarArt = {
  id: "placeholder",
  label: "Placeholder",
  viewBox: "0 0 303 643",
  panels: PANELS,
  tyres: TYRES,
  render,
};
