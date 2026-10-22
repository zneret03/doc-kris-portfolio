export const clinicHeader = {
  title: "Clinic facility & consultations",
  subtitle:
    "World-class cardiothoracic and vascular care in a comfortable, modern clinical setting.",
  availabilityLabel: "Surgeon availability:",
  availabilityValue: "accepting new patient referrals",
};

export const accessibilityNote = {
  text: "Complimentary curbside valet at East Pavilion Entrance with barrier-free, high-capacity elevator access to Suite 400.",
  highlight: "Direct curbside valet escort",
};

// AI-generated samples from the mockups (one shows "Dr Vance" branding):
// replace with real facility photos
export const facilityGallery = [
  {
    src: "/images/consultation-lounge.jpg",
    alt: "Consultation lounge where a clinician and a patient talk across a desk in a softly lit modern office",
    title: "Private diagnostic & family counseling suites",
    subtitle: "Surgical consultation lounge",
  },
  {
    src: "/images/hybrid-operating-suite.jpg",
    alt: "Hybrid operating room with a surgical team, a robotic console and cardiac imaging displays",
    title: "Minimally invasive interventional facility",
    subtitle: "Hybrid operative suite",
  },
];

export type FacilityPhotoContent = (typeof facilityGallery)[number];

export const testimonialsIntro = {
  title: "Verified clinical outcomes",
  satisfaction: "Independently audited patient satisfaction: 99.4%",
};

export type ClinicTestimonial = {
  quote: string;
  author: string;
  treated: string;
  rating: number;
};

// Testimonials are regulated in some jurisdictions; an empty list hides the section
export const patientTestimonials: ClinicTestimonial[] = [
  {
    quote:
      "The TAVR procedure gave me back my active life with my grandchildren. Dr. Vance's team had me back walking in 3 days with virtually zero downtime.",
    author: "Robert K.",
    treated: "Treated Oct 2023",
    rating: 5,
  },
  {
    quote:
      "Dr. Vance's calm assurance and precise minimally invasive heart surgery saved my life. I felt complete peace of mind from our first consultation.",
    author: "Elena M.",
    treated: "Treated May 2023",
    rating: 5,
  },
];

export const assistance = {
  title: "Need immediate assistance?",
  description:
    "Our clinical coordinators are dedicated to arranging timely consults, transferring cardiac diagnostic imaging, and orchestrating comprehensive second opinions.",
  referralLabel: "Referral line",
  emailLabel: "Case records",
  // Only keep these claims if the request pipeline really meets them
  privacy: {
    title: "HIPAA-compliant & confidential coordination",
    description:
      "All records, DICOM telemetry scans, and medical details are protected under end-to-end 256-bit encryption.",
  },
  responseLabel: "Average response time:",
  responseValue: "under 2 hours on weekdays",
};

export const consultationForm = {
  title: "Request consultation",
  description:
    "Please specify your clinical concern and preferred schedule. Our clinical coordinator will confirm your dossier within 2 business hours.",
  submitLabel: "Request appointment",
  successMessage:
    "Thank you. Your consultation request is submitted. A coordinator will contact you promptly.",
};
