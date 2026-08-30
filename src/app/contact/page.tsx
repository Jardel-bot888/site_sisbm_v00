import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Contactez ${siteConfig.name} pour toute question ou demande de devis gratuit. Nous vous répondons sous 24h.`,
  path: "/contact",
});

export default function ContactPage() {
  const contactItems = [
    {
      icon: "📍",
      label: "Adresse",
      value: siteConfig.address,
    },
    {
      icon: "📞",
      label: "Téléphones",
      value: `${siteConfig.phone1} · ${siteConfig.phone2}`,
    },
    {
      icon: "✉️",
      label: "E-mail",
      value: siteConfig.email,
    },
  ];

  return (
    <>
      <PageHeader
        title="Contactez-nous"
        subtitle="Une question sur nos offres de tracking ? Une demande de devis pour votre flotte ? Nous vous répondons rapidement."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Coordonnées */}
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <Reveal key={item.label} delay={index * 100}>
                <div className="flex items-start gap-4 rounded-xl border-t-4 border-blue-600 bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/15 text-xl"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      {item.label}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-200">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
              <h2 className="font-semibold text-slate-900 dark:text-white">Assistance</h2>
              <dl className="mt-3 space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <dt>Offre STANDARD</dt>
                  <dd className="font-medium text-slate-700 dark:text-slate-200">Limitée</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Offre GOLD</dt>
                  <dd className="font-medium text-slate-700 dark:text-slate-200">Heures ouvrées</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Offre PREMIUM</dt>
                  <dd className="font-medium text-slate-700 dark:text-slate-200">24h/24 — 7j/7</dd>
                </div>
              </dl>
              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                Site groupe :{" "}
                <a
                  href={siteConfig.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {siteConfig.website}
                </a>
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
              <MapEmbed />
            </div>

            <div className="rounded-xl bg-slate-50 p-6 ring-1 ring-slate-200 dark:bg-white/5 dark:ring-white/10">
              <h2 className="font-semibold text-slate-900 dark:text-white">Horaires</h2>
              <dl className="mt-3 space-y-1.5 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex justify-between">
                  <dt>Lundi – Vendredi</dt>
                  <dd className="font-medium text-slate-700 dark:text-slate-200">08h00 – 18h00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Samedi</dt>
                  <dd className="font-medium text-slate-700 dark:text-slate-200">08h00 – 13h00</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Dimanche</dt>
                  <dd className="font-medium text-slate-700 dark:text-slate-200">Fermé</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Formulaire */}
          <Reveal direction="right" delay={150} className="lg:col-span-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Envoyez-nous un message
              </h2>
              <p className="mb-6 mt-1 text-sm text-slate-500 dark:text-slate-400">
                Les champs marqués d&apos;un astérisque (*) sont obligatoires.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
