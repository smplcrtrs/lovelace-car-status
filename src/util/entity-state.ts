import type { HassEntity, HomeAssistant } from "../ha";
import type { OpeningConfig } from "../card/car-status-card-config";
import type { PanelState } from "../art";

const OPEN_STATES = new Set(["on", "open", "opening", "true", "unlocked"]);

export const isMissing = (stateObj: HassEntity | undefined): boolean =>
  !stateObj || stateObj.state === "unavailable" || stateObj.state === "unknown";

export const panelStateFor = (
  hass: HomeAssistant | undefined,
  opening: OpeningConfig | undefined,
): PanelState => {
  if (!hass || !opening?.entity) return "unknown";
  const stateObj = hass.states[opening.entity] as HassEntity | undefined;
  if (!stateObj) return "unavailable";
  if (stateObj.state === "unavailable") return "unavailable";
  if (stateObj.state === "unknown") return "unknown";

  const raw = stateObj.state.toLowerCase();
  let open = opening.open_state ? raw === opening.open_state.toLowerCase() : OPEN_STATES.has(raw);
  if (opening.invert) open = !open;
  return open ? "open" : "closed";
};
