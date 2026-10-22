import { Container } from "@/components/container";
import { doctorName, site } from "@/config/site";
import { requestConsultation } from "@/features/clinic/actions";
import { AssistancePanel } from "@/features/clinic/components/assistance-panel";
import { ClinicHeader } from "@/features/clinic/components/clinic-header";
import { ClinicInfoCards } from "@/features/clinic/components/clinic-info-cards";
import { ConsultationRequestCard } from "@/features/clinic/components/consultation-request-card";
import { FacilityPhoto } from "@/features/clinic/components/facility-gallery";
import { PatientTestimonials } from "@/features/clinic/components/patient-testimonials";
import { facilityGallery, patientTestimonials } from "@/features/clinic/content";
import { JsonLd } from "@/features/seo/components/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/features/seo/structured-data";

const title = "Clinic & Booking";
const description = `Request an in-person or video consultation with ${doctorName} at ${site.location.name}, ${site.location.streetAddress}, ${site.location.locality}. Hours, directions and accessibility.`;

export const metadata = pageMetadata({ title, description, path: "/clinic" });

export default function ClinicPage() {
  return (
    <Container className="flex flex-col pb-10">
      <ClinicHeader />
      <div className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-12 lg:gap-12">
        <ClinicInfoCards className="lg:col-span-5" />
        <FacilityPhoto photo={facilityGallery[0]} className="lg:col-span-7" />
      </div>
      <div className="grid grid-cols-1 items-center gap-10 pb-16 lg:grid-cols-12 lg:gap-12">
        <FacilityPhoto photo={facilityGallery[1]} className="lg:col-span-6" />
        <PatientTestimonials testimonials={patientTestimonials} className="lg:col-span-6" />
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <AssistancePanel className="lg:col-span-5 lg:pt-10" />
        <ConsultationRequestCard action={requestConsultation} className="lg:col-span-7" />
      </div>
      <JsonLd
        data={[
          contactPageJsonLd({ path: "/clinic", name: title }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: title, path: "/clinic" },
          ]),
        ]}
      />
    </Container>
  );
}
