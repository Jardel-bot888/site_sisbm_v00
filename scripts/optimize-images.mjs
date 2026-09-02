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
  // Aperçu plateforme — large screenshot
  {
    file: "public/autre_ressource_img/visu_sisbmcore_Image_ma5.jpg",
    width: 1200,
    quality: 82,
  },
  // Application mobile (encart "Pourquoi choisir SISBM CORE")
  {
    file: "public/visuels_redim/application-mobile.jpg",
    width: 540,
    quality: 82,
  },
  // Problèmes — cartes 16/10
  {
    file: "public/problemes_img/probleme-1-visibilite.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/problemes_img/probleme-2-perimetre.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/problemes_img/probleme-3-vitesse-horaires.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/problemes_img/probleme-4-alertes-donnees.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/problemes_img/probleme-5-decisions.jpg",
    width: 800,
    quality: 80,
  },
  // Solutions — cartes 16/10
  {
    file: "public/solutions_img/solution-1-gps.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/solutions_img/solution-2-geofencing.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/solutions_img/solution-3-vitesse-horaires.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/solutions_img/solution-4-alertes-donnees.jpg",
    width: 800,
    quality: 80,
  },
  {
    file: "public/solutions_img/solution-5-kpi.jpg",
    width: 800,
    quality: 80,
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