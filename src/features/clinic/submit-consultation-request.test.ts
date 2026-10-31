/** @jest-environment node */
import { HONEYPOT_FIELD } from "@/features/clinic/consultation-request";
import { consultationForm } from "@/features/clinic/content";
import { submitConsultationRequest } from "@/features/clinic/submit-consultation-request";

const now = new Date("2026-10-22T15:00:00Z");

function validForm() {
  const data = new FormData();
  data.set("modality", "in-person");
  data.set("fullName", "Kenneth Sterling");
  data.set("phone", "+1 (555) 010-2030");
  data.set("email", "kenneth@example.com");
  data.set("preferredDate", "2026-10-29");
  data.set("timeWindow", "afternoon");
  data.set("reason", "");
  return data;
}

describe("submitConsultationRequest", () => {
  it("delivers a valid request and confirms it", async () => {
    const deliver = jest.fn().mockResolvedValue({ ok: true });

    const state = await submitConsultationRequest(validForm(), { deliver, now });

    expect(deliver).toHaveBeenCalledWith(
      expect.objectContaining({ fullName: "Kenneth Sterling", timeWindow: "afternoon" }),
    );
    expect(state).toEqual({ status: "success", message: consultationForm.successMessage });
  });

  it("returns field errors without delivering an invalid request", async () => {
    const deliver = jest.fn();
    const form = validForm();
    form.set("email", "not-an-email");

    const state = await submitConsultationRequest(form, { deliver, now });

    expect(deliver).not.toHaveBeenCalled();
    expect(state.status).toBe("error");
    if (state.status !== "error") return;
    expect(state.fieldErrors.email).toBeDefined();
    expect(state.values.email).toBe("not-an-email");
  });

  it("tells the patient to call when the request can't be delivered", async () => {
    const deliver = jest.fn().mockResolvedValue({ ok: false, reason: "not-configured" });

    const state = await submitConsultationRequest(validForm(), { deliver, now });

    expect(state.status).toBe("error");
    if (state.status !== "error") return;
    expect(state.message).toContain("0943-497-7849");
    expect(state.values.fullName).toBe("Kenneth Sterling");
  });

  it("quietly drops submissions that fill the honeypot", async () => {
    const deliver = jest.fn();
    const form = validForm();
    form.set(HONEYPOT_FIELD, "Acme Corp");

    const state = await submitConsultationRequest(form, { deliver, now });

    expect(deliver).not.toHaveBeenCalled();
    expect(state.status).toBe("success");
  });
});
