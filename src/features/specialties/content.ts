import { BadgeCheck, Clock, Heart, Lock, SquareCheck, type LucideIcon } from "lucide-react";

export const specialtiesHeader = {
  title: "Specialties & clinical services",
  subtitle:
    "Advanced cardiovascular interventions simplified and personalized around your recovery and quality of life.",
};

// Sample outcome figures from the mockups: verify or remove before launch
export const outcomes: { value: string; unit?: string; label: string }[] = [
  { value: "98.9%", label: "Procedure success" },
  { value: "2.4", unit: "days", label: "Median discharge" },
  { value: "1,800+", label: "Surgeries completed" },
  { value: "0%", label: "Unplanned readmissions" },
];

export const specialtiesIntro = {
  title: "Core surgical & preventative specialties",
  description:
    "Surgically conservative, technologically advanced pathways prioritizing minimal tissue disruption and lasting patency.",
};

export type Specialty = {
  /** Anchor used by links such as /specialties#valve-repair */
  id: string;
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  note: string;
};

export const specialties: Specialty[] = [
  {
    id: "valve-repair",
    title: "Minimally invasive heart valve repair",
    tag: "Minimally invasive",
    description:
      "Advanced transcatheter and micro-incision reconstructive surgery for mitral and aortic valves, designed to preserve natural anatomy and maximize physiological recovery.",
    highlights: [
      "TAVR, MitraClip & mini-thoracotomy approaches",
      "Reduced blood loss, lower infection risk & minimal scarring",
      "Rapid return to independent daily activity in days",
    ],
    note: "Post-op timeline: 48–72 hours",
  },
  {
    id: "coronary-bypass",
    title: "Coronary artery bypass (CABG)",
    tag: "Durability focused",
    description:
      "Precision surgical revascularization utilizing exclusively arterial grafts to restore unrestricted perfusion, ensuring optimal multi-decade conduit patency.",
    highlights: [
      "Advanced total arterial grafting (bilateral internal thoracic)",
      "Off-pump (beating-heart) revascularization capability",
      "Engineered for lifelong ischemic symptom resolution",
    ],
    note: "95%+ 15-year graft patency",
  },
  {
    id: "aortic-reconstruction",
    title: "Aortic care & reconstruction",
    tag: "High acuity",
    description:
      "Specialized structural repair of the ascending aorta, aortic root, and aortic arch using valve-sparing techniques and hybrid endovascular technologies.",
    highlights: [
      "Tissue-preserving David procedure (root reconstruction)",
      "Thoracic endovascular aortic repair (TEVAR) options",
      "Proactive hemodynamic stabilization and dissection management",
    ],
    note: "Valve-sparing standard",
  },
  {
    id: "preventative-cardiology",
    title: "Preventative heart health & longevity",
    tag: "Proactive longevity",
    description:
      "Data-driven cardiometabolic screening to identify subclinical disease long before emergency intervention, pairing modern biomarkers with lifestyle architecture.",
    highlights: [
      "Advanced ApoB, Lp(a) and small-dense LDL lipid fractionation",
      "Coronary artery calcium (CAC) quantification & CT angiography",
      "Cardiorespiratory conditioning & personalized pharmacological protocols",
    ],
    note: "Precision risk mapping",
  },
];

export const diagnostics = {
  title: "Integrated intraoperative diagnostics",
  description:
    "Procedures are performed within state-of-the-art hybrid surgical suites combining real-time 3D fluoroscopy, 4D transesophageal echocardiography, and immediate post-reconstruction flowmetry.",
  tags: ["4D intraoperative echo", "Transit-time flow measurement", "Intracardiac navigation"],
  // AI-generated samples from the mockups: replace with real photos
  images: [
    {
      src: "/images/surgical-instruments.jpg",
      alt: "Cardiothoracic surgical instruments laid out on a sterile table under operating-room lights",
    },
    {
      src: "/images/cardiac-ct-reconstruction.jpg",
      alt: "3D CT reconstruction of a heart and its coronary arteries on a diagnostics monitor",
    },
  ],
};

export const cohortsIntro = {
  title: "Who we help",
  description:
    "Every consultation begins with empathetic listening and an objective examination of your full medical narrative.",
};

export const cohorts = [
  {
    title: "Complex cardiac patients",
    description:
      "Patients managing severe multi-vessel disease, combined valve and vascular challenges, or anatomical variations requiring collaborative surgical stratagems.",
    focus: "Holistic surgical staging & risk optimization",
  },
  {
    title: "Second opinion seekers",
    description:
      "Individuals seeking diagnostic confirmation, alternate surgical access options, or evaluation for minimally invasive procedures after traditional open surgery recommendations.",
    focus: "Unbiased record review & less-invasive alternatives",
  },
  {
    title: "Preventative & high-risk",
    description:
      "Endurance athletes, high-stress executives, or individuals with severe familial cardiovascular history who require deep-phenotype preventative cardiometabolic planning.",
    focus: "Pre-symptomatic detection & plaque stabilization",
  },
];

export const journeyIntro = {
  title: "Your care journey",
  description:
    "Navigating cardiovascular treatment is transparent, supportive, and methodically structured from pre-consult to long-term wellness.",
};

// A real sequence, so the steps are numbered
export const journeySteps: { title: string; description: string; note: string; noteIcon: LucideIcon }[] = [
  {
    title: "In-depth consultation & diagnostics",
    description:
      "A comprehensive clinical review including echocardiograms, coronary angiographies, and functional metrics paired with unhurried discussion regarding symptoms and questions.",
    note: "60–90 minute diagnostic review",
    noteIcon: Clock,
  },
  {
    title: "Tailored treatment plan",
    description:
      "A custom treatment blueprint constructed around your exact anatomical geometry, lifestyle targets, and overall health status, utilizing the safest and most conservative surgical option.",
    note: "Multidisciplinary tumor/heart board review",
    noteIcon: SquareCheck,
  },
  {
    title: "Dedicated post-op recovery",
    description:
      "Structured progressive rehabilitation with 24/7 care team access, remote biometric recovery tracking, and a warm transition back to your primary cardiologist.",
    note: "Continuous post-discharge telemetry",
    noteIcon: Heart,
  },
];

export const inquiriesCta = {
  title: "Have questions about your diagnosis?",
  description:
    "Whether you are evaluating treatment paths, seeking a definitive second surgical opinion, or inquiring on behalf of a family member, our surgical team is prepared to guide you.",
  // Only claim HIPAA compliance if the request pipeline really meets it
  trust: [
    { label: "Board certified thoracic", icon: BadgeCheck },
    { label: "HIPAA compliant records", icon: Lock },
  ],
  cta: "Schedule a discussion",
};
