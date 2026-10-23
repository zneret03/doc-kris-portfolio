import { doctorFullName, site } from "@/config/site";
import { absoluteUrl } from "@/lib/site-url";

// schema.org JSON-LD builders. Pages pass in page-specific data; nothing
// here marks up reviews or ratings, which Google treats as self-serving on a
// practice's own site.

export type JsonLdObject = { "@context"?: string; "@type": string } & Record<string, unknown>;

const CONTEXT = "https://schema.org";

export const physicianId = () => absoluteUrl("/#physician");
export const personId = () => absoluteUrl("/about#person");

export function serializeJsonLd(data: JsonLdObject): string {
  // Escape "<" so a value can never close the surrounding <script> tag
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function postalAddress() {
  const { location } = site;
  return {
    "@type": "PostalAddress",
    streetAddress: location.streetAddress,
    addressLocality: location.locality,
    addressRegion: location.region,
    postalCode: location.postalCode,
    addressCountry: location.country,
  };
}

function withSameAs<T extends object>(entity: T): T & { sameAs?: string[] } {
  return site.sameAs.length > 0 ? { ...entity, sameAs: [...site.sameAs] } : entity;
}

// The practice, shown on every page
export function physicianJsonLd(): JsonLdObject {
  return withSameAs({
    "@context": CONTEXT,
    "@type": "Physician",
    "@id": physicianId(),
    name: doctorFullName,
    description: site.description,
    url: absoluteUrl("/"),
    image: absoluteUrl("/opengraph-image"),
    logo: absoluteUrl("/apple-icon"),
    telephone: site.contact.phone.e164,
    email: site.contact.email,
    address: postalAddress(),
    medicalSpecialty: ["https://schema.org/Musculoskeletal"],
    isAcceptingNewPatients: site.availability.acceptingPatients,
    openingHoursSpecification: site.hours.flatMap((row) =>
      "schedule" in row && row.schedule
        ? [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: row.schedule.days.map((day) => `https://schema.org/${day}`),
              opens: row.schedule.opens,
              closes: row.schedule.closes,
            },
          ]
        : [],
    ),
    availableService: site.practiceAreas.map((name) => ({ "@type": "MedicalProcedure", name })),
  });
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    url: absoluteUrl("/"),
    name: doctorFullName,
    inLanguage: "en-US",
    publisher: { "@id": physicianId() },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ProfileInput = {
  path: string;
  description: string;
  education: { name: string; type: "CollegeOrUniversity" | "Hospital" }[];
  credentials: string[];
  affiliations: string[];
};

export function profilePageJsonLd({
  path,
  description,
  education,
  credentials,
  affiliations,
}: ProfileInput): JsonLdObject {
  const { doctor } = site;
  return {
    "@context": CONTEXT,
    "@type": "ProfilePage",
    url: absoluteUrl(path),
    mainEntity: withSameAs({
      "@type": "Person",
      "@id": personId(),
      name: `${doctor.givenName} ${doctor.familyName}`,
      givenName: doctor.givenName,
      familyName: doctor.familyName,
      honorificPrefix: doctor.honorificPrefix,
      honorificSuffix: doctor.postNominals,
      jobTitle: doctor.jobTitle,
      description,
      ...(doctor.portrait ? { image: absoluteUrl(doctor.portrait) } : {}),
      worksFor: { "@id": physicianId() },
      alumniOf: education.map(({ name, type }) => ({ "@type": type, name })),
      hasCredential: credentials.map((name) => ({
        "@type": "EducationalOccupationalCredential",
        name,
      })),
      affiliation: affiliations.map((name) => ({ "@type": "Hospital", name })),
    }),
  };
}

type ProceduresInput = {
  path: string;
  name: string;
  description: string;
  procedures: { id: string; name: string; description: string }[];
};

export function medicalWebPageJsonLd({
  path,
  name,
  description,
  procedures,
}: ProceduresInput): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "MedicalWebPage",
    url: absoluteUrl(path),
    name,
    description,
    about: procedures.map((procedure) => ({
      "@type": "MedicalProcedure",
      name: procedure.name,
      description: procedure.description,
      url: absoluteUrl(`${path}#${procedure.id}`),
    })),
    publisher: { "@id": physicianId() },
  };
}

export function contactPageJsonLd({ path, name }: { path: string; name: string }): JsonLdObject {
  return {
    "@context": CONTEXT,
    "@type": "ContactPage",
    url: absoluteUrl(path),
    name,
    mainEntity: { "@id": physicianId() },
  };
}
