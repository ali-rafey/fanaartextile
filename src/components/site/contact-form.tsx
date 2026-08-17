"use client";

import { useState } from "react";

const field =
  "w-full rounded-2xl border border-ink/12 bg-ivory px-4 py-3 text-ink placeholder:text-stone-400 " +
  "transition-colors focus:border-clay focus:ring-2 focus:ring-clay/30 focus:outline-none";
const label = "block text-xs uppercase tracking-[0.18em] text-ink/60";

/**
 * Contact form — front-end only for now. Validation and the acknowledgement
 * state run entirely in the browser; nothing is sent yet. Wire the submit to a
 * server action / API route when the Supabase integration lands (see CLAUDE.md
 * roadmap) and swap the simulated success for the real response.
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
      <div
        role="status"
        className="flex h-full flex-col items-center justify-center rounded-3xl bg-ivory p-10 text-center shadow-sm ring-1 ring-ink/5"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl text-ink">Message received</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-stone-600">
          Thank you for reaching out. We read every note and will be in touch
          soon.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-sm font-medium tracking-wide text-clay transition-colors hover:text-clay-deep"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-ivory p-6 shadow-sm ring-1 ring-ink/5 md:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={`mt-2 ${field}`} />
        </div>
        <div>
          <label htmlFor="email" className={label}>
            Email
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" className={`mt-2 ${field}`} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className={label}>
          Subject
        </label>
        <input id="subject" name="subject" type="text" required className={`mt-2 ${field}`} />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className={label}>
          Message
        </label>
        <textarea id="message" name="message" rows={5} required className={`mt-2 resize-y ${field}`} />
      </div>

      {error ? (
        <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-clay-deep focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ivory focus-visible:outline-none disabled:opacity-60 sm:w-auto"
      >
        {sending ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
