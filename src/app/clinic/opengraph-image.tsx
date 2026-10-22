import { doctorFullName, site } from "@/config/site";
import { clinicHeader } from "@/features/clinic/content";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/features/seo/og-image";

export const alt = `${clinicHeader.title}: book a consultation with ${doctorFullName}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default function Image() {
  return renderOgImage({
    section: "Clinic & booking",
    title: clinicHeader.title,
    description: `Request an in-person or video consultation at ${site.location.name}, ${site.location.locality}.`,
  });
}
