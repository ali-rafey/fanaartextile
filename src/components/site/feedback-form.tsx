"use client";

import { useState } from "react";

const field =
  "w-full rounded-2xl border border-ink/12 bg-ivory px-4 py-3 text-ink placeholder:text-stone-400 " +
  "transition-colors focus:border-clay focus:ring-2 focus:ring-clay/30 focus:outline-none";
const label = "block text-xs uppercase tracking-[0.18em] text-ink/60";

const CATEGORIES = ["Fabric quality", "Loungewear fit", "Service", "Website", "Other"];
const RATINGS = [1, 2, 3, 4, 5];

/**
 * Feedback form — front-end only for now, mirroring the contact form. Captures
 * a category, a star rating and a note; validation and the thank-you state run
 * in the browser and nothing is persisted yet. Wire to the backend (and route
 * feedback into the "value return" loop) once the Supabase integration lands.
 */
export default function FeedbackForm() {
  const [sent, setSent] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // TODO: replace with a real submission once the backend exists.
    setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center rounded-3xl bg-ivory p-10 text-center shadow-sm ring-1 ring-ink/5"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m5 13 4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-6 font-display text-2xl text-ink">Thank you</h3>
        <p className="mt-3 max-w-sm leading-relaxed text-stone-600">
          Your feedback goes straight into how we source, test and finish the
          next collection. We're grateful you took the time.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setRating(0);
          }}
          className="mt-8 text-sm font-medium tracking-wide text-clay transition-colors hover:text-clay-deep"
        >
          Share more feedback
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
          <label htmlFor="fb-name" className={label}>
            Name
          </label>
          <input id="fb-name" name="name" type="text" required autoComplete="name" className={`mt-2 ${field}`} />
        </div>
        <div>
          <label htmlFor="fb-email" className={label}>
            Email
          </label>
          <input id="fb-email" name="email" type="email" required autoComplete="email" className={`mt-2 ${field}`} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="fb-category" className={label}>
          What is this about?
        </label>
        <select id="fb-category" name="category" required defaultValue="" className={`mt-2 ${field}`}>
          <option value="" disabled>
            Choose a topic
          </option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <fieldset className="mt-6">
        <legend className={label}>How was your experience?</legend>
        <div className="mt-3 flex items-center gap-1.5" onMouseLeave={() => setHover(0)}>
          {RATINGS.map((value) => {
            const active = (hover || rating) >= value;
            return (
              <label
                key={value}
                onMouseEnter={() => setHover(value)}
                className="cursor-pointer p-1"
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                  className="sr-only"
                />
                <span className="sr-only">{value} star{value > 1 ? "s" : ""}</span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className={`h-8 w-8 transition-colors ${active ? "text-clay" : "text-ink/15"}`}
                  fill="currentColor"
                >
                  <path d="M12 2.5l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5-4.7-4.6 6.5-.9L12 2.5z" />
                </svg>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="fb-message" className={label}>
          Your feedback
        </label>
        <textarea id="fb-message" name="message" rows={5} required className={`mt-2 resize-y ${field}`} />
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-ink px-8 py-3.5 text-sm font-medium tracking-wide text-ivory transition-colors duration-300 hover:bg-clay-deep focus-visible:ring-2 focus-visible:ring-clay focus-visible:ring-offset-2 focus-visible:ring-offset-ivory focus-visible:outline-none sm:w-auto"
      >
        Submit feedback
      </button>
    </form>
  );
}
