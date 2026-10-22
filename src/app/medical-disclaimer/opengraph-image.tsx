import { doctorFullName } from "@/config/site";
import { medicalDisclaimer } from "@/features/legal/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";

export const alt = `${medicalDisclaimer.title}: ${doctorFullName}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: "Patient information",
    title: medicalDisclaimer.title,
    description: "General information, not medical advice. What to do in an emergency.",
  });
}
