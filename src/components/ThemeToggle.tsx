"use client";

/**
 * Bascule theme clair / sombre. La classe `dark` sur <html> est posee des le
 * chargement par le script anti-FOUC ; ici on la bascule + persiste.
 * Les deux icones sont masquees/affichees en CSS (dark:block / dark:hidden) :
 * aucun etat React, aucun decalage d'hydratation.
 */
export default function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      window.localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* stockage indisponible : on ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Basculer entre thème clair et thème sombre"
      title="Basculer thème clair / sombre"
      className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-all duration-200 hover:bg-white/15"
    >
      {/* Soleil : visible uniquement en thème sombre (propose le clair) */}
      <svg
        className="hidden h-5 w-5 dark:block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
        />
      </svg>
      {/* Lune : visible uniquement en thème clair (propose le sombre) */}
      <svg
        className="block h-5 w-5 dark:hidden"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
        />
      </svg>
    </button>
  );
}
