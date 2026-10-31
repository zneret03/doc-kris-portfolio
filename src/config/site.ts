// Practice-wide facts used by the layout, pages, SEO and social images.
// Credentials, languages, hospitals and contact details come from Dr.
// Francisco's CV (2026); the clinic address and hours from a public listing.

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
  name: "Dr. Kris Francisco, MD, DPBO, FPOA",
  /** Search titles and descriptions use "orthopedic", the spelling people search with */
  searchTitle: "Orthopedic Surgeon in Iloilo City",
  description:
    "Dr. Kris Francisco is a board-certified orthopedic doctor in Iloilo City for sports injuries, arthritis, fractures, and hip and knee replacement.",
  locale: "en_PH",

  doctor: {
    honorificPrefix: "Dr.",
    givenName: "Kris",
    familyName: "Francisco",
    /** Full name as it appears on the CV, for the profile and structured data */
    legalName: "Kris Raymund A. Francisco",
    postNominals: "MD, DPBO, FPOA",
    initials: "KF",
    jobTitle: "Orthopaedic Surgeon",
    specialty: "Sports medicine, arthritis & orthopaedics",
    board: "Diplomate, Philippine Board of Orthopaedics",
    summary: "Helping Iloilo move better, from sports injuries to arthritic joints.",
    languages: ["English", "Filipino", "Ilonggo"],
    /**
     * Path under /public, e.g. "/images/portrait.jpg". Null shows the monogram placeholder.
     * A square crop of /images/doc-kris-profile.jpg that stops above the coat embroidery
     * and the caption band baked into the original.
     */
    portrait: "/images/kris-francisco-portrait.jpg" as string | null,
  },

  contact: {
    // The doctor's own mobile and email from the CV. Swap in a clinic or
    // secretary line here if patients shouldn't call the doctor directly.
    // Hyphens, not spaces: this typeface's narrow space barely separates digits.
    phone: { display: "0943-497-7849", e164: "+639434977849" } satisfies PhoneNumber,
    email: "dockrisfrancisco@gmail.com",
    /** Local emergency number, used in the medical disclaimer */
    emergencyNumber: "911",
  },

  // Address and hours from a public clinic directory listing (clinicfinderph.com):
  // confirm both with the clinic before launch. The hospital name follows the CV.
  location: {
    name: "Healthway Qualimed Hospital",
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

  /** Hospitals where Dr. Francisco is an orthopaedic consultant, in the CV's order */
  hospitals: [
    "Western Visayas Medical Center",
    "Healthway Qualimed Hospital Iloilo",
    "The Medical City Iloilo",
    "Medicus Medical Center",
    "Iloilo Doctors' Hospital",
    "Antique Medical Center",
    "Asia Pacific Medical Center – Iloilo City",
    "Holy Mary Women's and Children's Hospital",
    "St. Paul's Hospital Iloilo",
  ],

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

  /** Every "Book consultation" link: Dr. Francisco's SeriousMD profile, where patients book online */
  bookingHref: "https://seriousmd.com/doc/kris-raymund-francisco",
  /**
   * NowServing booking for the online clinic (clinic 39612, video), used on the
   * clinic page. No appointmentdate: the booking flow opens the same without it,
   * and a fixed date would go stale.
   */
  onlineBookingHref: "https://nowserving.seriousmd.com/doctor/kris-raymund-francisco?clinicid=39612&virtual=1",

  /** Services for structured data; they match the specialties page */
  practiceAreas: [
    "Sports medicine and arthroscopy",
    "Hip and knee replacement",
    "Ultrasound-guided injections",
    "Fracture care",
  ],

  /** External patient portal. The footer link and header icon only render when set. */
  patientPortalUrl: null as string | null,

  /** Profiles of the doctor elsewhere (booking sites, Facebook page) for structured data */
  sameAs: ["https://seriousmd.com/doc/kris-raymund-francisco"] as string[],
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
