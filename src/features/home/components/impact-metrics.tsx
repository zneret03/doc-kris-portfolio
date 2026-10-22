import { metrics } from "@/features/home/content";

// T4 stat strip: one band, three figures, no icons and no per-stat cards.
export function ImpactMetrics() {
  return (
    <section aria-labelledby="impact-title" className="pb-16">
      <h2 id="impact-title" className="sr-only">
        Practice at a glance
      </h2>
      <dl className="grid grid-cols-1 gap-8 rounded-2xl bg-surface-low px-6 py-8 sm:grid-cols-3 sm:gap-6 sm:px-10 sm:py-10">
        {metrics.map(({ value, label, description }) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="order-2 text-title-md font-semibold text-foreground">{label}</dt>
            <dd className="order-1 text-headline-xl-mobile font-bold text-foreground tabular-nums md:text-headline-xl md:font-bold">
              {value}
            </dd>
            <dd className="order-3 max-w-[36ch] text-body-sm text-muted-foreground">{description}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
