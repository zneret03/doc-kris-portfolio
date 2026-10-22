import { ImageResponse } from "next/og";

import { brandColors, withAlpha } from "@/config/brand-colors";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Full-bleed square: iOS rounds the corners itself
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: brandColors.background,
          backgroundImage: `radial-gradient(circle at 50% 40%, ${withAlpha(brandColors.primary, 0.22)}, transparent 70%)`,
        }}
      >
        <svg width="132" height="132" viewBox="0 0 32 32" fill="none">
          <path
            d="M6 17h5l2.5-6 4 11 3-8 1.5 3H26"
            stroke={brandColors.primary}
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
