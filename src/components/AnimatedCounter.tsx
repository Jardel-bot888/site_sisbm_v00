"use client";

import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  /** Valeur cible à afficher (au-delà de 9999 met une espace) */
  value: number;
  /** Suffixe ajouté après le nombre (%, /7, etc.) */
  suffix?: string;
  /** Durée de l'animation en ms */
  duration?: number;
};

/**
 * Compteur animé : démarre à 0 et monte jusqu'à `value` dès que l'élément
 * entre dans le viewport. Respecte `prefers-reduced-motion` (affiche
 * directement la valeur finale) et formate avec la locale française.
 */
export default function AnimatedCounter({
  value,
  suffix = "",
  duration = 1600,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respect de prefers-reduced-motion : afficher directement la valeur finale
    // (via rAF pour éviter un setState synchrone dans l'effet).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setDisplay(value));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // Easing "easeOutCubic" : accélération forte au début, ralentissement à la fin
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}