import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/site-url";

const legalPages = ["/privacy", "/medical-disclaimer"];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...site.nav.map((item) => item.href), ...legalPages].map((path) => ({
    url: absoluteUrl(path),
  }));
}
