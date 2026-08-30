"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type HeroParallaxProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
};

/**
 * Parallaxe douce de l'image hero : elle glisse légèrement vers le bas
 * pendant le scroll (effet de profondeur). Désactivée si l'utilisateur
 * préfère réduire les animations.
 */
export default function HeroParallax({
  src,
  alt,
  sizes = "100vw",
  className = "object-cover opacity-80",
}: HeroParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <div ref={ref} aria-hidden className="absolute inset-0 overflow-hidden">
      <motion.div
        style={shouldReduce ? undefined : { y, scale: 1.15 }}
        className="absolute inset-0 will-change-transform"
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
      </motion.div>
    </div>
  );
}