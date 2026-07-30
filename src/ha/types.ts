/**
 * Minimal subset of the Home Assistant frontend types.
 * Adapted from https://github.com/home-assistant/frontend (Apache-2.0).
 */
import type {
  Connection,
  HassConfig,
  HassEntities,
  HassEntity,
  HassServices,
} from "home-assistant-js-websocket";

export interface FrontendLocaleData {
  language: string;
  number_format: string;
  time_format: string;
  date_format: string;
  time_zone: string;
}

export interface ThemeSettings {
  theme: string;
  dark?: boolean;
  primaryColor?: string;
  accentColor?: string;
}

export interface HomeAssistant {
  states: HassEntities;
  services: HassServices;
  config: HassConfig;
  connection: Connection;
  themes: { default_theme: string; darkMode: boolean; [key: string]: unknown };
  selectedTheme?: ThemeSettings | null;
  locale: FrontendLocaleData;
  language: string;
  localize: (key: string, ...args: unknown[]) => string;
  formatEntityState: (stateObj: HassEntity, state?: string) => string;
  formatEntityAttributeValue: (stateObj: HassEntity, attribute: string) => string;
  callService: (
    domain: string,
    service: string,
    serviceData?: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown>;
}

export type { HassEntity } from "home-assistant-js-websocket";
