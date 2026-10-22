import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

import { brandColors, withAlpha } from "@/config/brand-colors";
import { doctorName, site } from "@/config/site";
import { getSiteUrl } from "@/lib/site-url";

// Branded 1200×630 share card used by every route's opengraph-image and
// twitter-image. Rendered at build time; Satori needs WOFF/TTF fonts, so the
// Plus Jakarta Sans files live next to this module (OFL, see fonts/OFL.txt).

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

const fontDir = join(process.cwd(), "src/features/seo/fonts");
const [medium, semiBold, bold] = await Promise.all(
  ["500", "600", "700"].map((weight) =>
    readFile(join(fontDir, `plus-jakarta-sans-latin-${weight}-normal.woff`)),
  ),
);

const color = {
  background: brandColors.background,
  primary: brandColors.primary,
  foreground: brandColors.foreground,
  muted: brandColors.mutedForeground,
  border: brandColors.border,
};

type OgImageInput = {
  // Names the page being shared, in sentence case like the nav
  section: string;
  title: string;
  description: string;
};

export function renderOgImage({ section, title, description }: OgImageInput) {
  const host = getSiteUrl().host;
  const { location } = site;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px 52px",
          backgroundColor: color.background,
          backgroundImage:
            `radial-gradient(circle at 90% 8%, ${withAlpha(brandColors.primary, 0.2)}, transparent 45%), radial-gradient(circle at 0% 100%, ${withAlpha(brandColors.info, 0.12)}, transparent 40%)`,
          color: color.foreground,
          fontFamily: "Plus Jakarta Sans",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            backgroundImage: `linear-gradient(90deg, transparent, ${color.primary}, transparent)`,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <svg width="64" height="64" viewBox="0 0 32 32" fill="none">
              <rect
                x="0.75"
                y="0.75"
                width="30.5"
                height="30.5"
                rx="9"
                fill={withAlpha(brandColors.primary, 0.1)}
                stroke={withAlpha(brandColors.primary, 0.4)}
                strokeWidth="1.5"
              />
              <path
                d="M6 17h5l2.5-6 4 11 3-8 1.5 3H26"
                stroke={color.primary}
                strokeWidth="2.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 30, fontWeight: 700 }}>{doctorName}</span>
              <span style={{ fontSize: 19, fontWeight: 500, color: color.muted }}>
                {site.doctor.postNominals}, {site.doctor.jobTitle.toLowerCase()}
              </span>
            </div>
          </div>
          {site.availability.acceptingPatients && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 20px",
                borderRadius: 999,
                backgroundColor: withAlpha(brandColors.primary, 0.1),
                color: color.primary,
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              <div
                style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: color.primary }}
              />
              {site.availability.label}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: color.primary }}>{section}</span>
          <span
            style={{
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.45,
              color: color.muted,
              maxWidth: 940,
            }}
          >
            {description}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: `1px solid ${color.border}`,
            paddingTop: 26,
            fontSize: 21,
            fontWeight: 500,
            color: color.muted,
          }}
        >
          <span>
            {location.name}, {location.locality}, {location.region}
          </span>
          {!host.startsWith("localhost") && (
            <span style={{ color: color.foreground, fontWeight: 600 }}>{host}</span>
          )}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Plus Jakarta Sans", data: medium, weight: 500, style: "normal" },
        { name: "Plus Jakarta Sans", data: semiBold, weight: 600, style: "normal" },
        { name: "Plus Jakarta Sans", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
