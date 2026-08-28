import Image from "next/image";
import Link from "next/link";
import OfferCard from "@/components/OfferCard";
import Reveal from "@/components/Reveal";
import { media, offers, reasons, siteConfig } from "@/data/site";
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
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <Image
          src={media.hero}
          alt="Flotte de véhicules équipés du tracking SISBM CORE"
          fill
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/45 to-transparent"
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
        </div>
      </section>


      {/* ============ COUTS CACHES / AVEUGLEMENT OPERATIONNEL ============ */}
      <section className="border-y border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-red-600">
              Les pertes cachées
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              L&apos;aveuglement opérationnel a un coût direct sur votre rentabilité.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-600">
              Le manque de visibilité sur vos flottes, vos stocks de carburant et vos équipes terrain constitue la principale source de pertes opérationnelles.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {blindSpots.map((spot, index) => (
              <Reveal key={spot.title} delay={index * 100} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="border-t-4 border-red-500" aria-hidden />
                  {spot.image ? (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={spot.image}
                        alt={spot.imageAlt}
                         fill loading="lazy"
                        sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                      <span aria-hidden className="text-4xl text-white/70">🚨</span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold leading-snug text-slate-900">{spot.title}</h3>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Ce qui se passe :</p>
                  <ul className="mt-2 space-y-1.5">
                    {spot.issues.map((issue) => (
                      <li key={issue} className="flex items-start gap-2 text-sm text-slate-700">
                        <span aria-hidden className="text-red-400">
                          •
                        </span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <p className="rounded-lg bg-red-50 p-3">
                      <span className="block text-sm font-extrabold uppercase tracking-wide text-red-700">
                        {spot.costLabel}
                      </span>
                      <span className="mt-0.5 block text-xs text-red-600">{spot.costText}</span>
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
      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              C&apos;est pour cela que nous développons des technologies clé en main pour piloter votre activité.
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-7 text-slate-600">
              Alliez technologie et accompagnement pour éliminer les coûts cachés, protéger vos équipes et maximiser votre productivité.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutionBlocks.map((block, index) => (
              <Reveal key={block.title} delay={index * 100} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div aria-hidden className="border-t-4 border-emerald-600" />
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {block.image ? (
                      <Image
                        src={block.image}
                        alt={block.imageAlt}
                         fill loading="lazy"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                        <span aria-hidden className="text-4xl text-white/70">🚨</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-bold leading-snug text-slate-900">{block.title}</h3>

                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Problèmes traités
                    </p>
                    <ul className="mt-2 space-y-1.5 rounded-lg bg-slate-50 p-3">
                      {block.problems.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                          <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4">
                      <div className="rounded-lg bg-emerald-50 p-3">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-emerald-700">
                          Résultats obtenus
                        </span>
                        <ul className="mt-2 space-y-2">
                          {block.results.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm">
                              <span
                                aria-hidden
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[11px] font-bold text-emerald-800"
                              >
                                ✓
                              </span>
                              <span className="font-medium text-emerald-900">{item}</span>
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
            <p className="mt-10 text-center text-sm italic text-slate-500">
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
            <p className="text-center text-sm font-semibold uppercase tracking-[0.25em] text-blue-600">Nos solutions</p>
            <h2 className="mt-4 text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Présentation des offres
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-7 text-slate-600">
              Tracteurs, camions, engins ou flottes légères : choisissez le niveau de pilotage adapté à votre activité.
            </p>
          </Reveal>

          <div className="mt-12 grid items-stretch gap-6 md:grid-cols-3">
            {offers.map((offer, index) => (
              <OfferCard key={offer.slug} offer={offer} delay={index * 120} />
            ))}
          </div>

          <Reveal delay={200}>
            <p className="mt-8 text-center text-sm italic text-slate-500">
              Chaque offre inclut l&apos;installation du matériel et la formation à la plateforme par nos équipes.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ POURQUOI SISBM CORE ============ */}
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal>
            <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Pourquoi choisir SISBM CORE ?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {reasons.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 100} className="h-full">
                <article className="h-full rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
                  <span aria-hidden className="block text-3xl">
                    {reason.icon}
                  </span>
                  <h3 className="mt-3 font-bold text-slate-900">{reason.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{reason.text}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Image
                  src={media.trackerDevice}
                  alt="Matériel installé : balise GPS et relais de coupure moteur"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-slate-500">
                Balise GPS et relais de coupure moteur, installés par nos techniciens.
              </figcaption>
            </figure>
            <figure>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-md">
                <Image
                  src={media.mobileApp}
                  alt="Suivi de la flotte depuis l'application mobile"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-center text-sm text-slate-500">
                Votre flotte dans la poche : suivi en temps réel depuis votre mobile.
              </figcaption>
            </figure>
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
          className="absolute inset-0 bg-gradient-to-b from-slate-950/90 to-slate-950/60"
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
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-8 py-3.5 font-semibold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-500/40"
            >
              Demander une démonstration gratuite
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

