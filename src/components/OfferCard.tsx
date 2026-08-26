import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Offer } from "@/data/site";

type OfferCardProps = {
  offer: Offer;
  delay?: number;
};

export default function OfferCard({ offer, delay = 0 }: OfferCardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm ring-1 ring-transparent transition-shadow hover:shadow-md hover:${offer.theme.ring}`}
      >
        {/* En-tête coloré */}
        <div
          className={`bg-gradient-to-r ${offer.theme.gradient} px-6 py-5 text-white`}
        >
          <h3 className="text-xl font-extrabold tracking-wide">
            {offer.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-white/90">
            {offer.need}
          </p>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm leading-6 text-slate-600">{offer.tagline}</p>

          <ul className="mt-5 space-y-2.5" aria-label={`Points clés de l'offre ${offer.title}`}>
            {offer.keyPoints.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm">
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700"
                >
                  ✓
                </span>
                <span className="text-slate-700">{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <Link
              href={`/offres/${offer.slug}`}
              className={`block rounded-lg ${offer.theme.button} px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors`}
            >
              Découvrir l&apos;offre {offer.title}
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
