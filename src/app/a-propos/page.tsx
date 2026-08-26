import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import TestimonialCard from "@/components/TestimonialCard";
import { siteConfig, stats, team, testimonials, values } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos",
  description: `Découvrez ${siteConfig.name}, notre histoire, nos valeurs et notre équipe dédiée à votre réussite.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title={`À propos de ${siteConfig.name}`}
        subtitle="Notre histoire, nos valeurs et l'équipe qui vous accompagne au quotidien."
      />

      {/* Notre histoire */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Reveal>
          <h2 className="text-2xl font-bold text-slate-900">Notre histoire</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Fondée il y a plus de 10 ans, {siteConfig.name} est née
            d&apos;une conviction simple&nbsp;: chaque entreprise mérite un
            partenaire de confiance pour l&apos;accompagner dans son
            développement numérique et stratégique.
          </p>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Au fil des années, nous avons développé une expertise reconnue et
            fidélisé plus de 250 clients, des petites structures aux grands
            groupes. Notre force&nbsp;? Une équipe pluridisciplinaire
            passionnée, à l&apos;écoute et engagée à vos côtés.
          </p>
          </Reveal>

          {/* Statistiques */}
          <Reveal delay={100}>
          <dl className="mt-10 grid grid-cols-2 gap-6 rounded-2xl bg-slate-50 p-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dd className="text-2xl font-bold text-blue-900">
                  {stat.value}
                </dd>
                <dt className="mt-1 text-xs text-slate-600">{stat.label}</dt>
              </div>
            ))}
          </dl>
          </Reveal>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Nos valeurs
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 100}>
                <div
                  className="h-full rounded-2xl border border-slate-200 bg-white p-6 text-center"
                >
                  <span className="text-4xl" aria-hidden>{value.icon}</span>
                  <h3 className="mt-4 font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {value.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Notre équipe */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Notre équipe
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 100}>
              <div
                className="h-full rounded-2xl border border-slate-200 p-6 text-center"
              >
                <span
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-900 text-xl font-bold text-white"
                  aria-hidden
                >
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>
                <h3 className="mt-4 font-semibold text-slate-900">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">{member.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Témoignages */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Ils nous font confiance
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.author} delay={index * 150}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Rejoignez nos clients satisfaits
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
