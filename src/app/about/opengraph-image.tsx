import { doctorFullName } from "@/config/site";
import { aboutIntro } from "@/features/about/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";

export const alt = `About ${doctorFullName}: credentials, career and hospital privileges`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: "About & credentials",
    title: aboutIntro.title,
    description: aboutIntro.subtitle,
  });
}
