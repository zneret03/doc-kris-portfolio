import { Container } from "@/components/container";
import { site } from "@/config/site";
import { JsonLd } from "@/features/seo/components/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { breadcrumbJsonLd, medicalWebPageJsonLd } from "@/features/seo/structured-data";
import { CareJourney } from "@/features/specialties/components/care-journey";
import { DiagnosticsHighlight } from "@/features/specialties/components/diagnostics-highlight";
import { InquiriesCta } from "@/features/specialties/components/inquiries-cta";
import { PatientCohorts } from "@/features/specialties/components/patient-cohorts";
import { SpecialtiesHeader } from "@/features/specialties/components/specialties-header";
import { SpecialtyCards } from "@/features/specialties/components/specialty-cards";
import { specialties, specialtiesHeader } from "@/features/specialties/content";

const title = "Specialties & Services";
const description = `Minimally invasive heart valve repair, arterial coronary bypass (CABG), aortic reconstruction and preventative heart health in ${site.location.locality}.`;

export const metadata = pageMetadata({ title, description, path: "/specialties" });

export default function SpecialtiesPage() {
  return (
    <Container className="flex flex-col pb-10">
      <SpecialtiesHeader />
      <SpecialtyCards />
      <DiagnosticsHighlight />
      <PatientCohorts />
      <CareJourney />
      <div className="py-10">
        <InquiriesCta />
      </div>
      <JsonLd
        data={[
          medicalWebPageJsonLd({
            path: "/specialties",
            name: specialtiesHeader.title,
            description,
            procedures: specialties.map(({ id, title: name, description: summary }) => ({
              id,
              name,
              description: summary,
            })),
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: title, path: "/specialties" },
          ]),
        ]}
      />
    </Container>
  );
}
