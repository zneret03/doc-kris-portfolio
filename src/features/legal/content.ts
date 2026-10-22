import { doctorFullName, formatAddressLines, site } from "@/config/site";

// Template copy that describes what this website actually does. Have it
// reviewed for the practice's jurisdiction before launch.

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDocument = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

const { contact } = site;
const contactLine = `${contact.email} or ${contact.phone.display}`;

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  updated: "October 22, 2026",
  intro: `This policy explains what information ${doctorFullName} collects through this website and how it is used.`,
  sections: [
    {
      heading: "Information you send us",
      paragraphs: [
        "When you request a consultation, the form collects the details you enter:",
      ],
      list: [
        "your name, phone number and email address",
        "whether you'd like an in-person or video consultation",
        "your preferred date and time window",
        "anything you write about your reason for visiting",
      ],
    },
    {
      heading: "How it is used",
      paragraphs: [
        "Your details are used only to respond to your request, arrange appointments and coordinate your care. They are not sold, and they are not used for advertising.",
        "Only include health information you're comfortable sending online. You can share details by phone instead.",
      ],
    },
    {
      heading: "Who receives it",
      paragraphs: [
        "Requests go to the practice's clinical coordinators, through a service provider that processes them on the practice's behalf.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: ["This website does not use advertising or analytics cookies."],
    },
    {
      heading: "How long it is kept",
      paragraphs: [
        "Information is kept for as long as it is needed to respond to you, and for as long as medical record-keeping laws require.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        `To see, correct or delete the information you've sent, contact ${contactLine}.`,
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        `${site.location.name}, ${formatAddressLines().join(", ")}. Email ${contact.email} or call ${contact.phone.display}.`,
      ],
    },
  ],
};

export const medicalDisclaimer: LegalDocument = {
  title: "Medical Disclaimer",
  updated: "October 22, 2026",
  intro:
    "The information on this website is general. It is not a substitute for advice from a clinician who knows your medical history.",
  sections: [
    {
      heading: "Emergencies",
      paragraphs: [
        `If you have chest pain, trouble breathing or another emergency, call ${contact.emergencyNumber} or go to the nearest emergency department. Don't use the online request form for urgent care.`,
      ],
    },
    {
      heading: "General information, not medical advice",
      paragraphs: [
        "Descriptions of conditions, procedures and recovery are general. Whether a treatment suits you depends on an examination and your full history.",
      ],
    },
    {
      heading: "No doctor–patient relationship",
      paragraphs: [
        "Reading this website or sending a consultation request does not create a doctor–patient relationship. That begins when a consultation is confirmed.",
      ],
    },
    {
      heading: "Outcomes and patient stories",
      paragraphs: [
        "Figures and patient stories describe past results and individual experiences. They do not guarantee a similar outcome; results vary from person to person.",
      ],
    },
    {
      heading: "Keeping information current",
      paragraphs: [
        `Content is reviewed regularly, but medicine changes. If something seems out of date, contact ${contactLine}.`,
      ],
    },
  ],
};
