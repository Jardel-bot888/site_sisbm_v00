import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import { services, siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Nos Services",
  description: `Découvrez l'ensemble des services proposés par ${siteConfig.name} pour accompagner le développement de votre entreprise.`,
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Nos services"
        subtitle="Une gamme complète de prestations pour répondre à tous vos besoins professionnels."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={(index % 3) * 100}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
