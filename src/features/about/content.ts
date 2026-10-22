import { doctorName, site } from "@/config/site";

const years = site.doctor.yearsInPractice;

export const aboutIntro = {
  title: `About ${doctorName}`,
  subtitle: `${years} years of dedicated cardiovascular surgery and compassionate patient advocacy.`,
  leadership: { label: "Clinical leadership", role: "Chief of Minimally Invasive Surgery" },
  certification: { label: "Diplomate ABTS", status: "active board certification" },
};

export const ethos = {
  heading: "Surgical ethos & mission",
  paragraphs: [
    `Cardiothoracic intervention stands at the profound intersection of unforgiving biomechanics and vulnerable human emotion. ${doctorName} approaches every surgical challenge through an ethos of micro-precision technical mastery paired with genuine human empathy and patient comfort.`,
    `Over a fifteen-year operative career, Dr. ${site.doctor.familyName} has championed tissue-sparing transcatheter techniques and minimally invasive port-access valve repair, diminishing physiological trauma while prioritizing long-term functional recovery and dignity for each individual under his care.`,
  ],
  tenets: [
    {
      title: "Micro-invasive protocol",
      description:
        "Optimizing sternal preservation and minimizing incision burden for faster ambulation.",
    },
    {
      title: "Holistic advocacy",
      description:
        "Direct physician-led consultation through preoperative planning and post-acute follow-up.",
    },
  ],
};

export const credentials = [
  {
    category: "Board certified",
    title: "Thoracic surgery",
    credential: "Board Certification in Thoracic Surgery, American Board of Thoracic Surgery",
    description:
      "American Board of Thoracic Surgery (ABTS) certified, governing supreme standard in complex cardiothoracic operations.",
  },
  {
    category: "Elected fellow",
    title: "American College of Surgeons",
    credential: "Fellow, American College of Surgeons (FACS)",
    description:
      "Distinguished FACS surgical honor designation recognizing exceptional clinical ethics and operative competence.",
  },
  {
    category: "Fellow designation",
    title: "American College of Cardiology",
    credential: "Fellow, American College of Cardiology (FACC)",
    description:
      "FACC Interventional & Valvular Fellow contributing to national structural heart disease standards.",
  },
  {
    category: "Senior experience",
    title: `${years}+ years active practice`,
    credential: null,
    description:
      "Continuous surgical privileges, departmental leadership, and over 3,200 successful thoracic operations performed.",
  },
];

// In chronological order
export const careerTimeline = [
  {
    title: "Medical doctorate (MD)",
    institution: "Harvard Medical School",
    institutionType: "CollegeOrUniversity" as const,
    description:
      "Graduated Magna Cum Laude. Honored recipient of the Soma Weiss Research Award in Cardiovascular Pathophysiology.",
  },
  {
    title: "Surgical residency",
    institution: "Johns Hopkins Hospital",
    institutionType: "Hospital" as const,
    description:
      "Completed rigorous general and vascular surgical training, concluding tenure as General Surgery Chief Resident.",
  },
  {
    title: "Advanced fellowship",
    institution: "Cleveland Clinic & Metropolitan Heart",
    institutionType: "Hospital" as const,
    description:
      "Cardiothoracic & Minimally Invasive Fellowship specializing in robotic aortic root reconstruction and video-assisted thoracic surgery (VATS).",
  },
];

export const hospitalPrivileges = [
  {
    name: "St. Jude Medical Center",
    unit: "Cardiovascular Pavilion",
    campus: "primary campus",
    role: "Senior attending surgeon",
  },
  {
    name: "Metropolitan Heart Pavilion",
    unit: "Institute of Advanced Vascular Surgery",
    campus: "specialty center",
    role: "Director of advanced surgery",
  },
];

export const aboutCta = {
  title: "Schedule an operative consultation",
  description:
    "Accepting prospective patient evaluations, complex second opinions, and institutional referrals across cardiothoracic and vascular subspecialties.",
  cta: "Schedule a consultation",
  note: "A clinical coordinator is available Monday to Friday. Telehealth consultations are available for out-of-state patients.",
};
