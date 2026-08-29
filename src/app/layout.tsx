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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-slate-950 text-slate-100">
        <JsonLd data={[organizationLd, websiteLd]} />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="orb absolute -left-20 top-0 h-[28rem] w-[28rem] bg-blue-500/30"
            style={{ animation: "float 16s ease-in-out infinite" }}
          />
          <div
            className="orb-rev absolute -right-20 top-24 h-[24rem] w-[24rem] bg-violet-500/25"
            style={{ animation: "float-rev 20s ease-in-out infinite" }}
          />
          <div
            className="orb absolute bottom-0 left-1/3 h-[22rem] w-[22rem] bg-cyan-500/20"
            style={{ animation: "float 22s ease-in-out infinite" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
        </div>
        <noscript>
          <style>{`.opacity-0 { opacity: 1 !important; } .translate-y-8, .translate-x-8, .-translate-x-8 { transform: none !important; }`}</style>
        </noscript>
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}