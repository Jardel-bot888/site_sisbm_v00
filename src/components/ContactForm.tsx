"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          // Piège anti-spam : champ invisible, doit rester vide
          website: data.get("website"),
        }),
      });

      const payload = (await response.json()) as { ok: boolean; error?: string };

      if (response.ok && payload.ok) {
        setStatus("success");
        form.reset();
      } else {
        setError(
          payload.error ??
            "Une erreur est survenue. Réessayez dans quelques instants."
        );
        setStatus("error");
      }
    } catch {
      setError(
        "Impossible de joindre le serveur. Vérifiez votre connexion et réessayez."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <span className="text-4xl" aria-hidden>
          ✅
        </span>
        <h2 className="mt-4 text-lg font-semibold text-emerald-900">
          Message envoyé !
        </h2>
        <p className="mt-2 text-sm text-emerald-800">
          Merci pour votre message. Nous vous répondrons dans les plus brefs
          délais.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setError(null);
          }}
          className="mt-6 rounded-lg border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-100"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {/* Honeypot anti-spam : invisible pour l'utilisateur, attirant pour les bots */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir ce champ</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Nom complet *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            placeholder="Jean Dupont"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-300"
          >
            Adresse e-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={120}
            placeholder="jean.dupont@exemple.fr"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          Entreprise
        </label>
        <input
          id="company"
          name="company"
          type="text"
          maxLength={100}
          placeholder="Nom de votre entreprise"
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-slate-300"
        >
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          placeholder="Décrivez votre besoin..."
          className={inputClasses}
        />
      </div>

      {status === "error" && error && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          ⚠️ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:w-auto"
      >
        {status === "submitting" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}
