// ============================================================
// robots.txt généré — https://www.sisbm-ci.com/robots.txt
// ============================================================

import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.websiteUrl}/sitemap.xml`,
  };
}