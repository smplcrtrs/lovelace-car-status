/**
 * Minimal subset of the Home Assistant Lovelace types.
 * Adapted from https://github.com/home-assistant/frontend (Apache-2.0),
 * src/panels/lovelace/types.ts and src/data/lovelace_custom_cards.ts.
 */
import type { HomeAssistant } from "./types";

export interface LovelaceCardConfig {
  index?: number;
  view_index?: number;
  view_layout?: unknown;
  type: string;
  [key: string]: unknown;
}

export interface LovelaceGridOptions {
  columns?: number | "full";
  rows?: number | "auto";
  max_columns?: number;
  min_columns?: number;
  max_rows?: number;
  min_rows?: number;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  preview?: boolean;
  layout?: string;
  getCardSize(): number | Promise<number>;
  getGridOptions?(): LovelaceGridOptions;
  setConfig(config: LovelaceCardConfig): void;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}

/** Note: `type` is registered WITHOUT the `custom:` prefix — HA's card picker adds it. */
export interface CustomCardEntry {
  type: string;
  name?: string;
  description?: string;
  preview?: boolean;
  documentationURL?: string;
}

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

export const registerCustomCard = (entry: CustomCardEntry): void => {
  window.customCards = window.customCards || [];
  window.customCards.push(entry);
};
