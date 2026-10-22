"use server";

import type { ConsultationFormState } from "@/features/clinic/consultation-request";
import { submitConsultationRequest } from "@/features/clinic/submit-consultation-request";

export async function requestConsultation(
  _previousState: ConsultationFormState,
  formData: FormData,
): Promise<ConsultationFormState> {
  return submitConsultationRequest(formData);
}
