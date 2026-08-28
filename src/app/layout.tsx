import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/data/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Données structurées globales — Organization + WebSite
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
    default: `${siteConfig.name} — ${siteConfig.subtitle}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.subtitle}`,
    description: siteConfig.description,
    url: siteConfig.websiteUrl,
    siteName: siteConfig.name,
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.subtitle}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-slate-900">
        {/* Données structurées globales (schema.org) */}
        <JsonLd data={[organizationLd, websiteLd]} />
        {/* Sans JavaScript : le contenu reste toujours visible */}
        <noscript>
          <style>{`.opacity-0 { opacity: 1 !important; } .translate-y-8, .translate-x-8, .-translate-x-8 { transform: none !important; }`}</style>
        </noscript>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
