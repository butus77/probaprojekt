"use client";

import { useState } from "react";

type FormState = { name: string; email: string; message: string };
type ErrorState = { name?: string; email?: string; message?: string; global?: string };

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<ErrorState>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const inputBase =
    "mt-1 w-full rounded-xl border bg-white/90 dark:bg-gray-900/60 p-3 outline-none transition " +
    "placeholder:text-gray-400 dark:placeholder:text-gray-500 " +
    "focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500 " +
    "disabled:opacity-60 disabled:cursor-not-allowed";
  const labelBase = "block text-sm font-medium text-gray-700 dark:text-gray-300";
  const helpText = "mt-1 text-xs text-gray-500 dark:text-gray-400";
  const errorText = "mt-1 text-sm text-red-600";
  const field = (hasError: boolean) =>
    `${inputBase} ${hasError ? "border-red-500" : "border-gray-300 dark:border-gray-700"}`;

  function validateEmail(email: string) {
    return /^\S+@\S+\.\S+$/.test(email);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined, global: undefined }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setSuccessMessage("");
  setErrors({});

  const nextErrors: ErrorState = {};
  if (!formData.name.trim()) nextErrors.name = "A név megadása kötelező.";
  if (!formData.email.trim()) nextErrors.email = "Az e-mail cím megadása kötelező.";
  else if (!validateEmail(formData.email)) nextErrors.email = "Adj meg érvényes e-mail címet.";
  if (!formData.message.trim()) nextErrors.message = "Az üzenet megadása kötelező.";

  if (Object.keys(nextErrors).length) {
    setErrors(nextErrors);
    return;
  }

  try {
    setSubmitting(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: "New message from portfolio form",
        _replyto: formData.email,
      }),
    });

    if (!res.ok) {
      let msg = "Sikertelen beküldés.";
      try {
        const data = await res.json();
        if (data?.error) {
          msg = data.error;
        }
      } catch {}
      setErrors({ global: msg });
      return;
    }

    setSuccessMessage("Üzenetét sikeresen elküldtük! Köszönjük.");
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSuccessMessage(""), 5000);
  } catch {
    setErrors({ global: "Hálózati hiba. Próbáld újra később." });
  } finally {
    setSubmitting(false);
  }
}


  return (
    <div className="mx-auto w-full">
      {/* siker / hiba dobozok */}
      {successMessage && (
        <div
          className="mb-6 rounded-xl border border-emerald-300/60 bg-emerald-50/80 p-4 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-900/20 dark:text-emerald-200"
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </div>
      )}
      {errors.global && (
        <div
          className="mb-6 rounded-xl border border-red-300/60 bg-red-50/80 p-4 text-red-800 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-200"
          role="alert"
        >
          {errors.global}
        </div>
      )}

      {/* kártya */}
      <div className="rounded-2xl border border-gray-200/70 bg-white/70 p-6 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-gray-950/60">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className={labelBase}>
              Név
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-err" : undefined}
              className={field(!!errors.name)}
              placeholder="Pl. Bernadetta"
              autoComplete="name"
            />
            {!errors.name && <p className={helpText}>Hogyan szólíthatlak?</p>}
            {errors.name && (
              <p id="name-err" role="alert" className={errorText}>
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelBase}>
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-err" : undefined}
              className={field(!!errors.email)}
              placeholder="te@pelda.hu"
              autoComplete="email"
            />
            {!errors.email && <p className={helpText}>Erre válaszolok majd.</p>}
            {errors.email && (
              <p id="email-err" role="alert" className={errorText}>
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className={labelBase}>
              Üzenet
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-err" : undefined}
              className={field(!!errors.message)}
              placeholder="Miben segíthetek?"
            />
            {errors.message && (
              <p id="message-err" role="alert" className={errorText}>
                {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Küldés…
              </>
            ) : (
              "Küldés"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

