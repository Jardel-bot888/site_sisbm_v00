// ============================================================
// sitemap.xml généré — https://www.sisbm-ci.com/sitemap.xml
// ============================================================

import type { MetadataRoute } from "next";
import { offers, siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.websiteUrl;
  const lastModified = new Date();

  return [
    {
      url: `${base}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/offres`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...offers.map((offer) => ({
      url: `${base}/offres/${offer.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${base}/a-propos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}