/**
 * Adapted from https://github.com/home-assistant/frontend (Apache-2.0),
 * src/common/dom/fire_event.ts.
 */
export const fireEvent = <T>(
  node: HTMLElement | Window,
  type: string,
  detail?: T,
  options?: { bubbles?: boolean; cancelable?: boolean; composed?: boolean },
): Event => {
  const event = new CustomEvent(type, {
    bubbles: options?.bubbles ?? true,
    cancelable: options?.cancelable ?? false,
    composed: options?.composed ?? true,
    detail,
  });
  node.dispatchEvent(event);
  return event;
};
