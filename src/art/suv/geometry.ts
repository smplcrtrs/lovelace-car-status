/**
 * Top-down SUV in a 303x643 viewBox, proportioned on a 2023 Santa Fe
 * (4785mm x 1900mm ~ 2.5:1). Only one side is drawn; the other is derived
 * by `mirrorPath`, which guarantees symmetry and halves the geometry.
 */

export const VIEW_W = 303;

/**
 * Flips a path across the vertical centre line. Only handles the absolute
 * M/L/C/Z subset used in this file, where every coordinate is an (x, y) pair.
 */
export const mirrorPath = (d: string): string =>
  d.replace(/([MLC])([^MLCZ]*)/gi, (_full, cmd: string, args: string) => {
    const nums = args
      .trim()
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);
    const flipped = nums.map((n, i) => (i % 2 === 0 ? VIEW_W - n : n));
    return `${cmd}${flipped.join(",")}`;
  });

// ---- chassis ----

export const BODY =
  "M151.5,12C124,12,80,17,60,30C44,40,34,62,31,96C29,124,28,170,28,220" +
  "L28,430C28,486,29,545,33,578C36,604,45,620,62,625C92,633,211,633,241,625" +
  "C258,620,267,604,270,578C274,545,275,486,275,430L275,220" +
  "C275,170,274,124,272,96C269,62,259,40,243,30C223,17,179,12,151.5,12Z";

export const WINDSCREEN = "M60,174C120,168,183,168,243,174L236,236C183,232,120,232,67,236Z";

export const REAR_WINDOW = "M67,466L236,466C240,486,242,506,243,520L60,520C61,506,63,486,67,466Z";

export const ROOF = { x: 67, y: 236, w: 169, h: 230, rx: 10 };

// ---- lids ----

export const BONNET = "M62,170C60,118,65,72,74,50L229,50C238,72,243,118,241,170Z";
export const BONNET_HINGE_Y = 170;

export const BOOT =
  "M58,522L245,522C247,548,246,578,242,596C210,602,93,602,61,596C57,578,56,548,58,522Z";
export const BOOT_HINGE_Y = 522;

// ---- doors (left side; right side is mirrored) ----

export const DOOR_FRONT_L = "M28,226L63,228L63,350L28,352Z";
export const DOOR_REAR_L = "M28,354L63,352L63,468L28,470Z";

export const GLASS_FRONT_L = "M36,238L58,240L58,338L36,340Z";
export const GLASS_REAR_L = "M36,364L58,362L58,456L36,458Z";

/** Hinges sit at the leading (upper) outer corner so doors swing rearward. */
export const HINGE_FRONT_L = { x: 28, y: 226 };
export const HINGE_REAR_L = { x: 28, y: 354 };

export const MIRROR_L = "M29,232C19,227,8,229,6,236C4,242,10,247,18,248C25,249,29,245,30,240Z";

// ---- details ----

export const HEADLIGHT_L = "M64,32C76,26,92,23,104,22L108,38C96,39,82,42,71,46Z";
export const TAILLIGHT_L = "M62,624C74,628,90,630,103,631L106,616C94,615,80,612,69,608Z";

/** Tyres sit mostly under the body; only the outer sidewall shows. */
export const TYRE = { w: 30, h: 62, rx: 8 };
export const TYRE_POS = {
  fl: { x: 17, y: 120 },
  rl: { x: 17, y: 452 },
  fr: { x: VIEW_W - 17 - TYRE.w, y: 120 },
  rr: { x: VIEW_W - 17 - TYRE.w, y: 452 },
} as const;
