import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import TestimonialCard from "@/components/TestimonialCard";
import { services, stats, testimonials, siteConfig } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              {siteConfig.description}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Découvrir nos services
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border border-slate-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistiques */}
      <section className="border-b border-slate-200 bg-slate-50">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dd className="text-3xl font-bold text-blue-900">{stat.value}</dd>
              <dt className="mt-2 text-sm text-slate-600">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Nos services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Nous proposons une gamme complète de services pour accompagner votre
            entreprise à chaque étape de son développement.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      {/* Pourquoi nous choisir */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Pourquoi choisir {siteConfig.name}&nbsp;?
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Depuis plus de 10 ans, nous accompagnons nos clients avec
                professionnalisme et proximité. Notre approche est simple&nbsp;:
                comprendre vos besoins, proposer des solutions adaptées et
                garantir des résultats concrets.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span className="text-blue-900" aria-hidden>✓</span>
                  Une équipe d&apos;experts dédiée à votre projet
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-900" aria-hidden>✓</span>
                  Des solutions sur mesure adaptées à votre budget
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-900" aria-hidden>✓</span>
                  Un support réactif et disponible
                </li>
              </ul>
              <Link
                href="/a-propos"
                className="mt-8 inline-block rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                En savoir plus sur nous
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: "🚀", title: "Réactivité", text: "Des délais courts et respectés" },
                { icon: "🏆", title: "Qualité", text: "Un travail soigné et fiable" },
                { icon: "💬", title: "Écoute", text: "Un interlocuteur unique dédié" },
                { icon: "📈", title: "Résultats", text: "Des solutions orientées performance" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6"
                >
                  <span className="text-3xl" aria-hidden>{item.icon}</span>
                  <h3 className="mt-3 font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900">
          Ce que disent nos clients
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.author} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="bg-blue-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Un projet en tête&nbsp;?
            </h2>
            <p className="mt-2 text-sm text-blue-100 sm:text-base">
              Contactez-nous dès aujourd&apos;hui pour un devis gratuit et sans
              engagement.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-900 transition-colors hover:bg-blue-50"
          >
            Demander un devis
          </Link>
        </div>
      </section>
    </>
  );
}
