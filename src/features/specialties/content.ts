import {
  BadgeCheck,
  ClipboardList,
  Footprints,
  Languages,
  SquareCheck,
  type LucideIcon,
} from "lucide-react";

import { site } from "@/config/site";

export const specialtiesHeader = {
  title: "Specialties & clinical services",
  subtitle:
    "Orthopaedic care for sports injuries, arthritis and broken bones, starting with the least invasive treatment that will work.",
};

export type Outcome = { value: string; unit?: string; label: string };

// Verified outcome figures only, each with a source; an empty list hides the strip
export const outcomes: Outcome[] = [];

export const specialtiesIntro = {
  title: "Core specialties",
  description: "From injections and casting to keyhole surgery and joint replacement.",
};

export type Specialty = {
  /** Anchor used by links such as /specialties#sports-medicine */
  id: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  note: string;
};

// Services from the CV. The conditions listed are the usual reasons for each
// treatment: confirm them with Dr. Francisco.
export const specialties: Specialty[] = [
  {
    id: "sports-medicine",
    title: "Sports medicine & arthroscopy",
    tag: "Minimally invasive",
    description:
      "Arthroscopy is keyhole surgery: a small camera and fine instruments go into the joint through a few small incisions, so many injuries can be repaired without opening it up.",
    highlights: [
      "Knee: ligament, meniscus and cartilage injuries",
      "Shoulder: dislocations, instability and rotator cuff tears",
      "Ankle: sprains that won't settle and cartilage damage",
    ],
    note: "Fellowship-trained at Makati Medical Center",
  },
  {
    id: "joint-replacement",
    title: "Hip & knee replacement",
    tag: "Arthritis care",
    description:
      "When arthritis still limits walking, stairs or sleep after medicine, exercise and injections, replacing the worn joint surfaces can relieve pain and restore movement.",
    highlights: [
      "Arthritis care without surgery comes first",
      "Total knee and total hip replacement",
      "Rehabilitation and follow-up after the operation",
    ],
    note: "Fellowship-trained under Dr. Ramon B. Gustilo",
  },
  {
    id: "ultrasound-guided-injections",
    title: "Ultrasound-guided injections",
    tag: "Non-surgical",
    description:
      "Musculoskeletal ultrasound shows tendons, ligaments and joints in real time and guides the needle, so an injection reaches the exact spot that needs it.",
    highlights: [
      "Joint, tendon and bursa injections under ultrasound",
      "Ultrasound checks of muscles, tendons and ligaments",
      "Often tried before surgery, or instead of it",
    ],
    note: "Trained in basic and interventional MSK ultrasound",
  },
  {
    id: "fracture-care",
    title: "Fractures & general orthopaedics",
    tag: "Bone & joint care",
    description:
      "Broken bones and everyday bone, joint and muscle problems: a cast when a fracture can heal on its own, and surgery when it needs to be fixed in place.",
    highlights: [
      "Casting and splinting",
      "Surgical fixation, including intramedullary nailing",
      "Follow-up X-rays until the bone has healed",
    ],
    note: "Research on bone healing in femoral fractures",
  },
];

export const diagnostics = {
  title: "A clear diagnosis first",
  description:
    "Every plan starts with an examination and a careful look at your X-rays or MRI. Musculoskeletal ultrasound adds a live view of tendons and ligaments as they move, so treatment, and surgery if you need it, is aimed at the real cause.",
  tags: ["Physical examination", "X-ray and MRI review", "Musculoskeletal ultrasound"],
  // Illustrations, not photos of the clinic: a crop of the Pexels portrait sample
  // (hands only) and an AI-generated sample from the mockups. Replace with real photos.
  images: [
    {
      src: "/images/x-ray-review-detail.jpg",
      alt: "A doctor in a white coat holding up an X-ray film",
    },
    {
      src: "/images/surgical-instruments.jpg",
      alt: "Surgical instruments laid out on a sterile table under operating-room lights",
    },
  ],
};

export const cohortsIntro = {
  title: "Who we help",
  description:
    "Every consultation starts with your story: how the problem began, what it keeps you from doing, and what you want to get back to.",
};

export const cohorts = [
  {
    title: "Athletes & active people",
    description:
      "Football and basketball players, runners and weekend players with ligament tears, meniscus injuries, shoulder dislocations or ankle sprains that won't settle.",
    focus: "A safe, staged return to sport",
  },
  {
    title: "Joint pain & arthritis",
    description:
      "Knee and hip pain that limits walking, stairs or sleep, from early arthritis to joints worn enough to need replacing.",
    focus: "Less pain and easier movement",
  },
  {
    title: "Second opinion seekers",
    description:
      "Anyone told they need an operation who wants their X-rays, MRI and options reviewed before deciding.",
    focus: "A clear explanation of every option",
  },
];

export const journeyIntro = {
  title: "Your care journey",
  description: "From the first consultation to getting back to what you love, in three clear steps.",
};

// A real sequence, so the steps are numbered
export const journeySteps: { title: string; description: string; note: string; noteIcon: LucideIcon }[] = [
  {
    title: "Consultation & examination",
    description:
      "An unhurried conversation about your symptoms and goals, a physical examination, and a review of your X-rays or MRI, with ultrasound when it helps.",
    note: "Bring previous X-rays, MRI scans and reports",
    noteIcon: ClipboardList,
  },
  {
    title: "A plan that starts conservative",
    description:
      "Medicine, physiotherapy, bracing or an ultrasound-guided injection first. If keyhole surgery or a joint replacement will help more, every step is explained before you decide.",
    note: "Surgery only when it's the better option",
    noteIcon: SquareCheck,
  },
  {
    title: "Recovery & return to activity",
    description:
      "Follow-up visits and physiotherapy, with a staged return to work, sport and everyday life.",
    note: "Follow-up until you're moving well again",
    noteIcon: Footprints,
  },
];

export const inquiriesCta = {
  title: "Have questions about your diagnosis?",
  description:
    "Whether you're weighing treatment options, want a second opinion before surgery or are asking for a family member, a consultation is the place to talk it through.",
  trust: [
    { label: site.doctor.board, icon: BadgeCheck },
    { label: "English, Filipino & Ilonggo spoken", icon: Languages },
  ],
  cta: "Schedule a discussion",
};
