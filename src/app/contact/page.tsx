import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${siteConfig.name} pour toute question ou demande de devis gratuit. Nous vous répondons sous 24h.`,
};

export default function ContactPage() {
  const contactItems = [
    {
      icon: "📍",
      label: "Adresse",
      value: siteConfig.address,
    },
    {
      icon: "📞",
      label: "Téléphone",
      value: siteConfig.phone,
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
        subtitle="Une question, un projet, une demande de devis ? Notre équipe vous répond sous 24h."
      />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Coordonnées */}
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <Reveal key={item.label} delay={index * 100}>
                <div
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5"
                >
                  <span className="text-2xl" aria-hidden>{item.icon}</span>
                  <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {item.label}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-800">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <div className="rounded-2xl bg-slate-50 p-6">
              <h2 className="font-semibold text-slate-900">Horaires</h2>
              <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
                <div className="flex justify-between">
                  <dt>Lundi – Vendredi</dt>
                  <dd className="font-medium text-slate-800">9h – 18h</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Samedi</dt>
                  <dd className="font-medium text-slate-800">Fermé</dd>
                </div>
                <div className="flex justify-between">
                  <dt>Dimanche</dt>
                  <dd className="font-medium text-slate-800">Fermé</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Formulaire */}
          <Reveal direction="right" delay={150} className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-slate-900">
                Envoyez-nous un message
              </h2>
              <p className="mb-6 mt-1 text-sm text-slate-600">
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
