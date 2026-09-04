import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Offer } from "@/data/site";

type OfferCardProps = {
  offer: Offer;
  delay?: number;
};

const hoverRings: Record<string, string> = {
  standard: "hover:ring-blue-400/40 hover:shadow-blue-400/30",
  gold: "hover:ring-amber-400/40 hover:shadow-amber-400/30",
  premium: "hover:ring-red-400/40 hover:shadow-red-400/30",
};

export default function OfferCard({ offer, delay = 0 }: OfferCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5 ${hoverRings[offer.level] ?? ""}`}
      >
        {/* En-tête coloré */}
        <div
          className={`relative ${offer.theme.solid} px-6 py-5 text-white`}
        >
          {offer.level === "gold" && (
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center rounded-full bg-white px-2.5 py-1 text-xs font-bold text-amber-700 shadow-md">
                ⭐ Le plus choisi
              </span>
            </div>
          )}
          <h3 className="text-xl font-extrabold tracking-wide">
            {offer.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/90">
            {offer.need}
          </p>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">{offer.tagline}</p>

          <ul className="mt-5 space-y-2.5" aria-label={`Points clés de l'offre ${offer.title}`}>
            {offer.keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                >
                  ✓
                </span>
                <span className="text-slate-600 dark:text-slate-300">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Link
              href={`/offres/${offer.slug}`}
              className={`group inline-flex items-center justify-center gap-2 rounded-lg ${offer.theme.button} px-4 py-2.5 text-center text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
            >
              Découvrir l&apos;offre {offer.title}
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5-5 5M6 12h12"
                />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

