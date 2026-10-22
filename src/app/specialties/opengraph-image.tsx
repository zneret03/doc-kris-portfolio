import { doctorFullName } from "@/config/site";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";
import { specialtiesHeader } from "@/features/specialties/content";

export const alt = `${specialtiesHeader.title}: ${doctorFullName}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: "Specialties & services",
    title: specialtiesHeader.title,
    description:
      "Minimally invasive valve repair, arterial bypass, aortic reconstruction and preventative heart health.",
  });
}
