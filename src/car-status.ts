import { CARD_NAME, VERSION } from "./const";
import { registerCustomCard } from "./ha";

import "./card/car-status-card";

registerCustomCard({
  // Registered without the `custom:` prefix — HA's card picker adds it.
  type: CARD_NAME,
  name: "Car Status Card",
  description: "Top-down car graphic with live door, window, bonnet and boot status.",
  preview: true,
  documentationURL: "https://github.com/smplcrtrs/lovelace-car-status",
});

// eslint-disable-next-line no-console
console.info(
  `%c CAR-STATUS-CARD %c ${VERSION} `,
  "color:white;background:#03a9f4;font-weight:700",
  "color:#03a9f4;background:#1c1c1c",
);
