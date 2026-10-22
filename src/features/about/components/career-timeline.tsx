import { site } from "@/config/site";
import { careerTimeline } from "@/features/about/content";

// Training in order. A real sequence, so it's an ordered list.
export function CareerTimeline() {
  return (
    <section aria-labelledby="timeline-title" className="mt-14 flex flex-col gap-5">
      <h2 id="timeline-title" className="text-headline-sm text-foreground">
        {site.doctor.yearsInPractice}-year career trajectory
      </h2>
      <ol className="flex flex-col gap-6">
        {careerTimeline.map((step) => (
          <li key={step.title} className="flex flex-col gap-1">
            <h3 className="text-title-md font-semibold text-foreground">{step.title}</h3>
            <p className="text-label-lg text-primary">{step.institution}</p>
            <p className="text-body-md leading-relaxed text-muted-foreground">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
