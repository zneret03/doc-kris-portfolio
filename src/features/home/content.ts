import { BadgeCheck, Building2 } from "lucide-react";

import { doctorFullName, site } from "@/config/site";

const years = site.doctor.yearsInPractice;

export const hero = {
  title: "Move freely again,",
  titleContinued: "on the field and off it",
  description: `${doctorFullName} treats sports injuries, arthritis and bone, joint and muscle problems in ${site.location.locality}, with care planned around getting you back to the activities you love.`,
  credentials: [
    { icon: BadgeCheck, label: "Sports medicine & orthopaedics" },
    { icon: Building2, label: site.location.name },
  ],
  practice: { label: "Orthopaedic clinic", location: site.location.name },
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
  "Treatment that starts with the least invasive option and is measured by one thing: how well you move afterwards.";

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
  title: "Ready to get moving again?",
  description:
    "Book a consultation for a sports injury, joint pain or arthritis, or a second opinion before surgery.",
  cta: "Request a consultation",
};
