import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}if(t==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="relative flex min-h-full flex-col bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        {/* Anti-FOUC : applique le thème avant le premier rendu */}
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <JsonLd data={[organizationLd, websiteLd]} />
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            className="orb absolute -left-20 top-0 h-[28rem] w-[28rem] bg-blue-500/20 dark:bg-blue-500/30"
            style={{ animation: "float 16s ease-in-out infinite" }}
          />
          <div
            className="orb-rev absolute -right-20 top-24 h-[24rem] w-[24rem] bg-violet-500/15 dark:bg-violet-500/25"
            style={{ animation: "float-rev 20s ease-in-out infinite" }}
          />
          <div
            className="orb absolute bottom-0 left-1/3 h-[22rem] w-[22rem] bg-cyan-500/15 dark:bg-cyan-500/20"
            style={{ animation: "float 22s ease-in-out infinite" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-white dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950" />
        </div>

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