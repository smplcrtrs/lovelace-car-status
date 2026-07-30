import {
  any,
  array,
  assert,
  boolean,
  enums,
  number,
  optional,
  record,
  string,
  type,
  union,
  type Struct,
} from "superstruct";
import type { ActionConfig, LovelaceCardConfig } from "../ha";
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
  type?: "sensor";
}

/**
 * `lock`/`toggle`/`button` drive their entity directly; `climate` exposes a
 * temperature setpoint; `action` runs an arbitrary HA action.
 */
export type ControlType = "lock" | "toggle" | "button" | "climate" | "action";

export const CONTROL_TYPES: readonly ControlType[] = [
  "lock",
  "toggle",
  "button",
  "climate",
  "action",
];

export interface ControlItemConfig {
  type: ControlType;
  entity?: string;
  name?: string;
  icon?: string;
  color?: string;
  tap_action?: ActionConfig;
  confirm?: string;
  /** climate only */
  min?: number;
  max?: number;
  step?: number;
}

export type RegionItemConfig = SensorItemConfig | ControlItemConfig;

export const isControl = (item: RegionItemConfig): item is ControlItemConfig =>
  !!item.type && item.type !== "sensor";

export interface CarStatusCardConfig extends LovelaceCardConfig {
  name?: string;
  vehicle?: VehicleConfig;
  open_style?: OpenStyle;
  openings?: Partial<Record<PanelId, OpeningConfig>>;
  tyres?: Partial<Record<TyrePos, TyreConfig>>;
  regions?: Partial<Record<RegionName, RegionItemConfig[]>>;
}

// `type` throughout, not `object`: superstruct's `object` is exact and rejects
// unknown keys, which would make a config from a newer card version fail hard
// on an older one. `type` validates the keys it knows and ignores the rest.
const openingStruct = type({
  entity: string(),
  open_state: optional(string()),
  invert: optional(boolean()),
  color: optional(string()),
});

/**
 * Region items are sensors or controls. Kept permissive here — which fields
 * are actually required depends on `type`, so that is checked in
 * `assertRegionItem` where a useful message can be produced.
 */
const regionItemStruct = type({
  type: optional(string()),
  entity: optional(string()),
  name: optional(string()),
  icon: optional(string()),
  color: optional(string()),
  display: optional(enums(["text", "gauge", "bar"])),
  min: optional(number()),
  max: optional(number()),
  step: optional(number()),
  confirm: optional(string()),
  tap_action: optional(any()),
  region: optional(enums(["above", "left", "right", "below"])),
});

const assertRegionItem = (item: RegionItemConfig, region: string, index: number): void => {
  const where = `regions.${region}[${index}]`;
  const kind = item.type ?? "sensor";

  if (kind !== "sensor" && !CONTROL_TYPES.includes(kind as ControlType)) {
    throw new Error(
      `${where}: unknown type "${kind}". Expected sensor or one of ${CONTROL_TYPES.join(", ")}.`,
    );
  }
  if (kind === "action") {
    if (!(item as ControlItemConfig).tap_action) {
      throw new Error(`${where}: an action control needs a tap_action.`);
    }
    return;
  }
  if (!item.entity) {
    throw new Error(`${where}: a ${kind} needs an entity.`);
  }
};

const configStruct: Struct<any, any> = type({
  type: string(),
  name: optional(string()),
  vehicle: optional(
    type({
      preset: optional(string()),
      colors: optional(record(string(), string())),
    }),
  ),
  open_style: optional(enums(["swing", "highlight", "both"])),
  openings: optional(record(string(), union([string(), openingStruct]))),
  tyres: optional(record(string(), any())),
  regions: optional(record(string(), array(regionItemStruct))),
});

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
  const regions = migrated.regions ?? {};

  for (const [region, items] of Object.entries(regions)) {
    items?.forEach((item, i) => assertRegionItem(item, region, i));
  }

  return {
    ...migrated,
    openings: normaliseOpenings(migrated.openings as Record<string, string | OpeningConfig>),
    regions,
  };
};
