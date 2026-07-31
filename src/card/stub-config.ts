import type { PanelId } from "../art";
import type { HomeAssistant } from "../ha";
import type { CarStatusCardConfig } from "./car-status-card-config";

/**
 * Substrings that identify each opening in an entity id. Integrations name
 * these inconsistently (hood vs bonnet, trunk vs boot, back vs rear), so each
 * panel lists the spellings seen in the wild.
 */
const PANEL_PATTERNS: Record<PanelId, string[]> = {
  door_fl: ["front_left_door", "door_front_left"],
  door_fr: ["front_right_door", "door_front_right"],
  door_rl: ["back_left_door", "rear_left_door", "door_rear_left"],
  door_rr: ["back_right_door", "rear_right_door", "door_rear_right"],
  window_fl: ["front_left_window", "window_front_left"],
  window_fr: ["front_right_window", "window_front_right"],
  window_rl: ["back_left_window", "rear_left_window", "window_rear_left"],
  window_rr: ["back_right_window", "rear_right_window", "window_rear_right"],
  bonnet: ["hood", "bonnet"],
  boot: ["trunk", "boot", "tailgate"],
  sunroof: ["sunroof"],
};

const TYRE_PATTERNS: Record<string, string[]> = {
  fl: ["front_left", "_fl_"],
  fr: ["front_right", "_fr_"],
  rl: ["back_left", "rear_left", "_rl_"],
  rr: ["back_right", "rear_right", "_rr_"],
};

const find = (ids: string[], domain: string, needles: string[]): string | undefined =>
  ids.find((id) => id.startsWith(`${domain}.`) && needles.some((n) => id.includes(n)));

/**
 * A best-effort starting point for the card picker preview and a new card.
 * Everything here is a guess the user can correct in the editor, so it errs
 * towards leaving a field out rather than filling it in wrongly.
 */
export const buildStubConfig = (hass: HomeAssistant | undefined, type: string) => {
  const config: CarStatusCardConfig = { type, name: "Car" };
  if (!hass) return config;

  const ids = Object.keys(hass.states);

  const openings: Record<string, string> = {};
  for (const [panel, needles] of Object.entries(PANEL_PATTERNS)) {
    const match = find(ids, "binary_sensor", needles);
    if (match) openings[panel] = match;
  }
  if (Object.keys(openings).length) {
    config.openings = openings as CarStatusCardConfig["openings"];
  }

  const tyres: Record<string, { pressure: string }> = {};
  for (const [pos, needles] of Object.entries(TYRE_PATTERNS)) {
    const match = ids.find(
      (id) =>
        id.startsWith("sensor.") &&
        /tire|tyre/.test(id) &&
        /pressure/.test(id) &&
        needles.some((n) => id.includes(n)),
    );
    if (match) tyres[pos] = { pressure: match };
  }
  // All four or none — a lone tyre reads as a fault rather than a partial setup.
  if (Object.keys(tyres).length === 4) {
    config.tyres = tyres as CarStatusCardConfig["tyres"];
  }

  const left = [
    find(ids, "sensor", ["fuel_level", "battery_level", "state_of_charge"]),
    find(ids, "sensor", ["odometer", "mileage"]),
  ].filter(Boolean) as string[];

  if (left.length) {
    config.regions = { left: left.map((entity) => ({ entity })) };
  }

  return config;
};
