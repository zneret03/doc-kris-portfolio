import { Container } from "@/components/container";
import { LegalDocumentView } from "@/features/legal/components/legal-document-view";
import { medicalDisclaimer } from "@/features/legal/content";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: medicalDisclaimer.title,
  description:
    "The information on this website is general and not medical advice. What to do in an emergency, and how to read outcomes and patient stories.",
  path: "/medical-disclaimer",
});

export default function MedicalDisclaimerPage() {
  return (
    <Container>
      <LegalDocumentView document={medicalDisclaimer} />
    </Container>
  );
}
