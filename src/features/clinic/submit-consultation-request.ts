import { site } from "@/config/site";
import {
  HONEYPOT_FIELD,
  isoDateInTimeZone,
  parseConsultationRequest,
  type ConsultationFormState,
} from "@/features/clinic/consultation-request";
import { consultationForm } from "@/features/clinic/content";
import { deliverConsultationRequest } from "@/features/clinic/deliver-request";

type Dependencies = {
  deliver?: typeof deliverConsultationRequest;
  now?: Date;
};

export async function submitConsultationRequest(
  formData: FormData,
  { deliver = deliverConsultationRequest, now = new Date() }: Dependencies = {},
): Promise<ConsultationFormState> {
  if (formData.get(HONEYPOT_FIELD)) {
    // Look successful so automated submissions don't retry
    return { status: "success", message: consultationForm.successMessage };
  }

  const today = isoDateInTimeZone(now, site.location.timeZone);
  const parsed = parseConsultationRequest(formData, today);

  if (!parsed.ok) {
    return {
      status: "error",
      message: "Some details need attention. Check the highlighted fields and send the request again.",
      fieldErrors: parsed.fieldErrors,
      values: parsed.values,
    };
  }

  const delivery = await deliver(parsed.data);

  if (!delivery.ok) {
    return {
      status: "error",
      message: `Online requests can't be sent right now. Call ${site.contact.phone.display} to book your consultation.`,
      fieldErrors: {},
      values: parsed.data,
    };
  }

  return { status: "success", message: consultationForm.successMessage };
}
