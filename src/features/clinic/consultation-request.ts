// Shape and validation of the consultation request form. Pure functions, so
// the same rules run in the server action and in tests.

export const modalities = [
  { value: "in-person", label: "In-person" },
  { value: "telehealth", label: "Telehealth" },
] as const;

export const timeWindows = [
  { value: "morning", label: "Morning (08:30 AM – 11:30 AM)" },
  { value: "midday", label: "Midday (11:30 AM – 02:00 PM)" },
  { value: "afternoon", label: "Afternoon (02:00 PM – 05:00 PM)" },
  { value: "earliest", label: "Earliest available operative review" },
] as const;

export type Modality = (typeof modalities)[number]["value"];
export type TimeWindow = (typeof timeWindows)[number]["value"];

export type ConsultationRequest = {
  modality: Modality;
  fullName: string;
  phone: string;
  email: string;
  /** YYYY-MM-DD */
  preferredDate: string;
  timeWindow: TimeWindow;
  reason: string;
};

export type FieldName = keyof ConsultationRequest;
export type FieldErrors = Partial<Record<FieldName, string>>;
export type SubmittedValues = Partial<Record<FieldName, string>>;

export type ConsultationFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string; fieldErrors: FieldErrors; values: SubmittedValues };

export const REASON_MAX_LENGTH = 2000;

/** The honeypot field: hidden from people, filled in by bots */
export const HONEYPOT_FIELD = "company";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const isModality = (value: string): value is Modality =>
  modalities.some((option) => option.value === value);

const isTimeWindow = (value: string): value is TimeWindow =>
  timeWindows.some((option) => option.value === value);

function isRealDate(value: string) {
  if (!DATE_PATTERN.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

/** Today's date (YYYY-MM-DD) in the given IANA time zone */
export function isoDateInTimeZone(now: Date, timeZone: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function parseConsultationRequest(
  formData: FormData,
  today: string,
): { ok: true; data: ConsultationRequest } | { ok: false; fieldErrors: FieldErrors; values: SubmittedValues } {
  const read = (name: FieldName) => {
    const value = formData.get(name);
    return typeof value === "string" ? value.trim() : "";
  };

  const values = {
    modality: read("modality"),
    fullName: read("fullName"),
    phone: read("phone"),
    email: read("email"),
    preferredDate: read("preferredDate"),
    timeWindow: read("timeWindow"),
    reason: read("reason"),
  };

  const fieldErrors: FieldErrors = {};
  const phoneDigits = values.phone.replace(/\D/g, "");

  if (!isModality(values.modality)) {
    fieldErrors.modality = "Choose in-person or telehealth.";
  }
  if (values.fullName.length < 2) {
    fieldErrors.fullName = "Enter your full name.";
  } else if (values.fullName.length > 120) {
    fieldErrors.fullName = "Use 120 characters or fewer for your name.";
  }
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    fieldErrors.phone = "Enter a phone number with area code.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    fieldErrors.email = "Enter an email like name@example.com.";
  }
  if (!values.preferredDate) {
    fieldErrors.preferredDate = "Choose a preferred date.";
  } else if (!isRealDate(values.preferredDate)) {
    fieldErrors.preferredDate = "Enter the date as month, day and year.";
  } else if (values.preferredDate < today) {
    fieldErrors.preferredDate = "Choose today or a later date.";
  }
  if (!isTimeWindow(values.timeWindow)) {
    fieldErrors.timeWindow = "Choose a preferred time window.";
  }
  if (values.reason.length > REASON_MAX_LENGTH) {
    fieldErrors.reason = `Keep this under ${REASON_MAX_LENGTH.toLocaleString("en-US")} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors, values };
  }

  return {
    ok: true,
    data: {
      ...values,
      modality: values.modality as Modality,
      timeWindow: values.timeWindow as TimeWindow,
    },
  };
}
