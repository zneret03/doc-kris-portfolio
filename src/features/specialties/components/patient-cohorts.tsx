import { SectionHeading } from "@/components/section-heading";
import { cohorts, cohortsIntro } from "@/features/specialties/content";

// F3 spec rows: who, why, and the focus, read across one row each.
export function PatientCohorts() {
  return (
    <section aria-labelledby="cohorts-title" className="py-16">
      <SectionHeading id="cohorts-title" title={cohortsIntro.title} description={cohortsIntro.description} />
      <dl className="mt-10 flex flex-col gap-3">
        {cohorts.map((cohort) => (
          <div
            key={cohort.title}
            className="grid grid-cols-1 gap-3 rounded-xl bg-surface-low p-6 md:grid-cols-12 md:gap-8"
          >
            <dt className="text-headline-sm text-foreground md:col-span-4">{cohort.title}</dt>
            <dd className="text-body-md text-muted-foreground md:col-span-5">{cohort.description}</dd>
            <dd className="text-body-sm text-foreground md:col-span-3">
              <span className="block text-label-md text-primary">Key focus</span>
              {cohort.focus}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
