import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { getService, services } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service introuvable" };
  return {
    title: service.title,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const otherServices = services.filter(
    (item) => item.slug !== service.slug,
  );

  return (
    <>
      <PageHeader title={service.title} subtitle={service.shortDescription} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <nav className="mb-6 text-sm text-slate-500" aria-label="Fil d'ariane">
              <Link href="/" className="hover:text-blue-900">
                Accueil
              </Link>
              <span className="mx-2">/</span>
              <Link href="/services" className="hover:text-blue-900">
                Services
              </Link>
              <span className="mx-2">/</span>
              <span className="font-medium text-slate-900">{service.title}</span>
            </nav>

            <span className="text-5xl" aria-hidden>
              {service.icon}
            </span>

            {service.description.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 text-base leading-7 text-slate-600"
              >
                {paragraph}
              </p>
            ))}

            <h2 className="mt-10 text-xl font-bold text-slate-900">
              Ce que comprend ce service
            </h2>
            <ul className="mt-4 space-y-3">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                >
                  <span className="mt-0.5 text-blue-900" aria-hidden>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Colonne latérale */}
          <aside className="space-y-6">
            <div className="rounded-2xl bg-blue-900 p-6 text-white">
              <h2 className="text-lg font-bold">
                Intéressé par «&nbsp;{service.title}&nbsp;»&nbsp;?
              </h2>
              <p className="mt-2 text-sm text-blue-100">
                Contactez-nous pour discuter de votre projet et obtenir un devis
                gratuit.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
              >
                Demander un devis
              </Link>
            </div>

            <div className="rounded-2xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                Autres services
              </h2>
              <ul className="mt-4 space-y-3">
                {otherServices.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/services/${other.slug}`}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-blue-900"
                    >
                      <span aria-hidden>{other.icon}</span>
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
