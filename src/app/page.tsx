import { Container } from "@/components/container";
import { doctorName, site } from "@/config/site";
import { ClinicalFocus } from "@/features/home/components/clinical-focus";
import { ConsultBanner } from "@/features/home/components/consult-banner";
import { FeaturedTestimonial } from "@/features/home/components/featured-testimonial";
import { HomeHero } from "@/features/home/components/home-hero";
import { ImpactMetrics } from "@/features/home/components/impact-metrics";
import { featuredTestimonial } from "@/features/home/content";
import { pageMetadata } from "@/features/seo/metadata";

export const metadata = pageMetadata({
  title: `${site.searchTitle} | ${doctorName}`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <Container className="flex flex-col pb-10">
      <HomeHero />
      <ImpactMetrics />
      <ClinicalFocus />
      <FeaturedTestimonial testimonial={featuredTestimonial} />
      <div className="pt-6">
        <ConsultBanner />
      </div>
    </Container>
  );
}
