"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Décalage d'animation en ms (effet cascade sur les cartes) */
  delay?: number;
  /** Direction d'apparition de l'élément */
  direction?: "up" | "left" | "right" | "none";
  /** Classes additionnelles appliquées au conteneur */
  className?: string;
};

const initialTranslations = {
  up: "translate-y-8",
  left: "-translate-x-8",
  right: "translate-x-8",
  none: "",
} as const;

/**
 * Fait apparaître son contenu en fondu + glissement lorsque l'élément
 * entre dans le viewport (IntersectionObserver). L'animation ne joue
 * qu'une seule fois, puis l'observateur est déconnecté.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal transition-[opacity,transform] duration-700 ease-out ${
        visible
          ? "translate-x-0 translate-y-0 opacity-100"
          : `${initialTranslations[direction]} opacity-0 will-change-transform`
      }${className ? ` ${className}` : ""}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
