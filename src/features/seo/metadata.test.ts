import { pageMetadata } from "@/features/seo/metadata";

describe("pageMetadata", () => {
  it("sets the canonical URL and restates the shared Open Graph fields", () => {
    const metadata = pageMetadata({
      title: "About & Credentials",
      description: "Credentials and career.",
      path: "/about",
    });

    expect(metadata.title).toBe("About & Credentials");
    expect(metadata.alternates).toEqual({ canonical: "/about" });
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        type: "website",
        siteName: "Dr. Julian Vance, MD, FACS",
        locale: "en_US",
        url: "/about",
        title: "About & Credentials",
      }),
    );
    expect(metadata.twitter).toEqual(expect.objectContaining({ card: "summary_large_image" }));
  });

  it("leaves images to the route's opengraph-image file", () => {
    const metadata = pageMetadata({ title: "Clinic", description: "Book.", path: "/clinic" });

    expect(metadata.openGraph).not.toHaveProperty("images");
    expect(metadata.twitter).not.toHaveProperty("images");
  });

  it("can skip the title template and extend Open Graph", () => {
    const metadata = pageMetadata({
      title: "Dr. Julian Vance, MD, FACS",
      absoluteTitle: true,
      description: "Home.",
      path: "/",
      openGraph: { type: "profile", firstName: "Julian", lastName: "Vance" },
    });

    expect(metadata.title).toEqual({ absolute: "Dr. Julian Vance, MD, FACS" });
    expect(metadata.openGraph).toEqual(expect.objectContaining({ type: "profile", firstName: "Julian" }));
  });
});
