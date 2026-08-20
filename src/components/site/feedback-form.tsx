"use client";

import { useState } from "react";
import { Field, SubmitBar, fieldClass, labelClass } from "./form-field";

const TOPICS = ["Fabric quality", "Loungewear fit", "Service", "Website", "Other"];
const RATINGS = [1, 2, 3, 4, 5];

/**
 * Feedback form — same hairline treatment as the contact form, with the rating
 * set as a row of numerals rather than stars so it stays in the site's
 * typographic language. Submissions land in the admin inbox.
 */
export default function FeedbackForm() {
  const [sent, setSent] = useState(false);
  const [rating, setRating] = useState(0);
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
          kind: "feedback",
          name: data.get("name"),
          email: data.get("email"),
          topic: data.get("category"),
          rating: rating || null,
          message: data.get("message"),
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not send your feedback.");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send your feedback.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div role="status" className="border-t border-ink/20 pt-10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-clay">
          Feedback received
        </p>
        <p className="mt-5 max-w-lg font-display text-2xl leading-snug tracking-tight text-ink md:text-3xl">
          Thank you. What you told us goes straight into how the next run is
          sourced, tested and finished.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setRating(0);
          }}
          className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ink/50 transition-colors duration-300 ease-lux hover:text-clay"
        >
          Share more feedback
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="fb-name" label="Name">
          <input id="fb-name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </Field>
        <Field id="fb-email" label="Email">
          <input id="fb-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
        </Field>
      </div>

      <Field id="fb-category" label="What is this about?">
        <select id="fb-category" name="category" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Choose a topic
          </option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </Field>

      {/* Rating as numerals — a scale, set in type */}
      <fieldset>
        <legend className={labelClass}>How was your experience?</legend>
        <div className="mt-4 flex items-center gap-2">
          {RATINGS.map((value) => {
            const active = rating >= value;
            return (
              <label
                key={value}
                className={`flex h-11 w-11 cursor-pointer items-center justify-center border font-mono text-xs transition-colors duration-300 ease-lux ${
                  active
                    ? "border-ink bg-ink text-ivory"
                    : "border-ink/20 text-ink/50 hover:border-ink/50"
                }`}
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                  className="sr-only"
                />
                <span className="sr-only">
                  {value} out of 5
                </span>
                <span aria-hidden>{value}</span>
              </label>
            );
          })}
          <span className="ml-3 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ink/35">
            {rating ? `${rating} / 5` : "Optional"}
          </span>
        </div>
      </fieldset>

      <Field id="fb-message" label="Your feedback">
        <textarea id="fb-message" name="message" rows={5} required className={`resize-y ${fieldClass}`} />
      </Field>

      {error ? (
        <p className="border-l-2 border-red-400 pl-4 text-sm text-red-700">{error}</p>
      ) : null}

      <SubmitBar pending={sending} idle="Submit feedback" busy="Sending…" />
    </form>
  );
}
