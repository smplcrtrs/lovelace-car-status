import type { PanelId, TyrePos } from "../art";
import type { ControlType, RegionName } from "../card/car-status-card-config";

export const PANEL_LABEL: Record<PanelId, string> = {
  door_fl: "Front left door",
  door_fr: "Front right door",
  door_rl: "Rear left door",
  door_rr: "Rear right door",
  window_fl: "Front left window",
  window_fr: "Front right window",
  window_rl: "Rear left window",
  window_rr: "Rear right window",
  bonnet: "Bonnet",
  boot: "Boot",
  sunroof: "Sunroof",
};

export const TYRE_LABEL: Record<TyrePos, string> = {
  fl: "Front left",
  fr: "Front right",
  rl: "Rear left",
  rr: "Rear right",
};

export const REGION_LABEL: Record<RegionName, string> = {
  above: "Above the car",
  left: "Left of the car",
  right: "Right of the car",
  below: "Below the car",
};

export const REGION_HINT: Record<RegionName, string> = {
  above: "Runs the full width. Controls here form a button row.",
  left: "A column beside the car. Drops below it on narrow screens.",
  right: "A column beside the car. Drops below it on narrow screens.",
  below: "Runs the full width. Controls here form a button row.",
};

export const CONTROL_LABEL: Record<ControlType, string> = {
  lock: "Lock / unlock",
  toggle: "Toggle",
  button: "Button",
  climate: "Climate setpoint",
  action: "Custom action",
};

/** Fallback icons for controls, used before an entity is chosen. */
export const CONTROL_ICON: Record<ControlType, string> = {
  lock: "mdi:lock",
  toggle: "mdi:toggle-switch",
  button: "mdi:gesture-tap-button",
  climate: "mdi:thermostat",
  action: "mdi:flash",
};
