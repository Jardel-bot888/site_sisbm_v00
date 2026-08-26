import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { media, offers, reasons, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `${siteConfig.company} et sa solution ${siteConfig.product} de gestion et supervision de flotte à Abidjan, Côte d'Ivoire.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="À propos"
        subtitle={`${siteConfig.company} · ${siteConfig.product} — ${siteConfig.subtitle}`}
      />

      {/* Présentation */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                La solution tracking de {siteConfig.company}
              </h2>
              <p className="mt-6 leading-7 text-slate-700">
                {siteConfig.description}
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Basées à {siteConfig.address}, nos équipes assurent
                l&apos;installation du matériel (balise GPS 4G, relais de
                coupure moteur), la mise en service de la plateforme et
                l&apos;accompagnement de vos gestionnaires au quotidien.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Avec trois niveaux d&apos;offre —{" "}
                <Link
                  href="/offres/standard"
                  className={`font-semibold ${offers[0].theme.accentText}`}
                >
                  STANDARD
                </Link>
                ,{" "}
                <Link
                  href="/offres/gold"
                  className={`font-semibold ${offers[1].theme.accentText}`}
                >
                  GOLD
                </Link>{" "}
                et{" "}
                <Link
                  href="/offres/premium"
                  className={`font-semibold ${offers[2].theme.accentText}`}
                >
                  PREMIUM
                </Link>{" "}
                — {siteConfig.product} couvre tous les besoins : du simple suivi
                essentiel jusqu&apos;à l&apos;intégration complète au système
                d&apos;information.
              </p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={120}>
            <Image
              src={media.geolocation}
              alt="Supervision géolocalisée d'une flotte de véhicules"
              width={720}
              height={480}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="rounded-2xl object-cover shadow-md"
            />
          </Reveal>
        </div>
      </section>

      {/* Nos engagements */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
              Nos engagements
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 100}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <span className="text-3xl" aria-hidden>
                    {reason.icon}
                  </span>
                  <h3 className="mt-4 font-semibold text-slate-900">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
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
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Découvrir l&apos;ensemble des activités {siteConfig.company}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
            Ce site est dédié à la solution {siteConfig.product}. Retrouvez
            l&apos;ensemble de nos métiers sur notre site principal.
          </p>
          <a
            href={siteConfig.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-lg bg-blue-700 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-600"
          >
            Visiter {siteConfig.website}
          </a>
        </Reveal>
      </section>
    </>
  );
}
