// Carte OpenStreetMap statique (Abidjan) — lazy, aucun cookie, conforme RGPD
export default function MapEmbed() {
  // Vue centrée sur Abidjan (5.36N / -4.02O)
  const bbox = "-4.1021%2C5.2953%2C-3.9349%2C5.4253";
  const marker = "5.3603%2C-4.0183";
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`;

  return (
    <div className="overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-white/10">
      <iframe
        title="Localisation de SISBM à Abidjan (carte OpenStreetMap)"
        src={src}
        width="100%"
        height="240"
        loading="lazy"
        allowFullScreen
        tabIndex={-1}
        className="block w-full border-0"
      />
    </div>
  );
}