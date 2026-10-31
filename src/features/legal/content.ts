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
  updated: "October 31, 2026",
  intro: `This policy explains what information ${doctorFullName} collects through this website and how it is used.`,
  sections: [
    {
      heading: "Booking a consultation",
      paragraphs: [
        "Consultations are booked on SeriousMD and its NowServing service, which open in a new tab. What you enter there is collected and handled by SeriousMD under its own terms and privacy policy, and your booking is shared with the clinic so it can arrange your consultation.",
      ],
    },
    {
      heading: "How it is used",
      paragraphs: [
        "Details you give the clinic, by phone, by email or through a booking, are used only to arrange appointments and coordinate your care. They are not sold, and they are not used for advertising.",
        "Only include health information you're comfortable sending online. You can share details by phone instead.",
      ],
    },
    {
      heading: "Who receives it",
      paragraphs: [
        "Dr. Francisco's clinic, to arrange and prepare for your consultation.",
      ],
    },
    {
      heading: "Cookies and analytics",
      paragraphs: [
        "This website does not use advertising or analytics cookies. SeriousMD and NowServing have their own cookie policies.",
      ],
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
        `Under the Data Privacy Act of 2012, you can ask to see, correct or delete the information you've sent. Contact ${contactLine}.`,
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
  updated: "October 31, 2026",
  intro:
    "The information on this website is general. It is not a substitute for advice from a clinician who knows your medical history.",
  sections: [
    {
      heading: "Emergencies",
      paragraphs: [
        `If you have a serious injury, such as a bone that may be broken or a joint that's out of place, or chest pain, trouble breathing or another emergency, call ${contact.emergencyNumber} or go to the nearest emergency department. Don't use online booking for urgent care.`,
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
        "Reading this website or booking a consultation online does not create a doctor–patient relationship. That begins when a consultation is confirmed.",
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
