import { svg, type SVGTemplateResult } from "lit";
import type { CarArt, CarArtContext, DoorId, PanelId, TyrePos, WindowId } from "../types";
import { PANEL_KIND } from "../types";
import {
  BODY,
  BONNET,
  BONNET_HINGE_Y,
  BOOT,
  BOOT_HINGE_Y,
  DOOR_FRONT_L,
  DOOR_REAR_L,
  GLASS_FRONT_L,
  GLASS_REAR_L,
  HEADLIGHT_L,
  HINGE_FRONT_L,
  HINGE_REAR_L,
  MIRROR_L,
  REAR_WINDOW,
  ROOF,
  TAILLIGHT_L,
  TYRE,
  TYRE_POS,
  VIEW_BOX,
  VIEW_W,
  WINDSCREEN,
  mirrorPath,
} from "./geometry";

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

interface Door {
  id: DoorId;
  window: WindowId;
  side: "left" | "right";
  skin: string;
  glass: string;
  hinge: { x: number; y: number };
}

const DOORS: Door[] = [
  {
    id: "door_fl",
    window: "window_fl",
    side: "left",
    skin: DOOR_FRONT_L,
    glass: GLASS_FRONT_L,
    hinge: HINGE_FRONT_L,
  },
  {
    id: "door_rl",
    window: "window_rl",
    side: "left",
    skin: DOOR_REAR_L,
    glass: GLASS_REAR_L,
    hinge: HINGE_REAR_L,
  },
  {
    id: "door_fr",
    window: "window_fr",
    side: "right",
    skin: mirrorPath(DOOR_FRONT_L),
    glass: mirrorPath(GLASS_FRONT_L),
    hinge: { x: VIEW_W - HINGE_FRONT_L.x, y: HINGE_FRONT_L.y },
  },
  {
    id: "door_rr",
    window: "window_rr",
    side: "right",
    skin: mirrorPath(DOOR_REAR_L),
    glass: mirrorPath(GLASS_REAR_L),
    hinge: { x: VIEW_W - HINGE_REAR_L.x, y: HINGE_REAR_L.y },
  },
];

const renderDoor = (ctx: CarArtContext, d: Door): SVGTemplateResult => svg`
  <g
    class="panel"
    data-panel=${d.id}
    data-kind=${PANEL_KIND[d.id]}
    data-side=${d.side}
    data-state=${ctx.panelState(d.id)}
    style="--hinge-x:${d.hinge.x}px;--hinge-y:${d.hinge.y}px"
  >
    <path class="panel-fill" d=${d.skin} />
    <path
      class="glass"
      data-panel=${d.window}
      data-state=${ctx.panelState(d.window)}
      d=${d.glass}
    />
    <path class="panel-edge" d=${d.skin} />
  </g>
`;

const renderLid = (
  ctx: CarArtContext,
  id: "bonnet" | "boot",
  d: string,
  hingeY: number,
): SVGTemplateResult => svg`
  <g
    class="panel"
    data-panel=${id}
    data-kind=${PANEL_KIND[id]}
    data-state=${ctx.panelState(id)}
    style="--hinge-y:${hingeY}px"
  >
    <path class="panel-fill" d=${d} />
    <path class="panel-edge" d=${d} />
  </g>
`;

const renderTyre = (ctx: CarArtContext, pos: TyrePos): SVGTemplateResult => {
  const p = TYRE_POS[pos];
  const reading = ctx.tyreReading(pos);
  const baseY = p.y + TYRE.h + 30;
  return svg`
    <g class="tyre" data-pos=${pos} data-state=${ctx.tyreState(pos)}>
      <rect
        class="tyre-body"
        x=${p.x}
        y=${p.y}
        width=${TYRE.w}
        height=${TYRE.h}
        rx=${TYRE.rx}
      />
      ${
        reading
          ? svg`
            <text class="tyre-value" x=${p.cx} y=${baseY}>${reading.value}</text>
            ${
              reading.unit
                ? svg`<text class="tyre-unit" x=${p.cx} y=${baseY + 22}>${reading.unit}</text>`
                : null
            }
          `
          : null
      }
    </g>
  `;
};

const render = (ctx: CarArtContext): SVGTemplateResult => svg`
  ${ctx.showTyres ? TYRES.map((t) => renderTyre(ctx, t)) : null}

  <g class="chassis">
    <path class="body" d=${BODY} />
    <!-- Apertures: revealed when a door swings away, so the body is never holed. -->
    ${DOORS.map((d) => svg`<path class="aperture" d=${d.skin} />`)}
    <rect
      class="roof"
      x=${ROOF.x}
      y=${ROOF.y}
      width=${ROOF.w}
      height=${ROOF.h}
      rx=${ROOF.rx}
    />
    <path class="windscreen" d=${WINDSCREEN} />
    <path class="windscreen" d=${REAR_WINDOW} />
    <path class="lamp" d=${HEADLIGHT_L} />
    <path class="lamp" d=${mirrorPath(HEADLIGHT_L)} />
    <path class="lamp tail" d=${TAILLIGHT_L} />
    <path class="lamp tail" d=${mirrorPath(TAILLIGHT_L)} />
  </g>

  ${renderLid(ctx, "bonnet", BONNET, BONNET_HINGE_Y)}
  ${renderLid(ctx, "boot", BOOT, BOOT_HINGE_Y)}
  ${DOORS.map((d) => renderDoor(ctx, d))}

  <path class="mirror" d=${MIRROR_L} />
  <path class="mirror" d=${mirrorPath(MIRROR_L)} />
`;

export const suvArt: CarArt = {
  id: "suv",
  label: "SUV",
  viewBox: VIEW_BOX,
  panels: PANELS,
  tyres: TYRES,
  render,
};
