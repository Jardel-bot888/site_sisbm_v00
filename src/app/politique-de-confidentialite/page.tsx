import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description: `Politique de confidentialité de ${siteConfig.product} — données collectées, finalités et droits des utilisateurs.`,
  path: "/politique-de-confidentialite",
});

const sections = [
  {
    title: "1. Responsable du traitement",
    body: [
      `${siteConfig.company} — ${siteConfig.address}.`,
      `Pour toute question relative à vos données : ${siteConfig.email}.`,
    ],
  },
  {
    title: "2. Données collectées",
    body: [
      "Lorsque vous utilisez le formulaire de contact, nous collectons les informations que vous nous transmettez volontairement : nom, adresse e-mail, entreprise, sujet et contenu de votre message.",
      "Aucune donnée de localisation ou de navigation n'est collectée de manière automatique sur ce site.",
    ],
  },
  {
    title: "3. Finalités des traitements",
    body: [
      "Les données sont utilisées uniquement pour :",
      "— répondre à votre demande et vous apporter l'information demandée ;",
      "— préparer un devis ou organiser une démonstration ;",
      "— assurer le suivi de la relation commerciale, si vous êtes déjà client.",
    ],
  },
  {
    title: "4. Conservation des données",
    body: [
      "Vos messages sont conservés le temps nécessaire au traitement de votre demande, puis archivés conformément aux obligations légales applicables.",
    ],
  },
  {
    title: "5. Destinataires des données",
    body: [
      "Vos données sont destinées aux services concernés de SISBM. Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.",
    ],
  },
  {
    title: "6. Vos droits",
    body: [
      "Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition au traitement de vos données personnelles.",
      "Pour l'exercer, écrivez-nous à l'adresse e-mail indiquée ci-dessus. Nous répondons dans les meilleurs délais.",
    ],
  },
  {
    title: "7. Cookies et traçage",
    body: [
      "Ce site n'utilise aucun cookie de suivi publicitaire ou de statistiques tiers.",
      "Votre préférence de thème (clair ou sombre) est simplement mémorisée localement dans votre navigateur (localStorage) et n'est jamais transmise à des tiers.",
    ],
  },
  {
    title: "8. Canaux de communication externes",
    body: [
      "Si vous nous contactez par WhatsApp ou par e-mail, ces échanges restent soumis aux conditions d'utilisation des plateformes correspondantes.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Politique de confidentialité"
        subtitle="Comment nous collectons et protégeons vos données."
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
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Retour au site :{" "}
            <Link
              href="/"
              className="font-medium text-blue-700 underline underline-offset-2 dark:text-blue-300"
            >
              {siteConfig.name}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}