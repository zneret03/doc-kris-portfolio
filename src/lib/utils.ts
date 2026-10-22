import { createCn } from "cn/config";

// Custom @theme scales from src/app/globals.css. Without registering them, cn
// treats `text-label-sm` as a color and drops it next to `text-primary`.
// utils.test.ts fails when globals.css gains a token that isn't listed here.
export const themeFontSizes = [
  "display-lg",
  "display-lg-mobile",
  "headline-xl",
  "headline-xl-mobile",
  "headline-lg",
  "headline-md",
  "headline-sm",
  "title-md",
  "body-lg",
  "body-md",
  "body-sm",
  "label-lg",
  "label-md",
  "label-sm",
];

export const themeShadows = ["float"];

export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: themeFontSizes }],
      shadow: [{ shadow: themeShadows }],
    },
  },
});
