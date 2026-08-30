import Reveal from "@/components/Reveal";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-16 text-white sm:py-20">
      {/* Orbes + dégradé (cohérent avec l'accueil) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="orb absolute -left-24 top-6 h-64 w-64 bg-blue-500/25"
          style={{ animation: "float 18s ease-in-out infinite" }}
        />
        <div
          className="orb-rev absolute -right-24 bottom-0 h-56 w-56 bg-violet-500/20"
          style={{ animation: "float-rev 22s ease-in-out infinite" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/60 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-300">
            SISBM CORE · Gestion & Supervision de Flotte
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
