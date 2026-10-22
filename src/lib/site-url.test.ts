import { absoluteUrl, getSiteUrl, isIndexable } from "@/lib/site-url";

const env = (values: Record<string, string>) => values as unknown as NodeJS.ProcessEnv;

describe("getSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL", () => {
    expect(
      getSiteUrl(env({ NEXT_PUBLIC_SITE_URL: "https://clinic.example", VERCEL_URL: "x.vercel.app" })).href,
    ).toBe("https://clinic.example/");
  });

  it("falls back to the Vercel production URL, then the deployment URL", () => {
    expect(
      getSiteUrl(env({ VERCEL_PROJECT_PRODUCTION_URL: "prod.example", VERCEL_URL: "x.vercel.app" })).href,
    ).toBe("https://prod.example/");
    expect(getSiteUrl(env({ VERCEL_URL: "x.vercel.app" })).href).toBe("https://x.vercel.app/");
  });

  it("uses localhost during local development", () => {
    expect(getSiteUrl(env({})).href).toBe("http://localhost:3000/");
    expect(getSiteUrl(env({ PORT: "4000" })).href).toBe("http://localhost:4000/");
  });
});

describe("absoluteUrl", () => {
  it("resolves paths against the site URL", () => {
    expect(absoluteUrl("/about", env({ NEXT_PUBLIC_SITE_URL: "https://clinic.example" }))).toBe(
      "https://clinic.example/about",
    );
  });
});

describe("isIndexable", () => {
  it("keeps preview deployments out of search results", () => {
    expect(isIndexable(env({ VERCEL_ENV: "preview" }))).toBe(false);
    expect(isIndexable(env({ VERCEL_ENV: "production" }))).toBe(true);
    expect(isIndexable(env({}))).toBe(true);
  });
});
