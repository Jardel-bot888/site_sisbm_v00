// ============================================================
// Données centralisées — SISBM CORE · Gestion & Supervision de Flotte
// ============================================================

export type OfferLevel = "standard" | "gold" | "premium";

export type OfferTheme = {
  label: string;
  gradient: string;
  accentText: string;
  badge: string;
  button: string;
  ring: string;
};

export type Offer = {
  slug: string;
  level: OfferLevel;
  theme: OfferTheme;
  title: string;
  need: string;
  tagline: string;
  description: string;
  features: { label: string; included: boolean }[];
  automation: string;
  pilotage: string;
  integration: string;
  support: string;
  keyPoints: string[];
};

export const siteConfig = {
  name: "SISBM CORE",
  company: "SISBM",
  product: "SISBM CORE",
  subtitle: "Gestion & Supervision de Flotte",
  heroTitle: "TRACKING DE VÉHICULES",
  slogan:
    "Suivi & supervision de flotte — du tracking essentiel à l'intégration SI.",
  description:
    "SISBM CORE est la solution de géolocalisation et de supervision de flotte du groupe SISBM. Suivez, sécurisez et pilotez vos véhicules en temps réel, où que vous soyez, via notre plateforme hébergée en local.",
  email: "contact@sisbm-ci.com",
  phone1: "+225 27 23 23 94 02",
  phone2: "+225 07 20 16 14 66",
  address: "Abidjan, Côte d’Ivoire",
  website: "www.sisbm-ci.com",
  websiteUrl: "https://www.sisbm-ci.com",
};

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/offres", label: "Nos offres" },
  { href: "/a-propos", label: "À propos" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

// ------------------------------------------------------------
// Media (images)
// ------------------------------------------------------------

export const media = {
  logo: "/Ressource_site_sisbm_core/logo.png",
  hero: "/autre_ressource_img/presentvehiculegemini.jpg",
  geolocation: "/Ressource_site_sisbm_core/geolocalisation.jpg",
  trackerDevice: "/visuels_redim/materiel-tracker.jpg",
  mobileApp: "/visuels_redim/application-mobile.jpg",
  platformScreenshot: "/autre_ressource_img/visu_sisbmcore_Image_ma5.jpg",
};

// ------------------------------------------------------------
// Offres commerciales
// ------------------------------------------------------------

export const offers: Offer[] = [
  {
    slug: "standard",
    level: "standard",
    theme: {
      label: "text-blue-700",
      gradient: "from-blue-600 to-blue-500",
      accentText: "text-blue-700",
      badge: "bg-blue-100 text-blue-800",
      button: "bg-blue-700 hover:bg-blue-600",
      ring: "ring-blue-200",
    },
    title: "STANDARD",
    need: "Le Tracking essentiel",
    tagline: "Localisez, alertez et gardez le contrôle de vos véhicules.",
    description:
      "L'offre STANDARD répond au besoin de « tracking essentiel ». Elle permet de localiser vos véhicules en temps réel et d'être alerté en cas d'événement — sans abonnement mensuel.",
    features: [
      { label: "Traqueur GPS 4G haute précision", included: true },
      { label: "Géolocalisation temps réel & historique des trajets", included: true },
      { label: "Configuration des horaires d'utilisation", included: true },
      { label: "Arrêt moteur manuel", included: true },
      { label: "Alertes SMS et e-mail", included: true },
      { label: "Rapports PDF / Excel", included: true },
      { label: "Plateforme hébergée en local", included: true },
      { label: "Arrêt moteur automatique", included: false },
      { label: "Tableau de bord KPI", included: false },
      { label: "Plateforme personnalisable", included: false },
      { label: "Intégration SOC / SIEM / ERP", included: false },
    ],
    automation: "Arrêt moteur manuel",
    pilotage: "Rapports PDF / Excel",
        integration: "Plateforme hébergée en local",
    support: "Assistance limitée — maintenance facturée",
    keyPoints: [
      "Balise et installation incluses",
      "Sans abonnement",
      "Alertes SMS et e-mail",
    ],
  },
  {
    slug: "gold",
    level: "gold",
    theme: {
      label: "text-amber-700",
      gradient: "from-amber-500 to-orange-600",
      accentText: "text-amber-700",
      badge: "bg-amber-100 text-amber-800",
      button: "bg-amber-600 hover:bg-amber-500",
      ring: "ring-amber-200",
    },
    title: "GOLD",
    need: "La supervision automatisée",
    tagline: "Automatisez le suivi et pilotez la performance de votre flotte.",
    description:
      "L'offre GOLD ajoute l'automatisation et le pilotage par indicateurs. Elle est conçue pour les gestionnaires qui souhaitent superviser leur flotte de façon proactive et mesurer sa performance au quotidien.",
    features: [
      { label: "Tout ce que comprend l'offre STANDARD", included: true },
      { label: "Arrêt moteur automatique", included: true },
      { label: "Tableau de bord KPI (indicateurs de performance)", included: true },
      { label: "Supervision automatisée de la flotte", included: true },
      { label: "Assistance en heures ouvrées", included: true },
      { label: "Maintenance incluse", included: true },
      { label: "Internet de la balise inclus", included: true },
      { label: "SMS inclus", included: true },
      { label: "Plateforme personnalisable", included: false },
      { label: "Intégration SOC / SIEM / ERP", included: false },
    ],
    automation: "Arrêt moteur automatique",
    pilotage: "Tableau de bord KPI",
    integration: "Supervision automatisée en local",
    support: "Assistance en heures ouvrées",
    keyPoints: [
      "Arrêt moteur automatique",
      "Tableau de bord KPI",
      "Maintenance incluse sous réservation",
      "Internet et SMS inclus sous réservation",
    ],
  },
    {
    slug: "premium",
    level: "premium",
    theme: {
      label: "text-teal-700",
      gradient: "from-teal-600 to-emerald-500",
      accentText: "text-teal-700",
      badge: "bg-teal-100 text-teal-800",
      button: "bg-teal-700 hover:bg-teal-600",
      ring: "ring-teal-200",
    },
    title: "PREMIUM",
    need: "L'intégration au SI",
    tagline:
      "Connectez la flotte à votre écosystème métier et à vos opérations critiques.",
    description:
      "L'offre PREMIUM est réservée aux organisations qui veulent intégrer la supervision de flotte à leur Système d'Information : sécurité (SOC / SIEM), ERP, et outils métier personnalisés, le tout avec une assistance 24h/24.",
    features: [
      { label: "Tout ce que comprend l'offre GOLD", included: true },
      { label: "Plateforme personnalisable", included: true },
      { label: "Intégration SOC / SIEM", included: true },
      { label: "Intégration ERP", included: true },
      { label: "Intégration métier sur mesure", included: true },
      { label: "Assistance 24h/24 — 7j/7", included: true },
      { label: "Support prioritaire dédié", included: true },
    ],
    automation: "Arrêt moteur automatique",
    pilotage: "Tableau de bord KPI",
    integration: "Plateforme personnalisable + SOC / SIEM + ERP",
    support: "Assistance 24h/24 — 7j/7",
    keyPoints: [
      "Plateforme entièrement personnalisable",
      "Intégration SOC / SIEM pour la sécurité",
      "Intégration ERP pour le métier",
      "Assistance 24h/24 et 7j/7",
    ],
  },
];

export function getOffer(slug: string): Offer | undefined {
  return offers.find((offer) => offer.slug === slug);
}
// ------------------------------------------------------------
// Pourquoi SISBM CORE
// ------------------------------------------------------------

export const reasons = [
  {
    icon: "📍",
    title: "Suivi en temps réel",
    text: "Position haute précision et historique de vos trajets, accessibles à tout moment.",
  },
  {
    icon: "🛰️",
    title: "Hébergement en local",
    text: "Vos données de géolocalisation restent sur votre infrastructure, en toute confidentialité.",
  },
  {
    icon: "🔧",
    title: "Matériel fiable",
    text: "Traqueurs 4G et relais de coupure moteur installés et configurés par nos équipes.",
  },
  {
    icon: "📱",
    title: "Suivi depuis mobile",
    text: "Consultez votre flotte depuis votre smartphone ou tablette, quand vous voulez.",
  },
];

// ------------------------------------------------------------
// Modules de la plateforme (section "Un aperçu de SISBM CORE")
// ------------------------------------------------------------

export const platformFeatures = [
  {
    icon: "📍",
    title: "Tracking GPS intelligent",
    description: "Position temps réel, historique détaillé des trajets et relecture des déplacements.",
  },
  {
    icon: "🗺️",
    title: "Zones autorisées",
    description: "Géofences illimitées, entrées et sorties détectées, scénarios de sécurité automatiques.",
  },
  {
    icon: "🛑",
    title: "Vitesse maîtrisée",
    description: "Seuils de vitesse personnalisés, excès détectés et alertés immédiatement.",
  },
  {
    icon: "⏰",
    title: "Horaires d'utilisation",
    description: "Plages autorisées configurées, utilisations hors service signalées.",
  },
  {
    icon: "🔔",
    title: "Alertes centralisées",
    description: "E-mail, SMS, WhatsApp : les incidents critiques remontent en temps réel.",
  },
  {
    icon: "📊",
    title: "Tableaux de bord KPI",
    description: "Indicateurs exploitation, sécurité et maintenance, export PDF / Excel et rapports automatiques.",
  },
];

// ------------------------------------------------------------
// Chiffres clés (bandeau d'accueil) — ⚙️ À ADAPTER à vos données réelles
// ------------------------------------------------------------

export const heroStats = [
  { value: 24, suffix: "/7", label: "Supervision de votre flotte en continu" },
  { value: 100, suffix: "%", label: "Traçabilité des déplacements & événements" },
  { value: 360, suffix: "°", label: "Vision complète de vos véhicules" },
  { value: 30, suffix: "%", label: "De coûts d'exploitation maîtrisés en moyenne" },
];

// ------------------------------------------------------------
// Tableau comparatif des trois offres (sans tarification publique)
// ------------------------------------------------------------

export type ComparisonRow = {
  label: string;
  standard: string;
  gold: string;
  premium: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    label: "Arrêt moteur",
    standard: " Manuel",
    gold: " Automatique",
    premium: " Automatique",
  },
  {
    label: "Géolocalisation temps réel",
    standard: "●",
    gold: "●",
    premium: "●",
  },
  {
    label: "Alertes SMS / e-mail",
    standard: "●",
    gold: "●",
    premium: "●",
  },
  {
    label: "Rapports PDF / Excel",
    standard: "●",
    gold: "●",
    premium: "●",
  },
  {
    label: "Tableau de bord KPI",
    standard: "—",
    gold: "●",
    premium: "●",
  },
  {
    label: "Supervision automatisée",
    standard: "—",
    gold: "●",
    premium: "●",
  },
  {
    label: "Maintenance",
    standard: "Facturée",
    gold: "Incluse (sous réservation)",
    premium: "Incluse",
  },
  {
    label: "Internet obligatoire",
    standard: "Non inclus",
    gold: "Inclus (sous réservation)",
    premium: "Inclus",
  },
  {
    label: "Garantie",
    standard: "3 mois",
    gold: "6 mois",
    premium: "6 mois",
  },
  {
    label: "Assistance",
    standard: "Limitée",
    gold: "Heures ouvrées",
    premium: "24h/24 — 7j/7",
  },
  {
    label: "Plateforme personnalisable",
    standard: "—",
    gold: "—",
    premium: "●",
  },
  {
    label: "Intégration SOC / SIEM / ERP",
    standard: "—",
    gold: "—",
    premium: "●",
  },
];