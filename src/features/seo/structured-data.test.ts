/** @jest-environment node */
import {
  breadcrumbJsonLd,
  medicalWebPageJsonLd,
  physicianJsonLd,
  profilePageJsonLd,
  serializeJsonLd,
  websiteJsonLd,
} from "@/features/seo/structured-data";

const ORIGIN = "https://clinic.example";

beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = ORIGIN;
});

afterAll(() => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
});

describe("serializeJsonLd", () => {
  it("escapes < so a value can't close the script tag", () => {
    const json = serializeJsonLd({ "@type": "Thing", name: "</script><script>alert(1)</script>" });

    expect(json).not.toContain("<");
    expect(JSON.parse(json).name).toBe("</script><script>alert(1)</script>");
  });
});

describe("physicianJsonLd", () => {
  it("describes the practice for local search", () => {
    const data = physicianJsonLd();

    expect(data).toEqual(
      expect.objectContaining({
        "@context": "https://schema.org",
        "@type": "Physician",
        "@id": `${ORIGIN}/#physician`,
        url: `${ORIGIN}/`,
        telephone: "+639434977849",
        isAcceptingNewPatients: true,
        address: expect.objectContaining({ "@type": "PostalAddress", postalCode: "5000" }),
      }),
    );
    expect(data.openingHoursSpecification).toEqual([
      expect.objectContaining({ dayOfWeek: ["https://schema.org/Tuesday"], opens: "15:00", closes: "17:00" }),
      expect.objectContaining({
        dayOfWeek: ["https://schema.org/Thursday", "https://schema.org/Friday"],
        opens: "10:00",
        closes: "12:00",
      }),
    ]);
    expect(data.hospitalAffiliation).toEqual(
      expect.arrayContaining([{ "@type": "Hospital", name: "Western Visayas Medical Center" }]),
    );
  });

  it("never includes review or rating markup", () => {
    const json = JSON.stringify([physicianJsonLd(), websiteJsonLd()]);

    expect(json).not.toMatch(/Review|aggregateRating/i);
  });
});

describe("breadcrumbJsonLd", () => {
  it("numbers items from 1 with absolute URLs", () => {
    expect(
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]).itemListElement,
    ).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: `${ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${ORIGIN}/about` },
    ]);
  });
});

describe("profilePageJsonLd", () => {
  it("links the doctor to the practice, education, credentials and hospitals", () => {
    const data = profilePageJsonLd({
      path: "/about",
      description: "Orthopaedic surgeon.",
      education: [{ name: "West Visayas State University", type: "CollegeOrUniversity" }],
      credentials: ["Fellow, Philippine Orthopaedic Association (FPOA)"],
      affiliations: ["Western Visayas Medical Center"],
    });

    expect(data["@type"]).toBe("ProfilePage");
    expect(data.mainEntity).toEqual(
      expect.objectContaining({
        "@type": "Person",
        honorificPrefix: "Dr.",
        alternateName: "Kris Raymund A. Francisco",
        knowsLanguage: ["English", "Filipino", "Ilonggo"],
        worksFor: { "@id": `${ORIGIN}/#physician` },
        alumniOf: [{ "@type": "CollegeOrUniversity", name: "West Visayas State University" }],
        hasCredential: [
          expect.objectContaining({ name: "Fellow, Philippine Orthopaedic Association (FPOA)" }),
        ],
        affiliation: [{ "@type": "Hospital", name: "Western Visayas Medical Center" }],
      }),
    );
  });
});

describe("medicalWebPageJsonLd", () => {
  it("lists each procedure with a link to its section", () => {
    const data = medicalWebPageJsonLd({
      path: "/specialties",
      name: "Specialties",
      description: "Procedures.",
      procedures: [{ id: "joint-replacement", name: "Hip & knee replacement", description: "Replacement." }],
    });

    expect(data.about).toEqual([
      expect.objectContaining({
        "@type": "MedicalProcedure",
        name: "Hip & knee replacement",
        url: `${ORIGIN}/specialties#joint-replacement`,
      }),
    ]);
  });
});
