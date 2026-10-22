import { BadgeCheck, Building2 } from "lucide-react";

import { doctorFullName, site } from "@/config/site";

const years = site.doctor.yearsInPractice;

export const hero = {
  title: "Precision cardiac care,",
  titleContinued: "grounded in empathy",
  description: `${doctorFullName} — over ${years} years of surgical leadership delivering minimally invasive valve repairs, complex arterial reconstruction, and dedicated patient-first recovery.`,
  credentials: [
    { icon: BadgeCheck, label: "ABTS board certified" },
    { icon: Building2, label: "Metropolitan Heart Pavilion" },
  ],
  practice: { label: "Active surgical practice", location: site.location.name },
};

// Sample figures from the mockups: replace with verified numbers or remove
export const metrics = [
  {
    value: `${years}+ years`,
    label: "Surgical mastery",
    description:
      "Leading complex arterial and minimally invasive heart procedures across two decades.",
  },
  {
    value: "9,000+",
    label: "Patients handled",
    description:
      "Decades of dedicated clinical stewardship, consultation, and precise operative care.",
  },
  {
    value: "99%",
    label: "Patient satisfaction",
    description:
      "Independently audited clinical outcomes, low complication rates, and earned trust.",
  },
];

export const focusIntro =
  "Surgically conservative, technologically advanced pathways prioritizing minimal tissue disruption and lasting patency.";

export const focusAreas = [
  {
    title: "Minimally invasive valve repair",
    description:
      "Pioneering transcatheter options (TAVR) and keyhole mini-sternotomy protocols designed for shortened hospital stays and rapid return to daily physical mobility.",
    linkLabel: "Explore technique",
    href: "/specialties#valve-repair",
  },
  {
    title: "Coronary artery bypass (CABG)",
    description:
      "State-of-the-art arterial revascularization utilizing bilateral internal mammary arteries (BIMA) to achieve durable, superior multi-decade patency.",
    linkLabel: "Operative standards",
    href: "/specialties#coronary-bypass",
  },
  {
    title: "Preventative cardiology",
    description:
      "Advanced biomarker screening, coronary calcium scoring, and proactive longevity protocols aimed at early vascular intervention long before crises arise.",
    linkLabel: "Screening protocols",
    href: "/specialties#preventative-cardiology",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
  rating: number;
};

// Testimonials are regulated in some jurisdictions; set to null to hide
export const featuredTestimonial: Testimonial | null = {
  quote:
    "When other surgeons told me open-heart surgery was my only option, Dr. Vance performed a minimally invasive valve repair. I was back walking my dogs in five days.",
  author: "Arthur M., 62",
  context: "Minimally invasive mitral annuloplasty, one-year follow-up",
  rating: 5,
};

export const consultBanner = {
  title: "Ready to discuss your heart health?",
  description:
    "Connect directly with our clinical surgical coordinator for scheduled diagnostic consults, second opinions, or hospital transfers.",
  cta: "Request a consultation",
};
