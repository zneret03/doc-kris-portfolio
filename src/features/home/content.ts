import { BadgeCheck, Building2 } from "lucide-react";

import { doctorFullName, site } from "@/config/site";

export const hero = {
  title: "Move freely again,",
  titleContinued: "on the field and off it",
  description: `${doctorFullName}, treats sports injuries, arthritis and bone, joint and muscle problems in ${site.location.locality}, with care planned around getting you back to the activities you love.`,
  credentials: [
    { icon: BadgeCheck, label: site.doctor.board },
    { icon: Building2, label: site.location.name },
  ],
  practice: { label: "Orthopaedic clinic", location: site.location.name },
};

// Facts from the CV. Outcome figures (success rates, patient numbers) need a
// verified source before they go here.
export const metrics = [
  {
    value: "2",
    label: "Orthopaedic fellowships",
    description:
      "Sports medicine and minimally invasive surgery at Makati Medical Center, and hip and knee replacement under Dr. Ramon B. Gustilo.",
  },
  {
    value: String(site.hospitals.length),
    label: "Hospital affiliations",
    description:
      "Orthopaedic consultant at hospitals including Western Visayas Medical Center, The Medical City Iloilo and St. Paul's Hospital Iloilo.",
  },
  {
    value: String(site.doctor.languages.length),
    label: "Languages spoken",
    description: "Consultations in English, Filipino or Ilonggo.",
  },
];

export const focusIntro =
  "Treatment that starts with the least invasive option and is measured by one thing: how well you move afterwards.";

export const focusAreas = [
  {
    title: "Sports injuries & arthroscopy",
    description:
      "Keyhole surgery of the knee, shoulder and ankle for torn ligaments, meniscus and cartilage injuries and unstable joints, when rest and rehabilitation aren't enough.",
    linkLabel: "Conditions treated",
    href: "/specialties#sports-medicine",
  },
  {
    title: "Hip & knee replacement",
    description:
      "For arthritis that still hurts after medicine, exercise and injections: new joint surfaces to ease the pain and get you walking comfortably again.",
    linkLabel: "When to consider it",
    href: "/specialties#joint-replacement",
  },
  {
    title: "Ultrasound-guided injections",
    description:
      "Ultrasound shows the tendon, bursa or joint as the needle goes in, so the medicine reaches the exact spot that needs it.",
    linkLabel: "How it works",
    href: "/specialties#ultrasound-guided-injections",
  },
];

export type Testimonial = {
  quote: string;
  author: string;
  context: string;
  rating: number;
};

// Real testimonials only, with the patient's written consent; null hides the section
export const featuredTestimonial: Testimonial | null = null;

export const consultBanner = {
  title: "Ready to get moving again?",
  description:
    "Book a consultation for a sports injury, joint pain or arthritis, or a second opinion before surgery.",
  cta: "Request a consultation",
};
