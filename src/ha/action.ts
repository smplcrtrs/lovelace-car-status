/**
 * Standard Home Assistant action config.
 * Adapted from https://github.com/home-assistant/frontend (Apache-2.0),
 * src/data/lovelace/config/action.ts.
 */
import { fireEvent } from "./fire-event";
import type { HomeAssistant } from "./types";

export interface ActionConfig {
  action: "more-info" | "toggle" | "perform-action" | "call-service" | "navigate" | "url" | "none";
  entity?: string;
  /** `perform-action` spelling; `service` is the older alias. */
  perform_action?: string;
  service?: string;
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  navigation_path?: string;
  url_path?: string;
  confirmation?: { text?: string };
}

const splitService = (value: string): [string, string] | undefined => {
  const [domain, service] = value.split(".", 2);
  return domain && service ? [domain, service] : undefined;
};

export const handleAction = (
  node: HTMLElement,
  hass: HomeAssistant,
  config: ActionConfig,
  fallbackEntity?: string,
): void => {
  if (config.action === "none") return;

  if (config.confirmation?.text && !confirm(config.confirmation.text)) return;

  switch (config.action) {
    case "more-info": {
      const entityId = config.entity ?? fallbackEntity;
      if (entityId) fireEvent(node, "hass-more-info", { entityId });
      break;
    }
    case "toggle": {
      const entityId = config.entity ?? fallbackEntity;
      if (entityId) {
        void hass.callService("homeassistant", "toggle", { entity_id: entityId });
      }
      break;
    }
    case "perform-action":
    case "call-service": {
      const raw = config.perform_action ?? config.service;
      const parts = raw ? splitService(raw) : undefined;
      if (parts) {
        void hass.callService(parts[0], parts[1], config.data ?? {}, config.target);
      }
      break;
    }
    case "navigate":
      if (config.navigation_path) {
        history.pushState(null, "", config.navigation_path);
        fireEvent(window, "location-changed", { replace: false });
      }
      break;
    case "url":
      if (config.url_path) window.open(config.url_path);
      break;
  }
};
