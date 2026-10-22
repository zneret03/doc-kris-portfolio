import { SectionHeading } from "@/components/section-heading";
import { outcomes, specialtiesHeader } from "@/features/specialties/content";

// S2 hanging page head, then the outcomes as a T4 stat strip.
export function SpecialtiesHeader() {
  return (
    <section aria-labelledby="specialties-title" className="pt-6 pb-12 lg:pt-10">
      <SectionHeading
        as="h1"
        id="specialties-title"
        title={specialtiesHeader.title}
        description={specialtiesHeader.subtitle}
      />
      <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl bg-surface-low px-6 py-8 sm:px-10 md:grid-cols-4">
        {outcomes.map((item) => (
          <div key={item.label} className="flex flex-col-reverse gap-1">
            <dt className="text-body-sm text-muted-foreground">{item.label}</dt>
            <dd className="text-headline-lg font-bold text-foreground tabular-nums">
              {item.value}
              {item.unit && (
                <span className="text-headline-sm font-normal text-muted-foreground"> {item.unit}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
