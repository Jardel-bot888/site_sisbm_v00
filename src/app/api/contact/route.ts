import { NextResponse } from "next/server";
import { siteConfig } from "@/data/site";

// La route utilise nodemailer (module Node) — jamais en mode Edge.
export const runtime = "nodejs";

// ------------------------------------------------------------
// Anti-spam : limite de débit en mémoire (adapté au déploiement
// mono-instance auto-hébergé ; se réinitialise au redémarrage).
// ------------------------------------------------------------
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_PER_WINDOW = 5; // 5 messages max par IP et par fenêtre
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

// ------------------------------------------------------------
// Validation serveur
// ------------------------------------------------------------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function cleanString(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function buildEmail(fields: {
  name: string;
  email: string;
  company: string;
  message: string;
}): { subject: string; text: string; html: string } {
  const subject = `Nouveau message via le site — ${fields.name}${
    fields.company ? ` (${fields.company})` : ""
  }`;

  const text = [
    `Nom : ${fields.name}`,
    `E-mail : ${fields.email}`,
    `Entreprise : ${fields.company || "—"}`,
    "",
    "Message :",
    fields.message,
  ].join("\n");

  const escape = (s: string) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");

  const html = `
    <div style="font-family: sans-serif; max-width: 560px;">
      <h2 style="color:#1e40af;">Nouveau message via le site SISBM CORE</h2>
      <p><strong>Nom :</strong> ${escape(fields.name)}</p>
      <p><strong>E-mail :</strong> ${escape(fields.email)}</p>
      <p><strong>Entreprise :</strong> ${escape(fields.company) || "—"}</p>
      <p><strong>Message :</strong></p>
      <p style="white-space: pre-wrap; background:#f8fafc; padding:12px; border-radius:8px;">${escape(fields.message)}</p>
    </div>
  `.trim();

  return { subject, text, html };
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  // Honeypot : un champ "website" rempli signe un robot.
  // On feint le succès pour ne pas l'alerter, sans rien envoyer.
  if (cleanString(body.website, 200) !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Vous avez envoyé trop de messages. Merci de réessayer dans quelques minutes.",
      },
      { status: 429 }
    );
  }

  const fields = {
    name: cleanString(body.name, 80),
    email: cleanString(body.email, 120).toLowerCase(),
    company: cleanString(body.company, 100),
    message: cleanString(body.message, 2000),
  };

  if (fields.name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Merci d'indiquer votre nom." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(fields.email)) {
    return NextResponse.json(
      { ok: false, error: "L'adresse e-mail saisie n'est pas valide." },
      { status: 400 }
    );
  }
  if (fields.message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Votre message est trop court (10 caractères minimum)." },
      { status: 400 }
    );
  }

  const to = process.env.CONTACT_TO || siteConfig.email;
  const { subject, text, html } = buildEmail(fields);

  try {
    if (process.env.SMTP_HOST) {
      // Envoi SMTP réel (nodemailer est externe au bundle : dynamic import)
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: process.env.SMTP_USER
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || `Site ${siteConfig.name} <no-reply@sisbm-ci.com>`,
        to,
        replyTo: fields.email,
        subject,
        text,
        html,
      });

      console.info(`[contact] e-mail envoyé à ${to} (de ${fields.email})`);
    } else {
      // Mode dégradé : SMTP non configuré → journalisation locale
      console.info(
        `[contact] SMTP non configuré — message journalisé (mode log) :\n` +
          `De : ${fields.name} <${fields.email}>\n` +
          `Entreprise : ${fields.company || "—"}\n` +
          `Message : ${fields.message}`
      );
    }
  } catch (error) {
    console.error("[contact] échec d'envoi :", error);
    return NextResponse.json(
      {
        ok: false,
        error:
          "Une erreur est survenue lors de l'envoi. Réessayez ou contactez-nous directement par téléphone.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}