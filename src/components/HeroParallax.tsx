"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroParallaxProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

/**
 * Parallaxe douce de l'image hero : elle glisse légèrement vers le bas
 * pendant le scroll (effet de profondeur). Implémentation légère en
 * requestAnimationFrame (aucune librairie d'animation) pour ne pas
 * alourdir le premier chargement. Désactivée si l'utilisateur préfère
 * réduire les animations.
 */
export default function HeroParallax({
  src,
  alt,
  sizes = "100vw",
  className = "object-cover opacity-80",
}: HeroParallaxProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      const rect = wrap.getBoundingClientRect();
      const height = rect.height || 1;
      // progress = 0 quand le hero est en haut, 1 quand il a quitté le viewport par le haut
      const progress = Math.min(Math.max(-rect.top / height, 0), 1);
      const y = progress * 60;
      inner.style.transform = `scale(1.05) translate3d(0, ${y}px, 0)`;
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="absolute inset-0 overflow-hidden">
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "scale(1.05)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          preload
          fetchPriority="high"
          sizes={sizes}
          className={className}
        />
      </div>
    </div>
  );
}