"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Testimonial } from "@/data/site";

type TestimonialsCarouselProps = {
  items: Testimonial[];
};

/** Note étoilée affichée (1 à 5) — accessible via texte caché */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
        />
      ))}
      <span className="sr-only">Note : {rating} sur 5</span>
    </div>
  );
}

export default function TestimonialsCarousel({
  items,
}: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    // État initial via rAF (évite tout setState synchrone dans l'effet)
    const frame = requestAnimationFrame(() => {
      setScrollSnaps(emblaApi.scrollSnapList());
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    return () => {
      emblaApi.off("select", onSelect);
      cancelAnimationFrame(frame);
    };
  }, [emblaApi]);

  return (
    <div>
      {/* Piste du carrousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {items.map((t) => (
            <div
              key={t.name}
              className="min-w-0 flex-[0_0_100%] md:flex-[0_0_calc(50%-10px)]"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
                <Stars rating={t.rating} />
                <blockquote className="mt-4 flex-1 leading-7 text-slate-600 dark:text-slate-300">
                  «&nbsp;{t.quote}&nbsp;»
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4 dark:border-white/10">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-base font-bold text-white"
                  >
                    {t.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {t.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation : flèches + points */}
      <div className="mt-8 flex items-center justify-between">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Témoignage {selectedIndex + 1} / {items.length}
        </p>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
                aria-current={index === selectedIndex ? "true" : undefined}
                className="group flex h-6 w-6 items-center justify-center rounded-full"
              >
                <span
                  aria-hidden
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    index === selectedIndex
                      ? "w-6 bg-blue-600 dark:bg-blue-400"
                      : "w-2.5 bg-slate-300 group-hover:bg-slate-400 dark:bg-slate-600 dark:group-hover:bg-slate-500"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Témoignage précédent"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:text-blue-300"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              aria-label="Témoignage suivant"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-200 hover:border-blue-400 hover:text-blue-600 dark:border-white/15 dark:text-slate-300 dark:hover:border-blue-400/50 dark:hover:text-blue-300"
            >
              <ChevronRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}