import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { getOffer, offers, siteConfig, type Offer } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return offers.map((offer) => ({ slug: offer.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOffer(slug);
  if (!offer) return {};
  return buildMetadata({
    title: `Offre ${offer.title}`,
    description: `${offer.tagline} ${siteConfig.product} — ${offer.need}.`,
    path: `/offres/${offer.slug}`,
  });
}

function FeatureList({ offer }: { offer: Offer }) {
  return (
    <ul className="space-y-2.5">
      {offer.features.map((feature) => (
        <li
          key={feature.label}
          className="flex items-start gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3"
        >
          <span
            aria-hidden
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
              feature.included
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {feature.included ? "✓" : "—"}
          </span>
          <span
            className={`text-sm ${feature.included ? "text-slate-800" : "text-slate-400 line-through"}`}
          >
            {feature.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default async function OfferDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const offer = getOffer(slug);

  if (!offer) notFound();

  const others = offers.filter((o) => o.slug !== offer.slug);

  // Données structurées — Service (pas de tarification publique)
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${siteConfig.product} — Offre ${offer.title}`,
    description: offer.description,
    provider: {
      "@type": "Organization",
      name: siteConfig.company,
      url: siteConfig.websiteUrl,
    },
    areaServed: {
      "@type": "Country",
      name: "Côte d'Ivoire",
    },
    url: `${siteConfig.websiteUrl}/offres/${offer.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      {/* En-tête coloré de l'offre */}
      <section
        className={`bg-gradient-to-r ${offer.theme.gradient} py-16 text-white sm:py-20`}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Offre · {offer.need}
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
              OFFRE {offer.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">
              {offer.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-3">
          {/* Colonne principale */}
          <div className="space-y-12 lg:col-span-2">
            <Reveal>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  À qui s&apos;adresse cette offre ?
                </h2>
                <p className="mt-4 leading-7 text-slate-700">
                  {offer.description}
                </p>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <FeatureList offer={offer} />
            </Reveal>

            {/* Résumé en 4 axes (comme la plaquette) */}
            <Reveal delay={150}>
              <dl className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Automatisation", offer.automation],
                  ["Pilotage", offer.pilotage],
                  ["Intégration métier", offer.integration],
                  ["Assistance & support", offer.support],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {label}
                    </dt>
                    <dd
                      className={`mt-1.5 font-semibold ${offer.theme.accentText}`}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Barre latérale */}
          <aside className="space-y-6">
            <Reveal direction="left" delay={200}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h2 className="font-bold text-slate-900">Points clés</h2>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {offer.keyPoints.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <span aria-hidden className={offer.theme.accentText}>
                        ▸
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left" delay={280}>
              <div
                className={`rounded-xl bg-gradient-to-br ${offer.theme.gradient} p-6 text-white shadow-lg`}
              >
                <h2 className="font-bold">
                  Intéressé par l&apos;offre {offer.title} ?
                </h2>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  Contactez-nous pour une étude personnalisée de votre flotte et
                  l&apos;établissement de votre devis.
                </p>
                <Link
                  href="/contact"
                  className="mt-4 block rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Demander un devis
                </Link>
              </div>
            </Reveal>

            {/* Autres offres */}
            <Reveal direction="left" delay={360}>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-100">
                <h2 className="font-bold text-slate-900">Autres offres</h2>
                <ul className="mt-4 space-y-3">
                  {others.map((other) => (
                    <li key={other.slug}>
                      <Link
                        href={`/offres/${other.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-lg border border-slate-100 px-4 py-3 transition-colors hover:border-slate-300"
                      >
                        <span>
                          <span
                            className={`block text-sm font-bold tracking-wide ${other.theme.accentText}`}
                          >
                            {other.title}
                          </span>
                          <span className="block text-xs text-slate-500">
                            {other.need}
                          </span>
                        </span>
                        <span
                          aria-hidden
                          className="text-slate-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-slate-600"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
