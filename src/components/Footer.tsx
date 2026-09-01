import Link from "next/link";
import Image from "next/image";
import { media, navLinks, offers, siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* Marque + contact */}
        <div>
          <div className="flex items-center gap-2">
            <Image
              src={media.logo}
              alt={`Logo ${siteConfig.company}`}
              width={40}
              height={40}
              className="h-10 w-auto"
            />
            <span className="text-xl font-bold text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-white/80">
            {siteConfig.subtitle}
          </p>
          <address className="mt-4 space-y-1 text-sm not-italic leading-6">
            <p>{siteConfig.address}</p>
            <p>
              <a href={`tel:${siteConfig.phone1.replace(/\s/g, "")}`} className="hover:text-cyan-300">
                {siteConfig.phone1}
              </a>{" "}
              ·{" "}
              <a href={`tel:${siteConfig.phone2.replace(/\s/g, "")}`} className="hover:text-cyan-300">
                {siteConfig.phone2}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-cyan-300">
                {siteConfig.email}
              </a>
            </p>
          </address>
        </div>

        {/* Navigation */}
        <nav aria-label="Pied de page">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-cyan-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Nos offres */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Nos offres
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {offers.map((offer) => (
              <li key={offer.slug}>
                <Link
                  href={`/offres/${offer.slug}`}
                  className="hover:text-cyan-300"
                >
                  Offre {offer.title} — {offer.need}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-400">
            Site groupe :{" "}
            <a
              href={siteConfig.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-600 underline-offset-2 hover:text-cyan-300"
            >
              {siteConfig.website}
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-slate-400 sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.company}. Tous droits
            réservés.
          </p>
          <nav aria-label="Pages légales" className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/faq" className="hover:text-cyan-300">
              FAQ
            </Link>
            <span aria-hidden>·</span>
            <Link href="/mentions-legales" className="hover:text-cyan-300">
              Mentions légales
            </Link>
            <span aria-hidden>·</span>
            <Link href="/politique-de-confidentialite" className="hover:text-cyan-300">
              Politique de confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
