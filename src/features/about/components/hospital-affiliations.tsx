import { site } from "@/config/site";
import { hospitalAffiliations } from "@/features/about/content";

export function HospitalAffiliations() {
  return (
    <section aria-labelledby="affiliations-title" className="mt-14 flex flex-col gap-5">
      <h2 id="affiliations-title" className="text-headline-sm text-foreground">
        Hospital affiliations
      </h2>
      <p className="text-body-md leading-relaxed text-muted-foreground">{hospitalAffiliations.intro}</p>
      <ul className="flex flex-col gap-2 text-body-md text-foreground">
        {site.hospitals.map((hospital) => (
          <li key={hospital}>{hospital}</li>
        ))}
      </ul>
    </section>
  );
}
