"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll soyeux (inertie premium) via Lenis.
 * - Désactivé si l'utilisateur préfère réduire les animations.
 * - `anchors` : les liens <a href="#..."> utilisent lenis.scrollTo
 *   (offset pour la navbar sticky).
 * - autoRaf : boucle requestAnimationFrame gérée par Lenis.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      autoToggle: true,
      duration: 1.1,
      smoothWheel: true,
      anchors: { offset: -80 },
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}