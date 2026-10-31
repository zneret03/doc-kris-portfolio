import { site } from "@/config/site";

export const clinicHeader = {
  title: "Clinic facility & consultations",
  subtitle: `Sports medicine, arthritis and orthopaedic consultations at ${site.location.name}, ${site.location.locality}.`,
  availabilityLabel: "Doctor availability:",
  availabilityValue: "accepting new patients",
};

export const accessibilityNote = {
  text: `The clinic is on the 3rd floor of ${site.location.name}, with lift access from the main lobby.`,
  highlight: "Lift access to the 3rd floor",
};

export const testimonialsIntro = {
  title: "Patient stories",
  note: "Shared with each patient's written permission.",
};

export type ClinicTestimonial = {
  quote: string;
  author: string;
  treated: string;
  rating: number;
};

// Real testimonials only, with the patient's written consent; an empty list hides the section
export const patientTestimonials: ClinicTestimonial[] = [];

export const assistance = {
  title: "Questions before you book?",
  description:
    "Call or email to ask about clinic schedules, what to bring or a second opinion. For a serious injury that can't wait, go to the nearest emergency department.",
  phoneLabel: "Phone",
  emailLabel: "Email",
  privacy: {
    title: "Kept private",
    description:
      "Your details are used only to arrange your consultation and care. Prefer not to share health details online? Call instead.",
  },
};

export const onlineBooking = {
  title: "Book an online consultation",
  description:
    "Request a video consultation on NowServing, SeriousMD's booking service. You'll answer a few questions first, and the consultation itself happens in the NowServing app.",
  cta: "Book on NowServing",
  inPersonNote: "For a visit at the clinic, call to book an appointment.",
};

// Copy for the on-site request form, parked while bookings go through
// SeriousMD (see src/app/clinic/page.tsx)
export const consultationForm = {
  title: "Request consultation",
  description:
    "Tell us what's bothering you and when you'd like to come in. The clinic will contact you to confirm a schedule.",
  submitLabel: "Request appointment",
  successMessage:
    "Thank you. Your request has been sent, and the clinic will contact you to confirm a schedule.",
};
