import { doctorFullName } from "@/config/site";
import { privacyPolicy } from "@/features/legal/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";

export const alt = `${privacyPolicy.title}: ${doctorFullName}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: "Patient information",
    title: privacyPolicy.title,
    description: "How the information you send through this website is collected, used and protected.",
  });
}
