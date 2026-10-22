import { doctorFullName, site } from "@/config/site";
import { hero } from "@/features/home/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";

export const alt = `${doctorFullName}, ${site.doctor.jobTitle}: ${hero.title} ${hero.titleContinued}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: site.doctor.specialty,
    title: `${hero.title} ${hero.titleContinued}`,
    description:
      "Minimally invasive valve repair, arterial bypass and aortic reconstruction, with patient-first recovery.",
  });
}
