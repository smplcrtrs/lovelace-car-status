import type { CarArt } from "./types";
import { placeholderArt } from "./placeholder";
import { suvArt } from "./suv";

export const PRESETS: Record<string, CarArt> = {
  suv: suvArt,
  placeholder: placeholderArt,
};

export const DEFAULT_PRESET = "suv";

export const getArt = (id: string | undefined): CarArt =>
  PRESETS[id ?? DEFAULT_PRESET] ?? PRESETS[DEFAULT_PRESET];

export * from "./types";
