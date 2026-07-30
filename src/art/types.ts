import type { SVGTemplateResult } from "lit";

export type DoorId = "door_fl" | "door_fr" | "door_rl" | "door_rr";
export type WindowId = "window_fl" | "window_fr" | "window_rl" | "window_rr";
export type PanelId = DoorId | WindowId | "bonnet" | "boot" | "sunroof";

export type TyrePos = "fl" | "fr" | "rl" | "rr";

/** Drives which CSS motion rule applies to a panel. */
export type PanelKind = "door" | "lid" | "glass";

export const PANEL_KIND: Record<PanelId, PanelKind> = {
  door_fl: "door",
  door_fr: "door",
  door_rl: "door",
  door_rr: "door",
  window_fl: "glass",
  window_fr: "glass",
  window_rl: "glass",
  window_rr: "glass",
  sunroof: "glass",
  bonnet: "lid",
  boot: "lid",
};

export type PanelState = "closed" | "open" | "unknown" | "unavailable";
export type TyreState = "ok" | "warn" | "unknown" | "unavailable";

/** Passed into artwork so panels render their own state declaratively. */
export interface CarArtContext {
  panelState(id: PanelId): PanelState;
  tyreState(pos: TyrePos): TyreState;
  tyreLabel(pos: TyrePos): string | undefined;
}

/**
 * A piece of car artwork. The editor reads `panels` to decide which opening
 * pickers to offer, so adding a new body style is a new module plus one
 * registry line — no card or editor change.
 */
export interface CarArt {
  id: string;
  label: string;
  viewBox: string;
  panels: readonly PanelId[];
  tyres: readonly TyrePos[];
  render(ctx: CarArtContext): SVGTemplateResult;
}
