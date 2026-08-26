import Link from "next/link";
import { navLinks, services, siteConfig } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* À propos */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
              S
            </span>
            <span className="text-xl font-bold text-white">
              {siteConfig.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-6">{siteConfig.tagline}</p>
          <p className="mt-4 text-sm leading-6">
            {siteConfig.address}
            <br />
            {siteConfig.phone}
            <br />
            {siteConfig.email}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Navigation
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
            Nos services
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-slate-400 sm:px-6">
          © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
