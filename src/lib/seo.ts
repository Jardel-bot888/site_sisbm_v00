// ============================================================
// SEO — helper centralisé pour les métadonnées Next.js
// Garantit que chaque page fournit un OG complet (le merge Next
// étant superficiel, un openGraph partiel écraserait celui du layout).
// ============================================================

import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type SeoInput = {
  title: string;
  description: string;
  /** Chemin de la page ("/", "/offres", ...) — sert au canonical et og:url */
  path: string;
  /** true quand le titre fourni est déjà complet (ne pas appliquer le template du layout) */
  absoluteTitle?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: SeoInput): Metadata {
  const url = `${siteConfig.websiteUrl}${path === "/" ? "" : path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Titre complet par défaut de l'accueil (identique au layout) */
export const homeTitle = `${siteConfig.name} — ${siteConfig.subtitle}`;