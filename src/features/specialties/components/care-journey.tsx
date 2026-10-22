import { SectionHeading } from "@/components/section-heading";
import { journeyIntro, journeySteps } from "@/features/specialties/content";

// F4 step sequence: numbered because the steps really happen in order.
export function CareJourney() {
  return (
    <section aria-labelledby="journey-title" className="py-12">
      <SectionHeading
        id="journey-title"
        title={journeyIntro.title}
        aside={<p className="text-body-sm text-muted-foreground">{journeyIntro.description}</p>}
      />
      <ol className="mt-10 flex flex-col gap-10">
        {journeySteps.map((step, index) => (
          <li key={step.title} className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-6 sm:gap-x-10">
            <span
              aria-hidden
              className="row-span-3 w-[2ch] text-headline-lg text-primary tabular-nums"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-headline-sm text-foreground">{step.title}</h3>
            <p className="mt-2 max-w-[60ch] text-body-md text-muted-foreground">{step.description}</p>
            <p className="mt-3 flex items-center gap-2 text-label-md text-muted-foreground">
              <step.noteIcon aria-hidden className="size-4 shrink-0 text-primary" />
              {step.note}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
