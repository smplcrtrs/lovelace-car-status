import type { CarArt } from "./types";
import { placeholderArt } from "./placeholder";

export const PRESETS: Record<string, CarArt> = {
  placeholder: placeholderArt,
};

export const DEFAULT_PRESET = "placeholder";

export const getArt = (id: string | undefined): CarArt =>
  PRESETS[id ?? DEFAULT_PRESET] ?? PRESETS[DEFAULT_PRESET];

export * from "./types";
