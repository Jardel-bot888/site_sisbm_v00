import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.product} (${siteConfig.company}) — éditeur, contact et propriété intellectuelle.`,
  path: "/mentions-legales",
});

const sections = [
  {
    title: "Éditeur du site",
    body: [
      `${siteConfig.company} — ${siteConfig.subtitle}.`,
      `Siège : ${siteConfig.address}.`,
    ],
  },
  {
    title: "Contact",
    body: [
      `E-mail : ${siteConfig.email}`,
      `Téléphone : ${siteConfig.phone1} · ${siteConfig.phone2}`,
    ],
  },
  {
    title: "Directeur de la publication",
    body: [`La direction de ${siteConfig.company}.`],
  },
  {
    title: "Hébergement",
    body: [
      "Le site est hébergé par une infrastructure sécurisée. Pour toute question relative à l'hébergement, contactez-nous via l'adresse ci-dessus.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      `L'ensemble des contenus de ce site (textes, images, logo, marques, éléments graphiques) est la propriété exclusive de ${siteConfig.company}, sauf mention contraire.`,
      "Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.",
    ],
  },
  {
    title: "Responsabilité",
    body: [
      `Les informations présentées sur ce site le sont à titre informatif. ${siteConfig.company} s'efforce d'en assurer l'exactitude mais ne saurait être tenue responsable de tout préjudice résultant de leur utilisation.`,
    ],
  },
  {
    title: "Droit applicable",
    body: [
      "Le présent site et ses mentions légales sont soumis au droit ivoirien, en vigueur en République de Côte d'Ivoire.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHeader
        title="Mentions légales"
        subtitle="Informations légales relatives au site SISBM CORE."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="space-y-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {section.title}
              </h2>
              {section.body.map((p, i) => (
                <p
                  key={i}
                  className="mt-2 leading-7 text-slate-600 dark:text-slate-300"
                >
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}