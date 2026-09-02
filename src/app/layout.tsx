import type { Metadata, Viewport } from "next";
// Police du site : Times New Roman (police système). Aucun téléchargement réseau
// requis — pas de web-font, pas d'impact perf, conforme RGPD.
// (Précédemment : import { Geist } from "next/font/google" + variable --font-geist-sans.
// Retiré pour aligner la typo sur l'identité visuelle choisie.)
// CSS officiel Lenis : règle `html.lenis { height: auto }` indispensable
// (sinon le scroll de la page reste plafonné au viewport avec un html en height:100%).
import "lenis/dist/lenis.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { siteConfig } from "@/data/site";
import "./globals.css";

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.company,
  url: siteConfig.websiteUrl,
  logo: `${siteConfig.websiteUrl}/Ressource_site_sisbm_core/logo.png`,
  email: siteConfig.email,
  telephone: siteConfig.phone1,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abidjan",
    addressCountry: "CI",
  },
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.websiteUrl,
  inLanguage: "fr-FR",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.websiteUrl),
  title: {
    default: `${siteConfig.name} - ${siteConfig.subtitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.subtitle}`,
    description: siteConfig.description,
    url: siteConfig.websiteUrl,
    siteName: siteConfig.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.subtitle}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#092c4d" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className="h-full scroll-smooth antialiased"
      suppressHydrationWarning
    >
      <body
        className="relative flex min-h-full flex-col bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100"
        suppressHydrationWarning
      >
        {/* Anti-FOUC : applique le thème avant le premier rendu */}
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <JsonLd data={[organizationLd, websiteLd]} />

        <noscript>
          <style>{`.opacity-0 { opacity: 1 !important; } .translate-y-8, .translate-x-8, .-translate-x-8 { transform: none !important; }`}</style>
        </noscript>
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollProgress />
      </body>
    </html>
  );
}