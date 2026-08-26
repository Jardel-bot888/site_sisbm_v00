export type Service = {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  description: string[];
  features: string[];
};

export const siteConfig = {
  name: "SISBM",
  tagline: "Des solutions professionnelles adaptées à vos besoins",
  description:
    "SISBM est une entreprise spécialisée dans l'accompagnement des professionnels : conseil, services techniques et solutions sur mesure pour développer votre activité.",
  email: "contact@sisbm.fr",
  phone: "+33 1 23 45 67 89",
  address: "12 rue de l'Exemple, 75000 Paris",
};

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export const services: Service[] = [
  {
    slug: "conseil-strategique",
    icon: "💼",
    title: "Conseil Stratégique",
    shortDescription:
      "Un accompagnement personnalisé pour définir votre stratégie et atteindre vos objectifs.",
    description: [
      "Notre équipe de consultants vous accompagne dans la définition de votre stratégie d'entreprise, l'analyse de votre marché et la prise de décisions clés.",
      "Nous mettons notre expertise au service de votre croissance avec une approche pragmatique et orientée résultats.",
    ],
    features: [
      "Audit et diagnostic complet",
      "Définition d'un plan d'action sur mesure",
      "Suivi et accompagnement régulier",
      "Reporting et indicateurs de performance",
    ],
  },
  {
    slug: "developpement-web",
    icon: "🌐",
    title: "Développement Web",
    shortDescription:
      "Sites vitrines, e-commerce et applications web performants et modernes.",
    description: [
      "Nous concevons et développons des sites web et applications sur mesure, adaptés à votre image et à vos objectifs commerciaux.",
      "De la maquette à la mise en ligne, nous prenons en charge l'intégralité de votre projet digital.",
    ],
    features: [
      "Site vitrine et e-commerce",
      "Applications web sur mesure",
      "Optimisation SEO et performances",
      "Maintenance et évolutions",
    ],
  },
  {
    slug: "maintenance-informatique",
    icon: "🛠️",
    title: "Maintenance Informatique",
    shortDescription:
      "Assurez la continuité de votre activité grâce à un parc informatique fiable.",
    description: [
      "Nous assurons la maintenance préventive et curative de votre parc informatique pour garantir la continuité de votre activité.",
      "Nos techniciens interviennent rapidement, à distance ou sur site, pour résoudre tous vos incidents.",
    ],
    features: [
      "Contrats de maintenance adaptés",
      "Intervention rapide sur site ou à distance",
      "Gestion et renouvellement du parc",
      "Sauvegarde et récupération des données",
    ],
  },
  {
    slug: "formation",
    icon: "🎓",
    title: "Formation & Accompagnement",
    shortDescription:
      "Développez les compétences de vos équipes avec nos formations sur mesure.",
    description: [
      "Nous proposons des formations professionnelles adaptées aux besoins de vos collaborateurs, en présentiel ou à distance.",
      "Nos formateurs expérimentés vous accompagnent dans la montée en compétences de vos équipes.",
    ],
    features: [
      "Programmes personnalisés",
      "Formations en présentiel ou distanciel",
      "Supports pédagogiques inclus",
      "Évaluation des acquis",
    ],
  },
  {
    slug: "securite-informatique",
    icon: "🔒",
    title: "Sécurité Informatique",
    shortDescription:
      "Protégez vos données et vos systèmes contre les menaces numériques.",
    description: [
      "Nous sécurisons votre infrastructure informatique et sensibilisons vos équipes aux bonnes pratiques de cybersécurité.",
      "Protégez votre entreprise contre les ransomwares, les fuites de données et les intrusions.",
    ],
    features: [
      "Audit de sécurité complet",
      "Mise en place de solutions de protection",
      "Sauvegardes sécurisées",
      "Sensibilisation des utilisateurs",
    ],
  },
  {
    slug: "solutions-cloud",
    icon: "☁️",
    title: "Solutions Cloud",
    shortDescription:
      "Modernisez votre infrastructure avec des solutions cloud flexibles et évolutives.",
    description: [
      "Nous vous aidons à migrer vers le cloud et à exploiter au mieux les solutions infogérées pour plus de flexibilité et de mobilité.",
      "Travaillez partout, en toute sécurité, avec des outils collaboratifs modernes.",
    ],
    features: [
      "Migration vers le cloud",
      "Messagerie professionnelle",
      "Travail collaboratif",
      "Infogérance et support",
    ],
  },
];

export const stats = [
  { value: "10+", label: "Années d'expérience" },
  { value: "250+", label: "Clients satisfaits" },
  { value: "500+", label: "Projets réalisés" },
  { value: "15", label: "Experts dédiés" },
];

export const values = [
  {
    icon: "🎯",
    title: "Engagement",
    text: "Nous nous engageons à fournir un travail de qualité et à respecter nos délais, pour chacun de nos clients.",
  },
  {
    icon: "🤝",
    title: "Proximité",
    text: "Une équipe disponible et à l'écoute, qui prend le temps de comprendre vos besoins spécifiques.",
  },
  {
    icon: "💡",
    title: "Innovation",
    text: "Nous restons à la pointe des dernières technologies pour vous proposer des solutions modernes.",
  },
  {
    icon: "⭐",
    title: "Excellence",
    text: "La satisfaction de nos clients est notre priorité absolue, du premier contact au suivi de projet.",
  },
];

export const testimonials = [
  {
    quote:
      "Une équipe professionnelle et réactive qui a parfaitement compris nos besoins. Le résultat dépasse nos attentes !",
    author: "Marie Dupont",
    role: "Directrice, Entreprise A",
  },
  {
    quote:
      "Accompagnement de qualité du début à la fin du projet. Nous recommandons vivement leurs services.",
    author: "Jean Martin",
    role: "Gérant, Société B",
  },
  {
    quote:
      "Grâce à leur expertise, nous avons modernisé notre infrastructure tout en respectant notre budget.",
    author: "Sophie Bernard",
    role: "Responsable IT, Groupe C",
  },
];

export const team = [
  { name: "Alexandre Petit", role: "Fondateur & Directeur" },
  { name: "Claire Moreau", role: "Responsable Projets" },
  { name: "Thomas Rousseau", role: "Lead Technique" },
  { name: "Laura Fontaine", role: "Responsable Clientèle" },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

