import type { Metadata } from "next";
import Link from "next/link";
import ComparisonTable from "@/components/ComparisonTable";
import OfferCard from "@/components/OfferCard";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { offers, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Nos offres",
  description:
    "Découvrez les trois offres de tracking SISBM CORE : STANDARD (tracking essentiel), GOLD (supervision automatisée) et PREMIUM (intégration au SI).",
};

export default function OffersPage() {
  return (
    <>
      <PageHeader
        title={`Nos offres ${siteConfig.product}`}
        subtitle="Présentation des offres — du suivi essentiel à l'intégration SI."
      />

      {/* Cartes des 3 offres */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {offers.map((offer, index) => (
            <OfferCard key={offer.slug} offer={offer} delay={index * 120} />
          ))}
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
              Quelle offre correspond à votre niveau de pilotage ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-600">
              Comparez en un coup d&apos;œil les fonctionnalités des offres
              STANDARD, GOLD et PREMIUM.
            </p>
          </Reveal>
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Besoin d&apos;aide pour choisir ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Décrivez-nous votre flotte et vos besoins : nous vous orientons vers
            le niveau d&apos;offre le plus pertinent et vous adressons un devis
            personnalisé.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Demander un devis
          </Link>
        </Reveal>
      </section>
    </>
  );
}
