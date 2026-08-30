import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { media, offers, reasons, siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "A propos",
  description: `${siteConfig.company} et sa solution ${siteConfig.product} de gestion et supervision de flotte à Abidjan, Côte d'Ivoire.`,
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="À propos"
        subtitle={`${siteConfig.company} - ${siteConfig.product} - ${siteConfig.subtitle}`}
      />

      {/* Presentation */}
      <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                La solution tracking de {siteConfig.company}
              </h2>
              <p className="mt-6 leading-7 text-slate-600 dark:text-slate-300">
                {siteConfig.description}
              </p>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                Basées à {siteConfig.address}, nos équipes assurent
                l&apos;installation du matériel (balise GPS 4G, relais de
                coupure moteur), la mise en service de la plateforme et
                l&apos;accompagnement de vos gestionnaires au quotidien.
              </p>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                Avec trois niveaux d&apos;offre —
                <Link
                  href="/offres/standard"
                  className={`font-semibold ${offers[0].theme.accentText}`}
                >
                  STANDARD
                </Link>
                ,
                <Link
                  href="/offres/gold"
                  className={`font-semibold ${offers[1].theme.accentText}`}
                >
                  GOLD
                </Link>
                et
                <Link
                  href="/offres/premium"
                  className={`font-semibold ${offers[2].theme.accentText}`}
                >
                  PREMIUM
                </Link>
                — {siteConfig.product} couvre tous les besoins : du simple suivi
                essentiel jusqu&apos;à l&apos;intégration complète au système
                d&apos;information.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-cyan-500/20 blur-2xl" />
              <Image
                src={media.geolocation}
                alt="Supervision géolocalisée d'une flotte de véhicules"
                width={720}
                height={480}
                loading="lazy"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="relative rounded-2xl object-cover shadow-2xl ring-1 ring-slate-200 dark:ring-white/10"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="relative overflow-hidden py-16">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="orb absolute -left-32 top-1/2 h-64 w-64 bg-blue-500/20" style={{ animation: "float 18s ease-in-out infinite" }} />
          <div className="orb-rev absolute -right-32 top-1/2 h-56 w-56 bg-violet-500/20" style={{ animation: "float-rev 22s ease-in-out infinite" }} />
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Nos engagements
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 100}>
                <div className="glass-light group h-full rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:shadow-lg hover:shadow-blue-500/20">
                  <reason.icon
                    aria-hidden
                    className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  />
                  <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {reason.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lien vers le site groupe */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Découvrir l&apos;ensemble des activités {siteConfig.company}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400">
            Ce site est dédié à la solution {siteConfig.product}. Retrouvez
            l&apos;ensemble de nos métiers sur notre site principal.
          </p>
          <a
            href={siteConfig.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/40"
          >
            Visiter {siteConfig.website}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9-9"/><path d="M7 7h10v10"/></svg>
          </a>
        </Reveal>
      </section>
    </>
  );
}