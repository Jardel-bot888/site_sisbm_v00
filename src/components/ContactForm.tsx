"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO : connecter un service d'envoi d'e-mails (Resend, Nodemailer, etc.)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <span className="text-4xl" aria-hidden>
          ✅
        </span>
        <h2 className="mt-4 text-lg font-semibold text-green-900">
          Message envoyé !
        </h2>
        <p className="mt-2 text-sm text-green-800">
          Merci pour votre message. Nous vous répondrons dans les plus brefs
          délais.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 rounded-lg border border-green-300 px-4 py-2 text-sm font-semibold text-green-900 hover:bg-green-100"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Nom complet *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jean Dupont"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-slate-700"
          >
            Adresse e-mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jean.dupont@exemple.fr"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Entreprise
        </label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Nom de votre entreprise"
          className={inputClasses}
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          Votre message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre besoin..."
          className={inputClasses}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 sm:w-auto"
      >
        Envoyer le message
      </button>
    </form>
  );
}
