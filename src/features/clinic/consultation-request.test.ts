import {
  isoDateInTimeZone,
  parseConsultationRequest,
  REASON_MAX_LENGTH,
} from "@/features/clinic/consultation-request";

const TODAY = "2026-10-22";

function formData(overrides: Record<string, string> = {}) {
  const data = new FormData();
  const values = {
    modality: "telehealth",
    fullName: "Kenneth Sterling",
    phone: "+1 (555) 010-2030",
    email: "kenneth@example.com",
    preferredDate: "2026-10-30",
    timeWindow: "morning",
    reason: "Second opinion on knee replacement.",
    ...overrides,
  };
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

describe("parseConsultationRequest", () => {
  it("accepts a complete request and trims whitespace", () => {
    const result = parseConsultationRequest(formData({ fullName: "  Kenneth Sterling  " }), TODAY);

    expect(result).toEqual({
      ok: true,
      data: expect.objectContaining({ fullName: "Kenneth Sterling", modality: "telehealth" }),
    });
  });

  it("allows the reason to be left out", () => {
    expect(parseConsultationRequest(formData({ reason: "" }), TODAY).ok).toBe(true);
  });

  it("explains every missing required field", () => {
    const result = parseConsultationRequest(new FormData(), TODAY);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.fieldErrors).sort()).toEqual(
      ["email", "fullName", "modality", "phone", "preferredDate", "timeWindow"].sort(),
    );
    expect(result.fieldErrors.preferredDate).toBe("Choose a preferred date.");
  });

  it("rejects values outside the allowed options", () => {
    const result = parseConsultationRequest(
      formData({ modality: "house-call", timeWindow: "midnight" }),
      TODAY,
    );

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.fieldErrors.modality).toBeDefined();
    expect(result.fieldErrors.timeWindow).toBe("Choose a preferred time window.");
  });

  it("rejects malformed contact details", () => {
    const result = parseConsultationRequest(formData({ phone: "12", email: "kenneth@" }), TODAY);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.fieldErrors.phone).toMatch(/phone number/);
    expect(result.fieldErrors.email).toBe("Enter an email like name@example.com.");
  });

  it("rejects past and impossible dates but accepts today", () => {
    const past = parseConsultationRequest(formData({ preferredDate: "2026-10-21" }), TODAY);
    const impossible = parseConsultationRequest(formData({ preferredDate: "2026-02-30" }), TODAY);

    expect(past.ok || past.fieldErrors.preferredDate).toBe("Choose today or a later date.");
    expect(impossible.ok || impossible.fieldErrors.preferredDate).toBe(
      "Enter the date as month, day and year.",
    );
    expect(parseConsultationRequest(formData({ preferredDate: TODAY }), TODAY).ok).toBe(true);
  });

  it("limits the reason's length", () => {
    const result = parseConsultationRequest(
      formData({ reason: "a".repeat(REASON_MAX_LENGTH + 1) }),
      TODAY,
    );

    expect(result.ok || result.fieldErrors.reason).toBe("Keep this under 2,000 characters.");
  });

  it("returns what was submitted so the form can be refilled", () => {
    const result = parseConsultationRequest(formData({ email: "nope" }), TODAY);

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.values).toEqual(
      expect.objectContaining({ fullName: "Kenneth Sterling", email: "nope" }),
    );
  });
});

describe("isoDateInTimeZone", () => {
  it("uses the clinic's calendar date, not the server's", () => {
    // 16:30 UTC on Oct 22 is already Oct 23 in Manila
    const now = new Date("2026-10-22T16:30:00Z");

    expect(isoDateInTimeZone(now, "Asia/Manila")).toBe("2026-10-23");
    expect(isoDateInTimeZone(now, "UTC")).toBe("2026-10-22");
  });
});
