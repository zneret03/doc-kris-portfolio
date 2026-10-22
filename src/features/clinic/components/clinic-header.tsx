import { SectionHeading } from "@/components/section-heading";
import { StatusDot } from "@/components/status-dot";
import { clinicHeader } from "@/features/clinic/content";

// S2 hanging page head, left-aligned, with the one live status on the site.
export function ClinicHeader() {
  return (
    <section aria-labelledby="clinic-title" className="pt-6 pb-10 lg:pt-10">
      <SectionHeading
        as="h1"
        id="clinic-title"
        title={clinicHeader.title}
        description={clinicHeader.subtitle}
      />
      <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-body-sm text-muted-foreground">
        <StatusDot />
        {clinicHeader.availabilityLabel}
        <span className="text-foreground">{clinicHeader.availabilityValue}</span>
      </p>
    </section>
  );
}
