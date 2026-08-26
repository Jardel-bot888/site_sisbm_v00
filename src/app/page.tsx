import Image from "next/image";
import Link from "next/link";
import OfferCard from "@/components/OfferCard";
import Reveal from "@/components/Reveal";
import { media, offers, reasons, siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={media.hero}
          alt="Flotte de véhicules équipés du tracking SISBM CORE"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-900/40"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
              {siteConfig.name} · {siteConfig.subtitle}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {siteConfig.heroTitle}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {siteConfig.slogan}
            </p>
          </Reveal>

          {/* Badges offres */}
          <Reveal delay={150}>
            <div className="mt-8 flex flex-wrap gap-3" aria-label="Trois niveaux d'offre">
              {offers.map((offer) => (
                <Link
                  key={offer.slug}
                  href={`/offres/${offer.slug}`}
                  className={`rounded-full bg-gradient-to-r ${offer.theme.gradient} px-5 py-2 text-sm font-bold tracking-widest shadow-lg transition-transform hover:scale-105`}
                >
                  {offer.title}
                </Link>
              ))}
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/offres"
                className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Voir les 3 offres
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Demander un devis
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ LES 3 OFFRES ============ */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
            Présentation des offres
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-600">
            Du suivi essentiel à l&apos;intégration SI : choisissez le niveau de
            pilotage adapté à votre flotte.
          </p>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {offers.map((offer, index) => (
            <OfferCard key={offer.slug} offer={offer} delay={index * 120} />
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-8 text-center text-sm italic text-slate-500">
            STANDARD pour démarrer · GOLD pour automatiser · PREMIUM pour
            intégrer la flotte à l&apos;écosystème métier.
          </p>
        </Reveal>
      </section>

      {/* ============ POURQUOI SISBM CORE ============ */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
              Pourquoi {siteConfig.product} ?
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 100}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
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

          {/* Visuels matériel + application */}
          <div className="mt-14 grid items-center gap-8 lg:grid-cols-2">
            <Reveal direction="left">
              <figure>
                <Image
                  src={media.trackerDevice}
                  alt="Matériel installé : balise GPS et relais de coupure moteur"
                  width={720}
                  height={480}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="rounded-2xl object-cover shadow-md"
                />
                <figcaption className="mt-3 text-center text-xs text-slate-500">
                  Balise GPS et relais de coupure moteur, installés par nos
                  techniciens.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal direction="right" delay={120}>
              <figure>
                <Image
                  src={media.mobileApp}
                  alt="Suivi de la flotte depuis l'application mobile"
                  width={720}
                  height={480}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="rounded-2xl object-cover shadow-md"
                />
                <figcaption className="mt-3 text-center text-xs text-slate-500">
                  Votre flotte dans la poche : suivi en temps réel depuis votre
                  mobile.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
        <Image
          src={media.geolocation}
          alt=""
          fill
          aria-hidden
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight">
              Prêt à prendre le contrôle de votre flotte ?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300">
              Nos équipes vous conseillent pour identifier l&apos;offre adaptée
              à vos véhicules et à votre organisation.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Demander un devis gratuit
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
