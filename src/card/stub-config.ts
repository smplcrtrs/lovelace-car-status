import type { PanelId } from "../art";
import type { HomeAssistant } from "../ha";
import type { CarStatusCardConfig, ControlItemConfig } from "./car-status-card-config";

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

/**
 * Needles are tried in order, each against every id, so the list reads as a
 * preference. Scanning ids in the outer loop instead would let entity ordering
 * decide, and a car with both `fuel_level` and `car_battery_level` could end up
 * showing its 12V battery as the fuel gauge.
 */
const find = (ids: string[], domain: string, needles: string[]): string | undefined => {
  for (const needle of needles) {
    const hit = ids.find((id) => id.startsWith(`${domain}.`) && id.includes(needle));
    if (hit) return hit;
  }
  return undefined;
};

/**
 * The object id up to whichever needle matched — `binary_sensor.santa_fe_hood`
 * with needle `hood` gives `santa_fe_`. Used to scope the rest of the search to
 * one vehicle: without it, a pattern like `battery_level` cheerfully matches a
 * smartwatch.
 */
const devicePrefix = (id: string, needles: string[]): string => {
  const objectId = id.slice(id.indexOf(".") + 1);
  for (const needle of needles) {
    const at = objectId.indexOf(needle);
    if (at > 0) return objectId.slice(0, at);
  }
  return "";
};

/**
 * A best-effort starting point for the card picker preview and a new card.
 * Everything here is a guess the user can correct in the editor, so it errs
 * towards leaving a field out rather than filling it in wrongly.
 *
 * Deliberately omits `type`. Home Assistant builds `{ type: "custom:<name>" }`
 * and spreads this over it, so returning a type here overwrites the prefixed
 * one with a bare name the frontend cannot resolve.
 */
export type StubConfig = Omit<CarStatusCardConfig, "type">;

export const buildStubConfig = (hass: HomeAssistant | undefined): StubConfig => {
  const config: StubConfig = { name: "Car" };
  if (!hass) return config;

  const ids = Object.keys(hass.states);

  const openings: Record<string, string> = {};
  let prefix = "";
  for (const [panel, needles] of Object.entries(PANEL_PATTERNS)) {
    const match = find(ids, "binary_sensor", needles);
    if (!match) continue;
    openings[panel] = match;
    prefix ||= devicePrefix(match, needles);
  }
  if (Object.keys(openings).length) {
    config.openings = openings as CarStatusCardConfig["openings"];
  }

  // Once an opening has identified the vehicle, everything else is looked for
  // on that same device.
  const scoped = prefix ? ids.filter((id) => id.includes(prefix)) : ids;

  // Plenty of integrations report tyres only as a low-pressure flag with no
  // numeric reading, so a warning alone is enough to configure a corner.
  const tyres: Record<string, { pressure?: string; warning?: string }> = {};
  for (const [pos, needles] of Object.entries(TYRE_PATTERNS)) {
    const isCorner = (id: string) => /tire|tyre/.test(id) && needles.some((n) => id.includes(n));

    const pressure = scoped.find(
      (id) => id.startsWith("sensor.") && /pressure/.test(id) && isCorner(id),
    );
    const warning = scoped.find((id) => id.startsWith("binary_sensor.") && isCorner(id));
    if (pressure || warning) {
      tyres[pos] = { ...(pressure && { pressure }), ...(warning && { warning }) };
    }
  }
  // All four or none — a lone tyre reads as a fault rather than a partial setup.
  if (Object.keys(tyres).length === 4) {
    config.tyres = tyres as CarStatusCardConfig["tyres"];
  }

  // `battery_level` and `state_of_charge` are only safe inside a known vehicle;
  // unscoped they match phones, watches and home batteries. `fuel_level` and
  // `odometer` are specific enough to trust on their own. Traction battery
  // before the 12V one, which is usually `car_battery_level`.
  const levelNeedles = prefix
    ? ["fuel_level", "ev_battery_level", "state_of_charge", "battery_level"]
    : ["fuel_level"];

  const left = [
    find(scoped, "sensor", levelNeedles),
    find(scoped, "sensor", ["odometer", "mileage"]),
  ].filter(Boolean) as string[];

  const below: ControlItemConfig[] = [];
  const lock = find(scoped, "lock", [""]);
  if (lock) below.push({ type: "lock", entity: lock });

  const climate = find(scoped, "climate", [""]);
  if (climate) below.push({ type: "climate", entity: climate });

  // Prefer plain hazards over the variant that also sounds the horn.
  const hazards =
    scoped.find((id) => id.startsWith("button.") && /hazard/.test(id) && !/horn/.test(id)) ??
    find(scoped, "button", ["hazard"]);
  if (hazards) below.push({ type: "button", entity: hazards, name: "Hazards" });

  const refresh = find(scoped, "button", ["force_refresh", "refresh", "update"]);
  if (refresh) below.push({ type: "button", entity: refresh, name: "Refresh" });

  const regions: CarStatusCardConfig["regions"] = {};
  if (left.length) regions.left = left.map((entity) => ({ entity }));
  if (below.length) regions.below = below;
  if (Object.keys(regions).length) config.regions = regions;

  return config;
};
