import { getArt } from "../art";
import type { PanelId, TyrePos } from "../art";
import { PRESETS } from "../art";
import type { CarStatusCardConfig, OpeningConfig } from "../card/car-status-card-config";
import { PANEL_LABEL, TYRE_LABEL } from "./labels";

/** Loose stand-in for HA's HaFormSchema; only what this card actually emits. */
export interface FormSchema {
  name: string;
  label?: string;
  type?: "expandable" | "grid";
  title?: string;
  icon?: string;
  flatten?: boolean;
  schema?: FormSchema[];
  selector?: Record<string, unknown>;
}

/** Anything that can plausibly report an opening. Kept broad on purpose. */
const OPENING_DOMAINS = ["binary_sensor", "cover", "lock", "switch", "input_boolean", "sensor"];

const entitySelector = (domains: string[]) => ({
  entity: { filter: [{ domain: domains }] },
});

const colorSelector = { ui_color: { include_none: true, default_color: "state" } };

/**
 * The form edits an opening's entity id, but the stored value is an
 * `OpeningConfig` object. Flatten for display.
 */
export const openingsToForm = (
  openings: CarStatusCardConfig["openings"],
): Record<string, string> => {
  const out: Record<string, string> = {};
  for (const [id, value] of Object.entries(openings ?? {})) {
    const entity = typeof value === "string" ? value : value?.entity;
    if (entity) out[id] = entity;
  }
  return out;
};

/**
 * Fold the edited entity ids back into the stored shape. `open_state`,
 * `invert` and `color` have no GUI control yet, so they are carried across
 * rather than dropped — a YAML config must survive a round trip through the
 * editor untouched.
 */
export const openingsFromForm = (
  form: Record<string, string | undefined>,
  previous: CarStatusCardConfig["openings"],
): Record<string, string | OpeningConfig> => {
  const out: Record<string, string | OpeningConfig> = {};
  for (const [id, entity] of Object.entries(form ?? {})) {
    if (!entity) continue; // cleared in the picker
    const prev = previous?.[id as PanelId];
    const extras = typeof prev === "object" ? { ...prev } : {};
    delete (extras as Partial<OpeningConfig>).entity;
    // Emit the shorthand string when there is nothing else to say.
    out[id] = Object.keys(extras).length ? { entity, ...extras } : entity;
  }
  return out;
};

const presetOptions = () =>
  Object.values(PRESETS).map((art) => ({ value: art.id, label: art.label }));

const openingsSection = (panels: readonly PanelId[]): FormSchema => ({
  name: "openings",
  type: "expandable",
  title: "Doors, windows and openings",
  icon: "mdi:car-door",
  schema: panels.map((id) => ({
    name: id,
    label: PANEL_LABEL[id],
    selector: entitySelector(OPENING_DOMAINS),
  })),
});

const tyresSection = (positions: readonly TyrePos[]): FormSchema => ({
  name: "tyres",
  type: "expandable",
  title: "Tyres",
  icon: "mdi:car-tire-alert",
  schema: positions.map((pos) => ({
    name: pos,
    type: "expandable",
    title: TYRE_LABEL[pos],
    schema: [
      {
        name: "pressure",
        label: "Pressure",
        selector: entitySelector(["sensor", "number", "input_number"]),
      },
      {
        name: "warning",
        label: "Warning",
        selector: entitySelector(["binary_sensor", "switch", "input_boolean"]),
      },
    ],
  })),
});

const appearanceSection: FormSchema = {
  name: "vehicle",
  type: "expandable",
  title: "Appearance",
  icon: "mdi:palette",
  schema: [
    {
      name: "preset",
      label: "Body style",
      selector: { select: { mode: "dropdown", options: presetOptions() } },
    },
    {
      name: "colors",
      type: "expandable",
      title: "Colours",
      schema: [
        { name: "body", label: "Body", selector: colorSelector },
        { name: "accent", label: "Glass and trim", selector: colorSelector },
        { name: "open", label: "Open", selector: colorSelector },
        { name: "fault", label: "Fault", selector: colorSelector },
        { name: "ok", label: "OK", selector: colorSelector },
      ],
    },
  ],
};

/**
 * Built from the selected artwork rather than a fixed list, so a body style
 * with no sunroof simply does not offer a sunroof picker.
 */
export const buildSchema = (config: CarStatusCardConfig): FormSchema[] => {
  const art = getArt(config.vehicle?.preset);
  return [
    { name: "name", label: "Title", selector: { text: {} } },
    {
      name: "open_style",
      label: "How openings are shown",
      selector: {
        select: {
          mode: "dropdown",
          options: [
            { value: "swing", label: "Swing open" },
            { value: "highlight", label: "Highlight only" },
            { value: "both", label: "Swing and highlight" },
          ],
        },
      },
    },
    appearanceSection,
    openingsSection(art.panels),
    tyresSection(art.tyres),
  ];
};
