import type { Metadata } from "next";

import { doctorFullName, site } from "@/config/site";

type PageMetadataInput = {
  /** Page title; the root layout's template appends the practice name */
  title: string;
  /** Use the title as-is, without the template (the home page) */
  absoluteTitle?: boolean;
  description: string;
  /** Route path, used for the canonical URL and og:url */
  path: string;
  openGraph?: Metadata["openGraph"];
};

// Child segments replace the parent's openGraph object instead of merging
// it, so every page restates the shared fields here. Images come from the
// route's own opengraph-image / twitter-image files: setting `images` here
// would override them, and leaving the files out leaves the page without a
// share card (share-images.test.ts checks every page has both).
export function pageMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  openGraph,
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: doctorFullName,
      locale: site.locale,
      url: path,
      title,
      description,
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
