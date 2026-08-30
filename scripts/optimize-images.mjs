// ============================================================
// Optimisation des images du site SISBM CORE (sharp)
// Ré-encodage JPEG (qualité 80-82) + redimensionnement ciblé.
// Usage : node scripts/optimize-images.mjs
// Note : les fichiers sont écrasés en place (l'historique git
// conserve les originaux si besoin de restauration).
// ============================================================

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const targets = [
  // Hero — image plein écran LCP
  {
    file: "public/autre_ressource_img/presentvehiculegemini.jpg",
    width: 1376,
    quality: 82,
  },
  // Coûts cachés — affichées en cartes ~300px max
  {
    file: "public/Ressource_site_sisbm_core/couts_caches/vehicules-mal-utilises.jpg",
    width: 900,
    quality: 80,
  },
  {
    file: "public/Ressource_site_sisbm_core/couts_caches/carburant-perdu.jpg",
    width: 900,
    quality: 80,
  },
  {
    file: "public/Ressource_site_sisbm_core/couts_caches/decisions-couteuses.jpg",
    width: 900,
    quality: 80,
  },
  {
    file: "public/Ressource_site_sisbm_core/couts_caches/equipes-incontrolees.jpg",
    width: 900,
    quality: 80,
  },
  {
    file: "public/Ressource_site_sisbm_core/couts_caches/vols-insecurite.jpg",
    width: 900,
    quality: 80,
  },
  // Solutions — blocs ~640px max
  {
    file: "public/Ressource_site_sisbm_core/solutions/carburant.jpg",
    width: 1200,
    quality: 82,
  },
  {
    file: "public/Ressource_site_sisbm_core/solutions/flotte.jpg",
    width: 1200,
    quality: 82,
  },
  // Aperçu plateforme — large screenshot
  {
    file: "public/autre_ressource_img/visu_sisbmcore_Image_ma5.jpg",
    width: 1200,
    quality: 82,
  },
];

let totalBefore = 0;
let totalAfter = 0;

for (const t of targets) {
  const abs = path.join(repoRoot, t.file);
  const beforeSize = (await sharp(abs).metadata()).size ?? 0;
  totalBefore += beforeSize;

  const info = await sharp(abs)
    .rotate()
    .resize({
      width: t.width,
      withoutEnlargement: true,
    })
    .jpeg({ quality: t.quality, mozjpeg: true })
    .toBuffer();

  // Écriture via fichier temporaire puis remplacement atomique
  // (contourne les verrous d'écriture du watcher dev sur Windows).
  const tmp = `${abs}.new`;
  await sharp(info).toFile(tmp);
  fs.rmSync(abs, { force: true });
  fs.renameSync(tmp, abs);

  totalAfter += info.length;
  const pct = beforeSize > 0 ? Math.round((1 - info.length / beforeSize) * 100) : 0;
  console.log(
    `${t.file.padEnd(70)} ${(beforeSize / 1024).toFixed(0).padStart(5)} Ko -> ${(info.length / 1024)
      .toFixed(0)
      .padStart(5)} Ko (-${pct}%)`
  );
}

console.log(
  `\nTotal : ${(totalBefore / 1024 / 1024).toFixed(2)} Mo -> ${(totalAfter / 1024 / 1024).toFixed(2)} Mo`
);