import { Container } from "@/components/container";
import { doctorName, site } from "@/config/site";
import { AboutCta } from "@/features/about/components/about-cta";
import { AboutIntro } from "@/features/about/components/about-intro";
import { AboutPortrait } from "@/features/about/components/about-portrait";
import { AwardsList } from "@/features/about/components/awards-list";
import { CareerTimeline } from "@/features/about/components/career-timeline";
import { ContinuingEducation } from "@/features/about/components/continuing-education";
import { CredentialsGrid } from "@/features/about/components/credentials-grid";
import { HospitalAffiliations } from "@/features/about/components/hospital-affiliations";
import { ResearchList } from "@/features/about/components/research-list";
import { aboutIntro, careerTimeline, credentials } from "@/features/about/content";
import { JsonLd } from "@/features/seo/components/json-ld";
import { pageMetadata } from "@/features/seo/metadata";
import { breadcrumbJsonLd, profilePageJsonLd } from "@/features/seo/structured-data";

const title = "About & Credentials";
const description = `Board certification, fellowship training, hospital affiliations, awards and research of ${doctorName}, ${site.doctor.jobTitle.toLowerCase()} in ${site.location.locality}.`;

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
          <HospitalAffiliations />
          <AwardsList />
          <ResearchList />
          <ContinuingEducation />
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
            credentials: credentials.map((item) => item.credential),
            affiliations: [...site.hospitals],
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
