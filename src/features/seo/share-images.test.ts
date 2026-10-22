import { existsSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";

// A page's metadata replaces its parent's openGraph object, so a route
// without its own share image ends up with none. Every page needs both files.

const appDir = join(process.cwd(), "src/app");

function findPages(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return findPages(path);
    return entry.name === "page.tsx" ? [path] : [];
  });
}

describe("share images", () => {
  const routes = findPages(appDir).map((page) => relative(appDir, dirname(page)) || "/");

  it("finds the site's pages", () => {
    expect(routes).toEqual(expect.arrayContaining(["/", "about", "clinic", "specialties"]));
  });

  it.each(routes)("%s has an opengraph-image and a twitter-image", (route) => {
    const dir = route === "/" ? appDir : join(appDir, route);
    expect(existsSync(join(dir, "opengraph-image.tsx"))).toBe(true);
    expect(existsSync(join(dir, "twitter-image.tsx"))).toBe(true);
  });
});
