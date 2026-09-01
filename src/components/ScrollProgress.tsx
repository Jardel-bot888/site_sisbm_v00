"use client";

import { useEffect, useRef } from "react";

/**
 * Barre de progression de lecture en haut de page (dégradé).
 * Implémentation légère en requestAnimationFrame — aucune librairie
 * d'animation : n'alourdit pas les bundles partagés entre les pages.
 * Désactivée si l'utilisateur préfère réduire les animations.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      return;
    }

    let raf = 0;
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${ratio})`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-blue-600"
    />
  );
}