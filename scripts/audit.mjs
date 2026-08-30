// ============================================================
// Audit Lighthouse automatisé (Windows-friendly)
//
// - Démarre automatiquement le serveur de production (port 3000)
//   s'il n'est pas déjà actif, puis lance Lighthouse headless.
// - Écrit un rapport HTML dans lighthouse-report.html.
// - Nettoie le profil Chrome et arrête le serveur s'il a été
//   démarré par le script (pas de process laissé derrière).
//
// Usage : npm run audit
// ============================================================

import { spawn } from "node:child_process";
import { rmSync, existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { launch as launchChrome } from "chrome-launcher";
import lighthouse from "lighthouse";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 3000;
const URL = `http://localhost:${PORT}/`;

// ----------------------------- Outils -----------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function isServerReady() {
  try {
    const res = await fetch(URL, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
}

function findChrome() {
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ];
  return candidates.find((c) => existsSync(c));
}

// --------------------- Démarrage serveur (si besoin) ----------------
let serverProcess = null;
let serverStartedByUs = false;

if (await isServerReady()) {
  console.log(`✓ Serveur déjà actif sur ${URL}`);
} else {
  const nextBin = path.join(
    repoRoot,
    "node_modules",
    "next",
    "dist",
    "bin",
    "next"
  );
  console.log(`→ Démarrage du serveur de production (${nextBin})…`);
  serverProcess = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], {
    cwd: repoRoot,
    stdio: ["ignore", "ignore", "inherit"],
    windowsHide: true,
  });
  serverStartedByUs = true;

  let ready = false;
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    if (await isServerReady()) {
      ready = true;
      break;
    }
  }
  if (!ready) {
    console.error("✗ Serveur non accessible après 30s — vérifiez la build (.next).");
    serverProcess.kill();
    process.exit(1);
  }
  console.log("✓ Serveur prêt");
}

// --------------------------- Chrome headless -----------------------
const userDataDir = "C:\\tmp\\lh-profile";
try {
  mkdirSync(userDataDir, { recursive: true });
} catch {}

const chromePath = findChrome();
if (!chromePath) {
  console.error("✗ Aucun Chrome/Edge trouvé pour l'audit.");
  if (serverStartedByUs) serverProcess.kill();
  process.exit(1);
}

console.log("→ Lancement de Lighthouse… (peut prendre ~30-45s)\n");

// ----------------------------- Audit ------------------------------
let reportHtml = "";
let scores = {};
let chrome = null;

try {
  chrome = await launchChrome({
    chromePath,
    userDataDir,
    chromeFlags: [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
    ],
  });

  const result = await lighthouse(
    URL,
    {
      port: chrome.port,
      output: "html",
      logLevel: "error",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    },
    undefined
  );

  if (!result) {
    throw new Error("Lighthouse n'a retourné aucun résultat.");
  }
  reportHtml = result.report;

  const cats = (result.lhr ?? {}).categories ?? {};
  for (const [key, cat] of Object.entries(cats)) {
    scores[key] = Math.round((cat.score ?? 0) * 100);
  }
} finally {
  // Fermeture du navigateur
  if (chrome) {
    try {
      await chrome.kill();
    } catch {}
  }
  // Nettoyage du profil (peut échouer sur Windows si un process enfant traîne)
  try {
    rmSync(userDataDir, { recursive: true, force: true });
  } catch {}
}

// --------------------------- Rapport ------------------------------
const outputPath = path.join(repoRoot, "lighthouse-report.html");
import("node:fs").then(({ writeFileSync }) => writeFileSync(outputPath, reportHtml, "utf8"));

// --------------------------- Affichage ----------------------------
console.log("\n======================== Résultats ========================");
for (const [key, value] of Object.entries(scores)) {
  console.log(`  ${key.padEnd(16)} ${value}/100`);
}
console.log("===========================================================");
console.log(`Rapport HTML : ${outputPath}`);

// Arrêt du serveur seulement si c'est nous qui l'avons démarré
if (serverStartedByUs && serverProcess) {
  serverProcess.kill();
  console.log("Serveur arrêté.");
}