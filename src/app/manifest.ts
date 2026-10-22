import type { MetadataRoute } from "next";

import { brandColors } from "@/config/brand-colors";
import { doctorFullName, doctorName, site } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: doctorFullName,
    short_name: doctorName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: brandColors.background,
    theme_color: brandColors.background,
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
