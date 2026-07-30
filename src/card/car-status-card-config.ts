import {
  any,
  array,
  assert,
  assign,
  boolean,
  enums,
  number,
  object,
  optional,
  record,
  string,
  type,
  union,
  type Struct,
} from "superstruct";
import type { LovelaceCardConfig } from "../ha";
import type { PanelId, TyrePos } from "../art";

export type RegionName = "above" | "left" | "right" | "below";
export const REGIONS: readonly RegionName[] = ["above", "left", "right", "below"];

export type OpenStyle = "swing" | "highlight" | "both";
export type SensorDisplay = "text" | "gauge" | "bar";

export interface OpeningConfig {
  entity: string;
  /** State that counts as open. Defaults to matching "on"/"open"/"true". */
  open_state?: string;
  invert?: boolean;
  color?: string;
}

export interface TyreConfig {
  pressure?: string;
  warning?: string;
  min?: number;
  max?: number;
}

export interface VehicleConfig {
  preset?: string;
  colors?: {
    body?: string;
    accent?: string;
    open?: string;
    fault?: string;
    ok?: string;
  };
}

export interface SensorItemConfig {
  entity: string;
  name?: string;
  icon?: string;
  color?: string;
  display?: SensorDisplay;
  min?: number;
  max?: number;
  region?: RegionName;
}

export interface CarStatusCardConfig extends LovelaceCardConfig {
  name?: string;
  vehicle?: VehicleConfig;
  open_style?: OpenStyle;
  openings?: Partial<Record<PanelId, OpeningConfig>>;
  tyres?: Partial<Record<TyrePos, TyreConfig>>;
  regions?: Partial<Record<RegionName, SensorItemConfig[]>>;
}

const openingStruct = object({
  entity: string(),
  open_state: optional(string()),
  invert: optional(boolean()),
  color: optional(string()),
});

const sensorItemStruct = assign(
  object({
    entity: string(),
    name: optional(string()),
    icon: optional(string()),
    color: optional(string()),
    display: optional(enums(["text", "gauge", "bar"])),
    min: optional(number()),
    max: optional(number()),
    region: optional(enums(["above", "left", "right", "below"])),
  }),
  type({}),
);

/**
 * Unknown keys are deliberately allowed at every level: a config written by a
 * newer version of the card must not hard-error on an older one.
 */
const configStruct: Struct<any, any> = assign(
  object({
    type: string(),
    name: optional(string()),
    vehicle: optional(
      assign(
        object({
          preset: optional(string()),
          colors: optional(record(string(), string())),
        }),
        type({}),
      ),
    ),
    open_style: optional(enums(["swing", "highlight", "both"])),
    openings: optional(record(string(), union([string(), openingStruct]))),
    tyres: optional(record(string(), any())),
    regions: optional(record(string(), array(sensorItemStruct))),
  }),
  type({}),
);

/** Hook for future renames. Intentionally a no-op today. */
const migrateConfig = (config: CarStatusCardConfig): CarStatusCardConfig => config;

/** Openings accept `bonnet: binary_sensor.x` shorthand; normalise to object form. */
const normaliseOpenings = (
  raw: Record<string, string | OpeningConfig> | undefined,
): Partial<Record<PanelId, OpeningConfig>> => {
  if (!raw) return {};
  const out: Record<string, OpeningConfig> = {};
  for (const [key, value] of Object.entries(raw)) {
    out[key] = typeof value === "string" ? { entity: value } : value;
  }
  return out as Partial<Record<PanelId, OpeningConfig>>;
};

export const validateConfig = (config: CarStatusCardConfig): CarStatusCardConfig => {
  assert(config, configStruct);
  const migrated = migrateConfig(config);
  return {
    ...migrated,
    openings: normaliseOpenings(migrated.openings as Record<string, string | OpeningConfig>),
    regions: migrated.regions ?? {},
  };
};
