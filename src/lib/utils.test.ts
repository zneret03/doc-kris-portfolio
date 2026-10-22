import { readFileSync } from "node:fs";
import { join } from "node:path";

import { cn, themeFontSizes, themeShadows } from "@/lib/utils";

const globalsCss = readFileSync(join(process.cwd(), "src/app/globals.css"), "utf8");

function declaredTokens(namespace: "text" | "shadow") {
  const names = [...globalsCss.matchAll(new RegExp(`--${namespace}-([a-z0-9-]+):`, "g"))]
    .map((match) => match[1])
    // Skip sub-properties such as --text-label-sm--line-height
    .filter((name) => !name.includes("--"));
  return [...new Set(names)].sort();
}

describe("cn", () => {
  it("keeps a custom text size next to a text color", () => {
    expect(cn("text-label-sm text-primary")).toBe("text-label-sm text-primary");
  });

  it("resolves custom text sizes against built-in ones", () => {
    expect(cn("text-sm font-medium", "text-label-lg")).toBe("font-medium text-label-lg");
  });

  it("resolves custom shadows against built-in ones", () => {
    expect(cn("shadow-md", "shadow-float")).toBe("shadow-float");
  });

  it("registers every text size and shadow declared in globals.css", () => {
    expect(declaredTokens("text")).toEqual([...themeFontSizes].sort());
    expect(declaredTokens("shadow")).toEqual([...themeShadows].sort());
  });
});
