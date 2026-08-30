"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Barre de progression de lecture en haut de page (dégradé).
 * Désactivée si l'utilisateur préfère réduire les animations.
 */
export default function ScrollProgress() {
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduce) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
      aria-hidden
    />
  );
}