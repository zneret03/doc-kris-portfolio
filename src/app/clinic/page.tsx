import { Container } from "@/components/container";
import { doctorName, site } from "@/config/site";
import { AssistancePanel } from "@/features/clinic/components/assistance-panel";
import { ClinicHeader } from "@/features/clinic/components/clinic-header";
import { ClinicInfoCards } from "@/features/clinic/components/clinic-info-cards";
import { OnlineBookingCard } from "@/features/clinic/components/online-booking-card";
import { PatientTestimonials } from "@/features/clinic/components/patient-testimonials";
import { patientTestimonials } from "@/features/clinic/content";
import { JsonLd } from "@/features/seo/components/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { breadcrumbJsonLd, contactPageJsonLd } from "@/features/seo/structured-data";

const title = "Clinic & Booking";
const description = `Book a video consultation with ${doctorName} online, or visit the clinic at ${site.location.name}, ${site.location.streetAddress}, ${site.location.locality}. Hours, directions and accessibility.`;

export const metadata = pageMetadata({ title, description, path: "/clinic" });

// One split row: visit details and contacts beside online booking. The request
// form (ConsultationRequestCard + requestConsultation) is parked until requests
// have somewhere to go; bookings run on SeriousMD meanwhile.
export default function ClinicPage() {
  return (
    <Container className="flex flex-col pb-10">
      <ClinicHeader />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col gap-14 lg:col-span-5 lg:pt-10">
          <ClinicInfoCards />
          <AssistancePanel />
        </div>
        <OnlineBookingCard className="lg:sticky lg:top-28 lg:col-span-7 lg:self-start" />
      </div>
      <PatientTestimonials testimonials={patientTestimonials} className="pt-16" />
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
