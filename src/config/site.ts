// Practice-wide facts used by the layout, pages, SEO and social images.
// Everything here is the sample persona from the Stitch mockups; replace it
// with the real practice details before launch.

export type PhoneNumber = {
  /** As shown on the page */
  display: string;
  /** E.164, used for tel: links and structured data */
  e164: string;
};

export type OpeningHours = {
  label: string;
  value: string;
  highlight?: boolean;
  /** Structured-data form, when the row is regular opening hours */
  schedule?: { days: string[]; opens: string; closes: string };
};

export const site = {
  name: "Dr. Julian Vance, MD, FACS",
  description:
    "Board-certified cardiothoracic surgeon in New York specializing in minimally invasive valve repair, arterial coronary bypass, aortic reconstruction and preventative cardiology.",
  locale: "en_US",

  doctor: {
    honorificPrefix: "Dr.",
    givenName: "Julian",
    familyName: "Vance",
    postNominals: "MD, FACS",
    initials: "JV",
    jobTitle: "Cardiothoracic & Vascular Surgeon",
    specialty: "Cardiothoracic & vascular surgery",
    board: "Diplomate, American Board of Thoracic Surgery",
    summary:
      "Providing advanced minimally invasive and complex cardiothoracic surgical care.",
    yearsInPractice: 15,
    /** Path under /public, e.g. "/images/portrait.jpg". Null shows the monogram placeholder. */
    portrait: null as string | null,
  },

  contact: {
    phone: { display: "(555) 019-2830", e164: "+15550192830" } satisfies PhoneNumber,
    referralPhone: { display: "+1 (800) 555-0198", e164: "+18005550198" } satisfies PhoneNumber,
    email: "care@drjulianvance.com",
    /** Local emergency number, used in the medical disclaimer */
    emergencyNumber: "911",
  },

  location: {
    name: "St. Jude Cardiovascular Pavilion",
    building: "Lexington Suite 400",
    streetAddress: "742 Lexington Ave, Suite 400",
    locality: "New York",
    region: "NY",
    postalCode: "10021",
    country: "US",
    entrance: "East Pavilion Concierge Entry",
    /** IANA zone used to decide which preferred dates are in the past */
    timeZone: "America/New_York",
  },

  hours: [
    {
      label: "Monday – Thursday",
      value: "08:00 – 17:00",
      schedule: {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
    { label: "Operative days (Fri)", value: "By schedule" },
    { label: "Emergency call", value: "24/7 service", highlight: true },
  ] satisfies OpeningHours[],

  /** The closing line of every page (Ft5 statement footer) */
  statement: "Precision in the theater, warmth at the bedside.",

  availability: {
    acceptingPatients: true,
    label: "Accepting surgical consultations",
  },

  /** `short` labels keep the floating nav pill content-sized (≤ 720px) */
  nav: [
    { href: "/", label: "Overview", short: "Overview" },
    { href: "/about", label: "About & credentials", short: "About" },
    { href: "/specialties", label: "Specialties & services", short: "Specialties" },
    { href: "/clinic", label: "Clinic & booking", short: "Clinic" },
  ],

  bookingHref: "/clinic#request-consultation",

  practiceAreas: [
    "Minimally Invasive Valve Repair",
    "Coronary Artery Bypass (CABG)",
    "Thoracic Aortic Reconstruction",
    "Robotic Thoracic Surgery",
  ],

  /** External patient portal. The footer link and header icon only render when set. */
  patientPortalUrl: null as string | null,

  /** Professional profiles (hospital bio, LinkedIn, Doximity…) for structured data */
  sameAs: [] as string[],
} as const;

export const doctorName = `${site.doctor.honorificPrefix} ${site.doctor.givenName} ${site.doctor.familyName}`;

export const doctorFullName = `${doctorName}, ${site.doctor.postNominals}`;

export function telHref(phone: PhoneNumber) {
  return `tel:${phone.e164}`;
}

export function formatAddressLines(location: typeof site.location = site.location) {
  return [
    location.streetAddress,
    `${location.locality}, ${location.region} ${location.postalCode}`,
  ];
}

export function directionsUrl(location: typeof site.location = site.location) {
  const destination = [
    location.streetAddress,
    location.locality,
    location.region,
    location.postalCode,
  ].join(", ");
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}
