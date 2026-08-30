"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type GsapImageParallaxProps = {
  src: string;
  alt: string;
  sizes?: string;
  classNameImage?: string;
};

/**
 * Parallaxe douce de l'image à l'intérieur d'une carte (scroll "scrub").
 * Le wrapper déborde légèrement (120% + offset) pour éviter toute zone vide
 * pendant le glissement. Désactivé si prefers-reduced-motion est actif.
 */
export default function GsapImageParallax({
  src,
  alt,
  sizes = "100vw",
  classNameImage = "object-cover",
}: GsapImageParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
    >
      <Image
        src={src}
        alt={alt}
        fill
        loading="lazy"
        sizes={sizes}
        className={classNameImage}
      />
    </div>
  );
}