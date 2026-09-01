// ============================================================
// Image Open Graph générée statiquement au build (1200x630)
// Sert de og:image et, à défaut de twitter-image, de twitter:image.
// ============================================================

import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — ${siteConfig.subtitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(
  join(process.cwd(), "public", "Ressource_site_sisbm_core", "logo.png"),
  "base64"
);
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#092c4d",
          padding: "72px 84px",
          position: "relative",
        }}
      >
        {/* Bandeau accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 12,
            backgroundColor: "#0d3f6b",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* Satori exige display:flex sur les parents d'éléments multiples */}
          <div style={{ display: "flex", width: 120, height: 120 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} alt="" width={120} height={120} />
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -2,
            }}
          >
            {siteConfig.name}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 40,
            color: "#4bb8e8",
            marginTop: 24,
            fontWeight: 600,
          }}
        >
          {siteConfig.subtitle}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#cbd5e1",
            marginTop: 28,
            lineHeight: 1.4,
          }}
        >
          Suivi, sécurisation et pilotage de vos véhicules en temps réel.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#64748b",
            marginTop: 36,
          }}
        >
          {siteConfig.websiteUrl.replace(/^https?:\/\//, "")}
        </div>
      </div>
    ),
    { ...size }
  );
}