/**
 * Adapted from https://github.com/home-assistant/frontend (Apache-2.0),
 * src/common/color/compute-color.ts.
 *
 * Theme colour tokens resolve to CSS variables so the card follows the
 * user's light/dark theme. Anything else is passed through as a raw colour.
 */
export const THEME_COLORS = new Set([
  "primary",
  "accent",
  "disabled",
  "red",
  "pink",
  "purple",
  "deep-purple",
  "indigo",
  "blue",
  "light-blue",
  "cyan",
  "teal",
  "green",
  "light-green",
  "lime",
  "yellow",
  "amber",
  "orange",
  "deep-orange",
  "brown",
  "light-grey",
  "grey",
  "dark-grey",
  "blue-grey",
  "black",
  "white",
]);

export const computeCssColor = (color: string): string => {
  if (THEME_COLORS.has(color)) {
    return `var(--${color}-color)`;
  }
  return color;
};
