import { doctorName, site } from "@/config/site";

// From Dr. Francisco's CV (2026). The birth date, home address and the
// referees' phone numbers stay off the site on purpose.

const { doctor } = site;

export const aboutIntro = {
  title: `About ${doctorName}`,
  subtitle: `Orthopaedic surgeon in ${site.location.locality}, fellowship-trained in sports medicine and in hip and knee replacement.`,
  portraitCaption: {
    name: `${doctor.legalName}, ${doctor.postNominals}`,
    credentials:
      "Diplomate, Philippine Board of Orthopaedics; Fellow, Philippine Orthopaedic Association",
  },
};

export const ethos = {
  heading: "Background and approach",
  paragraphs: [
    `${doctorName} is from Iloilo City, studied medicine at West Visayas State University and trained in orthopaedic surgery at Western Visayas Medical Center. Two fellowships followed: adult arthritis, hip and knee replacement under Dr. Ramon B. Gustilo, and sports medicine and minimally invasive surgery at Makati Medical Center.`,
    `Away from the clinic, Dr. ${doctor.familyName} plays football, basketball and guitar.`,
  ],
  tenets: [
    {
      title: "Least invasive first",
      description:
        "Medicine, physiotherapy, bracing and ultrasound-guided injections come before surgery, and keyhole surgery before open surgery.",
    },
    {
      title: "Measured by movement",
      description: "The goal is getting you back to work, sport and everyday life.",
    },
    {
      title: "In your language",
      description: "Consultations in English, Filipino or Ilonggo.",
    },
  ],
};

export const credentials = [
  {
    category: "Diplomate",
    title: "Philippine Board of Orthopaedics",
    credential: "Diplomate, Philippine Board of Orthopaedics (DPBO)",
    description: "Board certified in orthopaedic surgery since November 2021.",
  },
  {
    category: "Fellow",
    title: "Philippine Orthopaedic Association",
    credential: "Fellow, Philippine Orthopaedic Association (FPOA)",
    description: "Conferred in December 2022 by the national society of orthopaedic surgeons.",
  },
  {
    category: "Licensed physician",
    title: "Professional Regulation Commission",
    credential: "Physician license, Professional Regulation Commission (Philippines)",
    description: "Passed the Physician Licensure Examination in September 2016.",
  },
];

// In chronological order
export const careerTimeline = [
  {
    title: "Doctor of Medicine",
    institution: "West Visayas State University",
    place: "Iloilo City",
    institutionType: "CollegeOrUniversity" as const,
    period: "2011 – 2015",
    description:
      "After a BS in Biological Sciences at the same university in 2011, with clinical clerkship at West Visayas State University Medical Center.",
  },
  {
    title: "Postgraduate internship",
    institution: "The Doctors Hospital",
    place: "Bacolod City",
    institutionType: "Hospital" as const,
    period: "May 2015 – April 2016",
    description: "A year of hospital rotations through the main fields of medicine before licensure.",
  },
  {
    title: "Orthopaedic residency",
    institution: "Western Visayas Medical Center",
    place: "Iloilo City",
    institutionType: "Hospital" as const,
    period: "January 2017 – July 2021",
    description:
      "Four and a half years of training in orthopaedic surgery, with research on how femoral fractures heal after intramedullary nailing.",
  },
  {
    title: "Fellowship in adult arthritis, hip and knee replacement",
    institution: "Dr. Ramon B. Gustilo Hospital",
    place: "Manapla, Negros Occidental",
    institutionType: "Hospital" as const,
    period: "April – October 2022",
    description: "Six months of training in hip and knee replacement surgery under Dr. Ramon B. Gustilo.",
  },
  {
    title: "Fellowship in sports medicine and minimally invasive surgery",
    institution: "Makati Medical Center",
    place: "Makati City",
    institutionType: "Hospital" as const,
    period: "July 2024 – February 2025",
    description: "Training in arthroscopic (keyhole) and other sports medicine surgery.",
  },
];

export const hospitalAffiliations = {
  intro: `Dr. ${doctor.familyName} is an orthopaedic consultant at these hospitals.`,
};

// Professional honours, newest first. Research awards sit with the research.
// Academic awards from college and medical school are on the CV but left out here.
export const awards = [
  {
    title: "Top 7, written examination",
    detail: "2021 Diplomate Examination, Philippine Board of Orthopaedics",
  },
  {
    title: "Top 2, national orthopaedic in-training (qualifying) examination",
    detail: "Philippine Board of Orthopaedics, April 2021",
  },
  {
    title: "Nominee, Most Outstanding Orthopaedic Resident",
    detail: "Philippine Orthopaedic Association, 2020",
  },
  {
    title: "Top 9, national orthopaedic in-training examination",
    detail: "Philippine Board of Orthopaedics, October 2019",
  },
  {
    title: "Top 6, national orthopaedic in-training examination",
    detail: "Philippine Board of Orthopaedics, October 2018",
  },
  {
    title: "Champion, 9th PCS-PSGS Inter-Hospital Post Graduate Interns' Surgical Quizbowl",
    detail: "During postgraduate internship",
  },
  {
    title: "Outstanding Surgery Intern",
    detail: "Clinical clerkship, West Visayas State University Medical Center",
  },
];

// The orthopaedic studies, newest first. Three earlier group studies from
// medical school are on the CV but left out here.
export const research = [
  {
    title:
      "Determination of radiographic healing using RUST and modified RUST in femoral shaft fractures treated with intramedullary nailing",
    authors: "Francisco KR, Detoyato L",
    year: "2020",
    recognition: [
      "Presented at the National Residents' Research Forum, Philippine Orthopaedic Association 71st Annual Convention, November 2020",
    ],
  },
  {
    title:
      "Reliability of Radiographic Union Scale for Tibial Fractures (RUST) when used in determining bone healing in femoral fractures treated with interlocked intramedullary SIGN nailing",
    authors: "Francisco KR, Detoyato L",
    year: "2018",
    recognition: [
      "1st place, National Residents' Research Forum, Philippine Orthopaedic Association 69th Annual Convention, 2018",
      "Young Orthopaedic Researcher Grant, Asia Pacific Orthopaedic Association Sports Meeting, Kuala Lumpur, April 2019",
    ],
  },
];

// The most recent courses and meetings, newest first. The CV lists earlier ones back to 2015.
export const continuingEducation = [
  {
    title: "Philippine Orthopaedic Association 75th Annual Convention",
    detail: "Metro Manila, November 2024",
  },
  {
    title: "Arthrex: New Trends in Sports Knee and Shoulder Surgery",
    detail: "Arthrex Medical Education Center, Singapore, October 2024",
  },
  {
    title: "Basic and Interventional MSK Ultrasound Course",
    detail: "Cardinal Santos Medical Center, Metro Manila, September 2024",
  },
  {
    title: "Sports Medicine and Surgery Hot Topics, 32nd Annual Postgraduate Course",
    detail: "St. Luke's Medical Center – Global City, September 2024",
  },
  {
    title: "Basic Arthroscopy of the Knee and Shoulder: A Cadaveric Workshop",
    detail: "UP College of Medicine, July 2024",
  },
  {
    title: "AO Recon Course: Principles of Total Hip and Knee Arthroplasty",
    detail: "Hong Kong, September 2023",
  },
  {
    title: "Asia Pacific Arthroplasty Society Meeting",
    detail: "Mactan, Cebu, August 2023",
  },
  {
    title: "Philippine Orthopaedic Association Midyear Convention",
    detail:
      "Bacolod City, April 2023, with workshops on the pelvis and acetabulum and on musculoskeletal ultrasound",
  },
];

export const aboutCta = {
  title: "Schedule a consultation",
  description:
    "For a sports injury, joint pain, arthritis or a fracture, or a second opinion before surgery.",
  cta: "Request a consultation",
  note: `Clinic hours at ${site.location.name}: ${site.hours.map((row) => `${row.label}, ${row.value}`).join("; ")}.`,
};
