"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirected here after signing in with an account that isn't on the
  // ADMIN_EMAILS allowlist (or the allowlist is unset on the host).
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("error") === "forbidden") {
      setError("This account isn't authorised for the admin portal.");
    }
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabaseBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      // Session cookie is now set. Use a HARD navigation (full reload) rather
      // than a client-side route change: on hosts like Vercel a soft navigation
      // can race the freshly-written auth cookie, leaving /admin stuck. A full
      // load guarantees middleware + the server layout see the session.
      window.location.assign("/admin");
    } catch {
      // Thrown when Supabase env vars are missing on the host (build-time
      // NEXT_PUBLIC_* not set). Surface it instead of failing silently.
      setError(
        "Sign-in is unavailable — the server is missing its Supabase configuration."
      );
      setLoading(false);
    }
  }

  const field =
    "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-clay focus:ring-2 focus:ring-clay/25";

  return (
    <div className="flex min-h-svh items-center justify-center bg-stone-100 px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="font-display text-2xl tracking-[0.3em] text-ink">FANAAR</span>
          <p className="mt-1 text-[11px] uppercase tracking-widest text-stone-500">
            Admin portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <h1 className="text-lg font-semibold text-ink">Sign in</h1>
          <p className="mt-1 text-sm text-stone-500">Authorised administrators only.</p>

          <label htmlFor="email" className="mt-6 block text-xs font-medium text-stone-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1.5 ${field}`}
          />

          <label htmlFor="password" className="mt-4 block text-xs font-medium text-stone-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1.5 ${field}`}
          />

          {error ? (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-ivory transition-colors hover:bg-clay-deep disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-stone-500">
          <a href="/" className="transition-colors hover:text-ink">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
