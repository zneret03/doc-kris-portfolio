/** @jest-environment node */
import type { ConsultationRequest } from "@/features/clinic/consultation-request";
import { deliverConsultationRequest } from "@/features/clinic/deliver-request";

const request: ConsultationRequest = {
  modality: "telehealth",
  fullName: "Kenneth Sterling",
  phone: "+1 (555) 010-2030",
  email: "kenneth@example.com",
  preferredDate: "2026-10-29",
  timeWindow: "morning",
  reason: "",
};

const env = (values: Record<string, string>) => values as unknown as NodeJS.ProcessEnv;

let fetchMock: jest.SpyInstance;

beforeEach(() => {
  fetchMock = jest.spyOn(global, "fetch");
  jest.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("deliverConsultationRequest", () => {
  it("posts the request as JSON to the webhook, with the secret when set", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 200 }));

    const result = await deliverConsultationRequest(
      request,
      env({
        NODE_ENV: "production",
        CONSULTATION_WEBHOOK_URL: "https://hooks.example/consult",
        CONSULTATION_WEBHOOK_SECRET: "s3cret",
      }),
    );

    expect(result).toEqual({ ok: true });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://hooks.example/consult");
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({
      "Content-Type": "application/json",
      Authorization: "Bearer s3cret",
    });
    expect(JSON.parse(init.body)).toEqual(
      expect.objectContaining({ type: "consultation-request", fullName: "Kenneth Sterling" }),
    );
  });

  it("reports a failure when the webhook rejects the request", async () => {
    fetchMock.mockResolvedValue(new Response(null, { status: 500 }));

    const result = await deliverConsultationRequest(
      request,
      env({ NODE_ENV: "production", CONSULTATION_WEBHOOK_URL: "https://hooks.example/consult" }),
    );

    expect(result).toEqual({ ok: false, reason: "failed" });
  });

  it("reports a failure when the webhook can't be reached", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));

    const result = await deliverConsultationRequest(
      request,
      env({ NODE_ENV: "production", CONSULTATION_WEBHOOK_URL: "https://hooks.example/consult" }),
    );

    expect(result).toEqual({ ok: false, reason: "failed" });
  });

  it("refuses to pretend in production when no webhook is configured", async () => {
    const result = await deliverConsultationRequest(request, env({ NODE_ENV: "production" }));

    expect(result).toEqual({ ok: false, reason: "not-configured" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("accepts requests in development without a webhook", async () => {
    const result = await deliverConsultationRequest(request, env({ NODE_ENV: "development" }));

    expect(result).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
