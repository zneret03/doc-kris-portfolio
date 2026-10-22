// Clinical Midnight colours for places CSS variables can't reach: generated
// share images and icons, the web manifest, and the browser theme colour.
// Hex because the image renderer doesn't parse OKLCH. Mirrors the tokens in
// src/app/globals.css; change both together.
export const brandColors = {
  background: "#0e1321",
  foreground: "#dee2f6",
  mutedForeground: "#bacac5",
  primary: "#57f1db",
  info: "#7bd0ff",
  border: "#252a39",
} as const;

/** A brand colour at reduced opacity, e.g. withAlpha(brandColors.primary, 0.1) */
export function withAlpha(hex: string, alpha: number) {
  const [r, g, b] = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
