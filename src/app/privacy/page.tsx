import { Container } from "@/components/container";
import { doctorFullName } from "@/config/site";
import { LegalDocumentView } from "@/features/legal/components/legal-document-view";
import { privacyPolicy } from "@/features/legal/content";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: privacyPolicy.title,
  description: `How ${doctorFullName} collects, uses and protects the information you send through this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container>
      <LegalDocumentView document={privacyPolicy} />
    </Container>
  );
}
