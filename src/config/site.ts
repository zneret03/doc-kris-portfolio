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
  name: "Dr. Kris Francisco, MD",
  description:
    "Sports medicine, arthritis and orthopaedic care in Iloilo City. Dr. Kris Francisco treats sports injuries, joint pain and bone and muscle problems at Qualimed Healthway Hospital, Mandurriao.",
  locale: "en_PH",

  doctor: {
    honorificPrefix: "Dr.",
    givenName: "Kris",
    familyName: "Francisco",
    postNominals: "MD",
    initials: "KF",
    jobTitle: "Orthopaedic & Sports Medicine Specialist",
    specialty: "Sports medicine, arthritis & orthopaedics",
    /** Board or society membership, e.g. a PBOS diplomate or POA fellowship: still to confirm */
    board: null as string | null,
    summary: "Helping Iloilo move better, from sports injuries to arthritic joints.",
    yearsInPractice: 15,
    /**
     * Path under /public, e.g. "/images/portrait.jpg". Null shows the monogram placeholder.
     * Currently a stock sample (Pexels licence) for the doctor to choose a style from; the
     * others are in /images/portrait-samples/ (clinic-scrubs, studio-plain, relaxed-seated).
     * Replace with the doctor's own photo before launch.
     */
    portrait: "/images/portrait-samples/x-ray-review.jpg" as string | null,
  },

  contact: {
    phone: { display: "(555) 019-2830", e164: "+15550192830" } satisfies PhoneNumber,
    referralPhone: { display: "+1 (800) 555-0198", e164: "+18005550198" } satisfies PhoneNumber,
    email: "care@drjulianvance.com",
    /** Local emergency number, used in the medical disclaimer */
    emergencyNumber: "911",
  },

  // Address and hours from a public clinic directory listing (clinicfinderph.com):
  // confirm both with the clinic before launch
  location: {
    name: "Qualimed Healthway Hospital",
    building: "Orthopaedic Clinic, 3rd floor",
    streetAddress: "Donato Pison Ave, Mandurriao",
    locality: "Iloilo City",
    region: "Iloilo",
    postalCode: "5000",
    country: "PH",
    entrance: "Ask at the main lobby for the 3rd-floor orthopaedic clinic",
    /** IANA zone used to decide which preferred dates are in the past */
    timeZone: "Asia/Manila",
  },

  hours: [
    {
      label: "Tuesday",
      value: "3:00 – 5:00 PM",
      schedule: { days: ["Tuesday"], opens: "15:00", closes: "17:00" },
    },
    {
      label: "Thursday & Friday",
      value: "10:00 AM – 12:00 PM",
      schedule: { days: ["Thursday", "Friday"], opens: "10:00", closes: "12:00" },
    },
  ] satisfies OpeningHours[],

  /** The closing line of every page (Ft5 statement footer) */
  statement: "Back on the field, back on your feet.",

  availability: {
    acceptingPatients: true,
    label: "Accepting new patients",
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
    "Sports Injury Treatment",
    "Arthritis Care",
    "Orthopaedic Consultation",
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
