export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only rounded-lg bg-primary px-4 py-2 text-label-lg text-primary-foreground focus-ring focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60"
    >
      Skip to content
    </a>
  );
}
