import { TextLink } from "@/components/text-link";
import { focusAreas, focusIntro } from "@/features/home/content";

// Split row: a hanging head on the left, F3 rows on the right. Each row has a
// single affordance, its typographic link.
export function ClinicalFocus() {
  return (
    <section aria-labelledby="focus-title" className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:gap-12">
      <div className="flex flex-col items-start gap-5 lg:col-span-4">
        <h2 id="focus-title" className="text-balance text-headline-md text-foreground sm:text-headline-lg">
          Core clinical focus
        </h2>
        <p className="max-w-[44ch] text-body-md text-muted-foreground">{focusIntro}</p>
        <TextLink href="/specialties">View all procedures</TextLink>
      </div>

      <ul className="flex flex-col gap-3 lg:col-span-8">
        {focusAreas.map((area) => (
          <li
            key={area.title}
            className="grid grid-cols-1 gap-4 rounded-xl bg-surface-low p-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-8"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-headline-sm text-foreground">{area.title}</h3>
              <p className="max-w-[60ch] text-body-md text-muted-foreground">{area.description}</p>
            </div>
            <TextLink href={area.href} className="self-start sm:self-end">
              {area.linkLabel}
              <span className="sr-only"> for {area.title.toLowerCase()}</span>
            </TextLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
