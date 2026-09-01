"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, media, siteConfig } from "@/data/site";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-blue-900/95 shadow-lg shadow-blue-950/30 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={media.logo}
            alt={`Logo ${siteConfig.company}`}
            width={40}
            height={40}
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            {siteConfig.name}
          </span>
        </Link>

        {/* Sous-titre produit */}
        <span className="hidden items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blue-200 xl:flex">
          <span>{siteConfig.subtitle}</span>
          <span aria-hidden>·</span>
        </span>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-mint after:transition-transform after:duration-200 ${
                    isActive
                      ? "text-cyan-300 after:scale-x-100"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/contact"
              className="rounded-lg bg-cta px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cta/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cta-light hover:shadow-lg hover:shadow-cta/50"
            >
              Demander un devis
            </Link>
          </li>
        </ul>

        {/* Bouton thème + menu mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15 md:hidden"
          aria-label="Ouvrir le menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {menuOpen && (
        <ul className="space-y-1 border-t border-white/15 bg-blue-900/95 px-4 py-3 md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-cyan-300"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          {/* CTA devis : uniquement mobile */}
          <li className="pt-2">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg bg-cta px-4 py-2.5 text-center text-sm font-semibold text-white shadow-md shadow-cta/40 transition-all duration-300 hover:bg-cta-light"
            >
              Demander un devis
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
