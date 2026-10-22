import { isActivePath } from "@/lib/is-active-path";

describe("isActivePath", () => {
  it("matches the home link only on the home page", () => {
    expect(isActivePath("/", "/")).toBe(true);
    expect(isActivePath("/about", "/")).toBe(false);
  });

  it("matches a section and its nested pages", () => {
    expect(isActivePath("/specialties", "/specialties")).toBe(true);
    expect(isActivePath("/specialties/valve-repair", "/specialties")).toBe(true);
  });

  it("doesn't match routes that only share a prefix", () => {
    expect(isActivePath("/clinical-trials", "/clinic")).toBe(false);
  });

  it("handles a missing pathname", () => {
    expect(isActivePath(null, "/")).toBe(false);
  });
});
