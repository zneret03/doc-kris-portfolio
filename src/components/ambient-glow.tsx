// The atmospheric canvas from design.md: two fixed blooms (teal top-right,
// cyan bottom-left) behind every page. Rendered once, in the root layout.
// Sections never add their own orbs.
export function AmbientGlow() {
  return <div aria-hidden className="canvas-blooms pointer-events-none fixed inset-0 -z-10" />;
}
