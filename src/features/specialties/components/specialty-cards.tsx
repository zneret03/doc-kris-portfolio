import { CircleCheck } from "lucide-react";

import { Pill } from "@/components/pill";
import { SectionHeading } from "@/components/section-heading";
import { specialties, specialtiesIntro, type Specialty } from "@/features/specialties/content";
import { cn } from "@/lib/utils";

// Split Studio rows: the explanation on one half, its highlights on the
// other, swapping sides row by row.
export function SpecialtyCards() {
  return (
    <section aria-labelledby="core-specialties-title" className="py-12">
      <SectionHeading
        id="core-specialties-title"
        title={specialtiesIntro.title}
        aside={<p className="text-body-sm text-muted-foreground">{specialtiesIntro.description}</p>}
      />
      <div className="mt-12 flex flex-col gap-14 lg:gap-20">
        {specialties.map((specialty, index) => (
          <SpecialtyRow key={specialty.id} specialty={specialty} reversed={index % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function SpecialtyRow({ specialty, reversed }: { specialty: Specialty; reversed: boolean }) {
  return (
    <article
      id={specialty.id}
      aria-labelledby={`${specialty.id}-title`}
      className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-12"
    >
      <div className={cn("flex flex-col items-start gap-4 lg:col-span-6", reversed && "lg:order-2")}>
        <Pill>{specialty.tag}</Pill>
        <h3 id={`${specialty.id}-title`} className="text-headline-md text-foreground">
          {specialty.title}
        </h3>
        <p className="max-w-[58ch] text-body-md text-muted-foreground">{specialty.description}</p>
      </div>
      <div
        className={cn(
          "rounded-2xl bg-surface-low p-6 sm:p-8 lg:col-span-6 in-target:bg-surface-container",
          reversed && "lg:order-1",
        )}
      >
        <ul className="flex flex-col gap-3">
          {specialty.highlights.map((highlight) => (
            <li key={highlight} className="flex items-start gap-3 text-body-md text-foreground">
              <CircleCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-primary" />
              {highlight}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-label-md text-muted-foreground">{specialty.note}</p>
      </div>
    </article>
  );
}
