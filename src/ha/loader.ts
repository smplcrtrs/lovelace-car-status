/**
 * HA lazy-loads its form and picker elements, so they may not be defined when a
 * custom editor first renders. Borrowing another card's config element forces
 * them to register. Community-standard workaround; must never throw.
 */
export const loadHaComponents = (): void => {
  try {
    if (!customElements.get("ha-form")) {
      (
        customElements.get("hui-tile-card") as { getConfigElement?: () => unknown } | undefined
      )?.getConfigElement?.();
    }
    if (!customElements.get("ha-entity-picker")) {
      (
        customElements.get("hui-entities-card") as { getConfigElement?: () => unknown } | undefined
      )?.getConfigElement?.();
    }
  } catch {
    // Non-fatal: the editor still renders, just with unstyled fallbacks.
  }
};
