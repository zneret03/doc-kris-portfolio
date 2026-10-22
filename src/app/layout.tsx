import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import { AmbientGlow } from "@/components/ambient-glow";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";
import { brandColors } from "@/config/brand-colors";
import { doctorFullName, site } from "@/config/site";
import { JsonLd } from "@/features/seo/components/json-ld";
import { physicianJsonLd, websiteJsonLd } from "@/features/seo/structured-data";
import { getSiteUrl, isIndexable } from "@/lib/site-url";
import { cn } from "@/lib/utils";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: `${doctorFullName} | Cardiothoracic Surgeon in ${site.location.locality}`,
    template: `%s | ${doctorFullName}`,
  },
  description: site.description,
  applicationName: doctorFullName,
  authors: [{ name: doctorFullName }],
  creator: doctorFullName,
  category: "health",
  robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    type: "website",
    siteName: doctorFullName,
    locale: site.locale,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: brandColors.background,
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("dark h-full antialiased", plusJakartaSans.variable)}>
      <body className="flex min-h-full flex-col">
        <AmbientGlow />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 pt-20 outline-none sm:pt-24">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={[physicianJsonLd(), websiteJsonLd()]} />
      </body>
    </html>
  );
}
