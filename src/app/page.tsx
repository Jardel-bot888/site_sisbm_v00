import Image from "next/image";
import Link from "next/link";
import { BarChart3, Satellite, Wrench } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import GsapImageParallax from "@/components/GsapImageParallax";
import HeroParallax from "@/components/HeroParallax";
import OfferCard from "@/components/OfferCard";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { heroStats, media, offers, platformFeatures, reasons, siteConfig, testimonials } from "@/data/site";
import { buildMetadata, homeTitle } from "@/lib/seo";

export const metadata = buildMetadata({
  title: homeTitle,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

const blindSpots = [
  {
    title: "Véhicules mal utilisés",
    issues: ["Utilisations non autorisées", "Trajets personnels", "Heures supplémentaires injustifiées"],
    costLabel: "Kilomètres inutiles",
    costText: "et dépenses évitables",
    image: "/Ressource_site_sisbm_core/couts_caches/vehicules-mal-utilises.jpg",
    imageAlt: "Tracteur chargé d'objets personnels dans la cour d'une ferme",
  },
  {
    title: "Carburant perdu",
    issues: ["Consommations anormales", "Vols et siphonnages", "Écarts théoriques"],
    costLabel: "Jusqu'à 30%",
    costText: "de carburant perdu",
    image: "/Ressource_site_sisbm_core/couts_caches/carburant-perdu.jpg",
    imageAlt: "Ravitaillement nocturne du réservoir d'un camion au dépôt",
  },
  {
    title: "Décisions coûteuses",
    issues: ["Informations incomplètes", "Décisions prises trop tard", "Mauvaise allocation des ressources"],
    costLabel: "Décisions tardives",
    costText: "augmentent vos coûts d'exploitation",
    image: "/Ressource_site_sisbm_core/couts_caches/decisions-couteuses.jpg",
    imageAlt: "Bureau de gestion désordonné, informations éparpillées sur le bureau",
  },
  {
    title: "Équipes incontrôlées",
    issues: ["Feuilles de route non respectées", "Activités non tracées", "Coordination difficile"],
    costLabel: "Productivité en baisse",
    costText: "sur l'ensemble des opérations terrain",
    image: "/Ressource_site_sisbm_core/couts_caches/equipes-incontrolees.jpg",
    imageAlt: "Équipe de chantier dispersée et désorganisée sur un grand travaux public",
  },
  {
    title: "Vols et insécurité",
    issues: ["Véhicules volés ou détournés", "Cargaisons exposées", "Interventions retardées"],
    costLabel: "Pertes directes",
    costText: "et image de marque dégradée",
    image: "/Ressource_site_sisbm_core/couts_caches/vols-insecurite.jpg",
        imageAlt: "Clôture de dépôt industriel forcée pendant la nuit",
  },
];

const solutionBlocks = [
  {
    title: "Optimisation carburant",
    image: "/Ressource_site_sisbm_core/solutions/carburant.jpg",
    imageAlt: "Interface SISBM CORE détectant les anomalies de carburant en temps réel",
    problems: [
      "Consommations anormales",
      "Vols et siphonnages",
      "Écarts entre consommation théorique et réelle",
    ],
    results: [
      "Détection immédiate des anomalies de carburant",
      "Réduction des pertes de carburant",
      "Historique complet des consommations",
    ],
  },
  {
    title: "Pilotage flotte",
    image: "/Ressource_site_sisbm_core/solutions/flotte.jpg",
    imageAlt: "Tableau de bord SISBM CORE avec localisation en temps réel des véhicules",
    problems: [
      "Manque de visibilité sur les véhicules",
      "Utilisations non autorisées",
      "Trajets et horaires non maîtrisés",
    ],
    results: [
      "Véhicules utilisés uniquement pendant les heures autorisées",
      "Contrôle des itinéraires et des arrêts",
      "Réduction des usages non autorisés",
    ],
  },
  {
    title: "Sécurité & responsabilité",
    image: "/Ressource_site_sisbm_core/solutions/securite.jpg",
    imageAlt: "Caméra de surveillance embarquée Film SISBM CORE",
    problems: [
      "Incidents et litiges non prouvés",
      "Comportements à risque",
      "Manque de preuves vidéo",
    ],
    results: [
      "Preuve vidéo des incidents",
      "Réduction des contestations",
      "Contrôle des comportements à risque",
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Scroll soyeux Lenis (page d'accueil uniquement — pages internes plus légères) */}
      <SmoothScroll />
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <HeroParallax
          src={media.hero}
          alt="Flotte de véhicules équipés du tracking SISBM CORE"
          className="object-cover opacity-90"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-slate-950/60"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan dark:text-cyan-300">
              {siteConfig.name} · {siteConfig.subtitle}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
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
                  className={`rounded-full ${offer.theme.solid} px-5 py-2 text-sm font-bold tracking-widest shadow-lg transition-transform hover:scale-105`}
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
                className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl hover:shadow-black/30"
              >
                Voir les 3 offres
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5-5 5M6 12h12"
                  />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-lg border-2 border-white/70 px-6 py-[10px] text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-blue-400/30"
              >
                Demander un devis
              </Link>
            </div>
          </Reveal>
{/* Lien d'ancrage vers la première section */}
          <Reveal delay={420}>
            <a
              href="#decouvrir"
              className="group mt-12 inline-flex items-center gap-2 text-sm font-medium text-blue-200/80 transition-colors hover:text-white"
            >
              Découvrir la plateforme
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </a>
          </Reveal>
        </div>
      </section>


{/* ============ CHIFFRES CLÉS ============ */}
      <section
        aria-label="Chiffres clés"
        className="relative border-b border-slate-200 bg-slate-50 py-12 dark:border-white/10 dark:bg-white/5 sm:py-14"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {heroStats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div className="text-center">
                  <p className="text-4xl font-extrabold tracking-tight text-cyan sm:text-5xl">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COUTS CACHES / AVEUGLEMENT OPERATIONNEL ============ */}
      <section id="decouvrir" className="relative scroll-mt-24 border-y border-slate-200 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-red-600 dark:text-red-400">
              Les pertes cachées
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              L&apos;aveuglement opérationnel a un coût direct sur votre rentabilité.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-600 dark:text-slate-400">
              Le manque de visibilité sur vos flottes, vos stocks de carburant et vos équipes terrain constitue la principale source de pertes opérationnelles.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {blindSpots.map((spot, index) => (
              <Reveal key={spot.title} delay={index * 100} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-white/5 dark:ring-white/10">
                  <div className="border-t-4 border-red-500" aria-hidden />
                  {spot.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <GsapImageParallax
                        src={spot.image}
                        alt={spot.imageAlt}
                        sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                        classNameImage="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] flex items-center justify-center bg-slate-200 dark:bg-slate-800">
                      <span aria-hidden className="text-4xl text-slate-500 dark:text-white/70">🚨</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold leading-snug text-slate-900 dark:text-white">{spot.title}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Ce qui se passe :</p>
                  <ul className="mt-2 space-y-1.5">
                    {spot.issues.map((issue) => (
                      <li key={issue} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <span aria-hidden className="text-red-500 dark:text-red-400">
                          •
                        </span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <p className="rounded-lg bg-red-50 p-3 ring-1 ring-red-100 dark:bg-red-500/10 dark:ring-0">
                      <span className="block text-sm font-extrabold uppercase tracking-wide text-red-700 dark:text-red-300">
                        {spot.costLabel}
                      </span>
                      <span className="mt-0.5 block text-xs text-red-600 dark:text-red-400">{spot.costText}</span>
                    </p>
                  </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

            {/* ============ PROBLEMES -> SOLUTIONS ============ */}
      <section className="relative border-t border-slate-200 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              C&apos;est pour cela que nous développons des technologies clé en main pour piloter votre activité.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600 dark:text-slate-400">
              Alliez technologie et accompagnement pour éliminer les coûts cachés, protéger vos équipes et maximiser votre productivité.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutionBlocks.map((block, index) => (
              <Reveal key={block.title} delay={index * 100} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:bg-white/5 dark:ring-white/10">
                  <div aria-hidden className="border-t-4 border-emerald-500" />
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {block.image ? (
                      <GsapImageParallax
                        src={block.image}
                        alt={block.imageAlt}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        classNameImage="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-200 dark:bg-slate-800">
                        <span aria-hidden className="text-4xl text-slate-500 dark:text-white/70">🚨</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold leading-snug text-slate-900 dark:text-white">{block.title}</h3>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Problèmes traités
                    </p>
                    <ul className="mt-2 space-y-1.5 rounded-lg bg-slate-100 p-3 dark:bg-slate-900/60">
                      {block.problems.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                          <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4">
                      <div className="rounded-lg bg-emerald-50 p-3 ring-1 ring-emerald-100 dark:bg-emerald-500/10 dark:ring-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                          Résultats obtenus
                        </span>
                        <ul className="mt-2 space-y-2">
                          {block.results.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm">
                              <span
                                aria-hidden
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-200"
                              >
                                ✓
                              </span>
                              <span className="font-medium text-emerald-700 dark:text-emerald-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={350}>
            <p className="mt-10 text-center text-sm italic text-slate-500 dark:text-slate-400">
              <span aria-hidden>💡</span>
              <span className="ml-1">
                Exemple d&apos;utilisation : un opérateur de transport utilise les vidéos pour clarifier les litiges et responsabiliser les conducteurs.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ LES 3 OFFRES ============ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">Nos solutions</p>
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Présentation des offres
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-400">
              Tracteurs, camions, engins ou flottes légères : choisissez le niveau de pilotage adapté à votre activité.
            </p>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {offers.map((offer, index) => (
              <OfferCard key={offer.slug} offer={offer} delay={index * 120} />
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-sm italic text-slate-500 dark:text-slate-400">
              Chaque offre inclut l&apos;installation du matériel et la formation à la plateforme par nos équipes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ POURQUOI SISBM CORE ============ */}
      <section className="bg-slate-50 py-16 dark:bg-white/5 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Pourquoi choisir SISBM CORE ?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 100} className="h-full">
                <article className="h-full rounded-xl border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:shadow-md">
                  <reason.icon
                    aria-hidden
                    className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  />
                  <h3 className="mt-3 font-bold text-slate-900 dark:text-white">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{reason.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <figure>
              <Image
                src={media.trackerDevice}
                alt="Matériel installé : balise GPS et relais de coupure moteur"
                width={540}
                height={720}
                loading="lazy"
                sizes="(min-width: 640px) 22rem, 100vw"
                className="mx-auto h-auto w-full max-w-[22rem] rounded-xl shadow-md"
              />
              <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                Balise GPS et relais de coupure moteur, installés par nos techniciens.
              </figcaption>
            </figure>
            <figure>
              <Image
                src={media.mobileApp}
                alt="Suivi de la flotte depuis l'application mobile"
                width={540}
                height={720}
                loading="lazy"
                sizes="(min-width: 640px) 22rem, 100vw"
                className="mx-auto h-auto w-full max-w-[22rem] rounded-xl shadow-md"
              />
              <figcaption className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
                Votre flotte dans la poche : suivi en temps réel depuis votre mobile.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ============ COMMENT ÇA MARCHE ============ */}
      <section className="relative py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Méthode
            </p>
            <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Comment ça marche ?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center leading-7 text-slate-500 dark:text-slate-400">
              Du matériel à la décision, SISBM CORE se déploie en trois étapes simples.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Wrench,
                title: "Installation & configuration",
                text: "Nos équipes installent la balise GPS 4G et le relais de coupure moteur sur chaque véhicule, puis configurent la plateforme selon vos règles (horaires, zones, seuils de vitesse).",
              },
              {
                step: "02",
                icon: Satellite,
                title: "Supervision en temps réel",
                text: "Vos véhicules sont suivis en direct : position, itinéraires, arrêts, alertes. Chaque événement déclenche une notification automatique vers les personnes concernées.",
              },
              {
                step: "03",
                icon: BarChart3,
                title: "Pilotage & décision",
                text: "Exploitez les tableaux de bord KPI et les rapports PDF / Excel pour optimiser vos coûts, sécuriser la flotte et améliorer la performance opérationnelle.",
              },
            ].map((item, index) => (
              <Reveal key={item.step} delay={index * 120}>
                <div className="group relative h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
                  <span
                    aria-hidden
                    className="absolute right-5 top-4 text-4xl font-bold text-slate-100 dark:text-white/5"
                  >
                    {item.step}
                  </span>
                  <item.icon
                    aria-hidden
                    className="h-9 w-9 text-blue-600 dark:text-blue-400"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ APERÇU PLATEFORME ============ */}
      <section className="relative overflow-x-clip py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="left" delay={120}>
              <div className="relative lg:-ml-6">
                {/* Halo doux derrière l'image */}
                <figure className="group relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200 transition-transform duration-300 group-hover:-translate-y-1 dark:ring-white/10 dark:hover:shadow-blue-500/20">
                  <Image
                    src={media.platformScreenshot}
                    alt="Aperçu de la plateforme SISBM CORE : tableau de bord de supervision de flotte"
                    width={1376}
                    height={768}
                    loading="lazy"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="h-auto w-full"
                  />
                </figure>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
                  La plateforme
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Un aperçu de SISBM CORE
                </h2>
                <p className="mt-5 leading-7 text-slate-500 dark:text-slate-400">
                  Suivi GPS en temps réel, automatisation des contrôles, gestion
                  proactive des risques et analyse des événements : pilotez
                  votre flotte depuis une seule plateforme.
                </p>

                {/* Points clés : modules de la plateforme */}
                <ul className="mt-7 space-y-4">
                  {platformFeatures.map((feature) => (
                    <li key={feature.title} className="flex items-start gap-3">
                <feature.icon
                  aria-hidden
                  className="mt-1 h-5 w-5 shrink-0 text-blue-500 dark:text-blue-400"
                />
                <span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100">
                    {feature.title}
                  </span>
                  <span className="block text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {feature.description}
                  </span>
                </span>
              </li>
                  ))}
                </ul>

                {/* Positionnement issu de la documentation produit */}
                <p className="mt-7 border-l-2 border-blue-400/40 pl-4 text-sm italic leading-6 text-slate-500 dark:text-slate-400">
                  Bien plus qu&apos;une simple géolocalisation : SISBM CORE automatise
                  vos contrôles, sécurise vos véhicules et vous donne une vision
                  permanente de votre flotte. Chaque événement déclenche les bonnes
                  actions, automatiquement.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ TÉMOIGNAGES ============ */}
      <section className="border-t border-slate-200 py-16 sm:py-20 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-blue-400">
              Ils nous font confiance
            </p>
            <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Ce que disent nos clients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center leading-7 text-slate-500 dark:text-slate-400">
              Flottes suivies, coûts maîtrisés, sérénité retrouvée : la parole
              aux utilisateurs de SISBM CORE.
            </p>
          </Reveal>
          <div className="mt-12">
            <TestimonialsCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="relative overflow-hidden bg-slate-900 py-20 text-white">
        <Image
          src={media.geolocation}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-slate-950/80"
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Prêt à reprendre le contrôle de vos actifs ?
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Nos équipes vous conseillent pour identifier l&apos;offre adaptée à votre flotte et à vos outils existants.
            </p>
          </Reveal>
          <Reveal delay={150}>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-cyan px-8 py-3.5 font-semibold shadow-lg shadow-cyan/40 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-light hover:shadow-xl hover:shadow-cyan/40"
            >
              Demander une démonstration gratuite
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

