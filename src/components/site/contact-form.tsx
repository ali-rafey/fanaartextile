"use client";

import { useState } from "react";
import { Field, SubmitBar, fieldClass } from "./form-field";

/**
 * Contact form — hairline underline fields rather than boxed inputs, to sit
 * inside the site's editorial language. Submissions persist through
 * /api/feedback and surface in the admin inbox.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSending(true);
    setError(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "contact",
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject"),
          message: data.get("message"),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not send your message.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your message.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="border-t border-ink/20 pt-10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-clay">
          Message received
        </p>
        <p className="mt-5 max-w-md font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
          Thank you for writing. We read every note, and will be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/60 transition-colors duration-300 ease-lux hover:text-clay"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="name" label="Name">
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field id="email" label="Email">
          <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
      </div>

      <Field id="subject" label="Subject">
        <input id="subject" name="subject" type="text" required className={fieldClass} />
      </Field>

      <Field id="message" label="Message">
        <textarea id="message" name="message" rows={5} required className={`resize-y ${fieldClass}`} />
      </Field>

      {error ? (
        <p className="border-l-2 border-red-400 pl-4 text-sm text-red-700">{error}</p>
      ) : null}

      <SubmitBar pending={sending} idle="Send message" busy="Sending…" />
    </form>
  );
}
