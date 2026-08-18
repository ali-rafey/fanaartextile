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
    "w-full rounded-2xl bg-neutral-100 px-4 py-3 text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-900";

  return (
    <div className="flex min-h-svh items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <span className="font-display text-2xl tracking-[0.3em] text-neutral-900">FANAAR</span>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-neutral-400">
            Admin portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl bg-neutral-50 p-7"
        >
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">Sign in</h1>
          <p className="mt-1 text-sm text-neutral-500">Authorised administrators only.</p>

          <label htmlFor="email" className="mt-6 block text-xs font-semibold text-neutral-600">
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

          <label htmlFor="password" className="mt-4 block text-xs font-semibold text-neutral-600">
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
            <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-neutral-500">
          <a href="/" className="font-semibold transition-colors hover:text-neutral-900">
            ← Back to site
          </a>
        </p>
      </div>
    </div>
  );
}
