import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Réponses aux questions fréquentes sur SISBM CORE : suivi GPS en temps réel, zones autorisées, coupure moteur, continuité de service, alertes et différences entre les offres.",
  path: "/faq",
});

const faqItems = [
  {
    question: "Qu'est-ce que SISBM CORE ?",
    answer:
      "SISBM CORE est une plateforme intelligente de gestion, de sécurisation et de supervision de flotte. Elle assure le suivi GPS en temps réel, l'automatisation des contrôles de sécurité (zones, vitesse, horaires) et la centralisation des alertes, afin de sécuriser vos véhicules et d'optimiser vos coûts d'exploitation.",
  },
  {
    question: "Comment fonctionne le suivi GPS en temps réel ?",
    answer:
      "Une balise GPS 4G installée sur chaque véhicule transmet sa position à la plateforme. Vous visualisez tous vos véhicules en temps réel, consultez l'historique détaillé des trajets et pouvez rejouer les déplacements.",
  },
  {
    question: "Que se passe-t-il si un véhicule est hors couverture GSM ?",
    answer:
      "Grâce à la continuité de service (Store & Forward), les données sont enregistrées localement dans la mémoire du traceur. Dès le retour de la connexion, elles sont synchronisées automatiquement avec la plateforme : aucune perte de données, même en zone blanche.",
  },
  {
    question: "Puis-je définir des zones autorisées ou interdites ?",
    answer:
      "Oui. Vous créez des géofences (zones géographiques) en nombre illimité. Chaque entrée ou sortie de zone déclenche des notifications et des actions automatiques conformément à vos politiques de sécurité, y compris une immobilisation contrôlée du véhicule.",
  },
  {
    question: "Comment se déroule le contrôle de la vitesse ?",
    answer:
      "La plateforme détecte automatiquement les excès de vitesse par rapport aux seuils que vous avez définis. Chaque dépassement déclenche une alerte immédiate et peut appliquer des procédures de sécurité conformes à vos paramètres.",
  },
  {
    question: "Comment suis-je alerté en cas d'événement ?",
    answer:
      "Les alertes sont centralisées puis transmises immédiatement aux personnes concernées par e-mail, SMS, WhatsApp, tableau de bord de supervision et notifications de l'application mobile.",
  },
  {
    question: "Quelle différence entre les offres STANDARD, GOLD et PREMIUM ?",
    answer:
      "L'offre STANDARD assure le tracking essentiel (géolocalisation temps réel, historique, arrêt moteur manuel, alertes SMS et e-mail). L'offre GOLD ajoute la supervision automatisée (zones, vitesse, horaires, tableaux de bord KPI). L'offre PREMIUM ajoute en plus une plateforme personnalisable et l'intégration complète à votre système d'information (SOC, SIEM, ERP).",
  },
  {
    question: "Où sont hébergées mes données ?",
    answer:
      "Sur votre propre infrastructure. SISBM CORE peut être hébergée en local, sur vos serveurs : vos données de géolocalisation restent alors au sein de votre organisation, en toute confidentialité.",
  },
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <PageHeader
        title="Questions fréquentes"
        subtitle={`Tout ce que vous devez savoir sur ${siteConfig.product} avant de nous contacter.`}
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 60}>
              <details className="group rounded-xl border border-slate-200 bg-white shadow-sm ring-1 ring-slate-200 open:border-blue-300 dark:border-white/10 dark:bg-white/5 dark:ring-white/10 dark:open:border-blue-500/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-slate-900 dark:text-white">
                  {item.question}
                  <span
                    aria-hidden
                    className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-cyan/10 text-cyan transition-transform duration-300 group-open:rotate-45 dark:bg-cyan/20 dark:text-cyan-300"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 leading-7 text-slate-600 dark:text-slate-300">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-12 rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Une question reste sans réponse ?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Notre équipe vous répond sous 24 heures ouvrées.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-block rounded-lg bg-cyan px-8 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-light hover:shadow-lg hover:shadow-cyan/40"
            >
              Nous contacter
            </Link>
          </div>
        </Reveal>
      </section>

      <JsonLd data={faqLd} />
    </>
  );
}