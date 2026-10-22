import "server-only";

import type { ConsultationRequest } from "@/features/clinic/consultation-request";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not-configured" | "failed" };

// Sends a validated request to CONSULTATION_WEBHOOK_URL (an inbox relay, CRM
// or automation endpoint) as JSON. In production a missing URL is an error,
// so the form never tells a patient their request went somewhere it didn't.
export async function deliverConsultationRequest(
  request: ConsultationRequest,
  env: NodeJS.ProcessEnv = process.env,
): Promise<DeliveryResult> {
  const url = env.CONSULTATION_WEBHOOK_URL;

  if (!url) {
    if (env.NODE_ENV !== "production") {
      console.info(
        "[consultation] CONSULTATION_WEBHOOK_URL is not set; accepting the request in development without sending it.",
      );
      return { ok: true };
    }
    return { ok: false, reason: "not-configured" };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(env.CONSULTATION_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${env.CONSULTATION_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify({
        type: "consultation-request",
        submittedAt: new Date().toISOString(),
        ...request,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    return response.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
