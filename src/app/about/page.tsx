import { Container } from "@/components/container";
import { doctorName, site } from "@/config/site";
import { AboutCta } from "@/features/about/components/about-cta";
import { AboutIntro } from "@/features/about/components/about-intro";
import { AboutPortrait } from "@/features/about/components/about-portrait";
import { CareerTimeline } from "@/features/about/components/career-timeline";
import { CredentialsGrid } from "@/features/about/components/credentials-grid";
import { HospitalPrivileges } from "@/features/about/components/hospital-privileges";
import {
  aboutIntro,
  careerTimeline,
  credentials,
  hospitalPrivileges,
} from "@/features/about/content";
import { JsonLd } from "@/features/seo/components/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { breadcrumbJsonLd, profilePageJsonLd } from "@/features/seo/structured-data";

const title = "About & Credentials";
const description = `Board certification, fellowships, career milestones and hospital privileges of ${doctorName}, ${site.doctor.jobTitle.toLowerCase()} in ${site.location.locality}.`;

export const metadata = pageMetadata({
  title,
  description,
  path: "/about",
  openGraph: {
    type: "profile",
    firstName: site.doctor.givenName,
    lastName: site.doctor.familyName,
  },
});

export default function AboutPage() {
  return (
    <Container className="pt-6 pb-10 lg:pt-10">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <article className="max-w-[65ch] lg:col-span-7">
          <AboutIntro />
          <CredentialsGrid />
          <CareerTimeline />
          <HospitalPrivileges />
          <AboutCta />
        </article>
        <aside className="hidden lg:col-span-4 lg:col-start-9 lg:block">
          <AboutPortrait className="sticky top-28" />
        </aside>
      </div>
      <JsonLd
        data={[
          profilePageJsonLd({
            path: "/about",
            description: aboutIntro.subtitle,
            education: careerTimeline.map((step) => ({
              name: step.institution,
              type: step.institutionType,
            })),
            credentials: credentials.flatMap((item) => (item.credential ? [item.credential] : [])),
            affiliations: hospitalPrivileges.map((hospital) => hospital.name),
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: title, path: "/about" },
          ]),
        ]}
      />
    </Container>
  );
}
