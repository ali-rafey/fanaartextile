# Fanaar — storefront + admin portal

Next.js 16 App Router · TypeScript · Tailwind v4 · React 19. Sells premium
lounge/loungewear fabric. Public site at `/`, admin portal at `/admin`.
Brand ambition: an emerging leader in global textiles — voice is premium,
confident, craft-led.

## Commands

- `npm run dev` / `npm run build` / `npm run start` / `npm run lint`

## Architecture rules

- **Media storage goes through `src/lib/storage` (`StorageDriver`)** — never
  touch the filesystem or Supabase storage directly from routes/components.
  Driver picked by `STORAGE_DRIVER` env: `local` (default, writes to `var/`)
  or `supabase` (needs keys in `.env.local` + `supabase/schema.sql` run once).
- Hero video: admin uploads via `POST /api/admin/hero-video`; local files are
  streamed with Range support from `/api/hero-video/[filename]`; homepage is
  static and refreshed with `revalidatePath("/")` after mutations.
- Supabase clients live in `src/lib/supabase/` (browser / server / admin).
  The admin (service-role) client is `server-only`.
- Brand palette is defined in `src/app/globals.css` (`@theme`): ivory, sand,
  ink, clay, clay-deep. Headline serif is Fraunces via the `font-display`
  utility (loaded with next/font in `app/layout.tsx`).
- Homepage section copy lives in `src/content/` (e.g. `process.ts`). Process
  photos go in `public/images/process/`; wire one in by setting that step's
  `image` path — placeholders render until then. Scroll-reveal animation is
  `src/components/site/reveal.tsx`.

## Project rules

- **Build ONLY what the owner explicitly asks for.** Roadmap (products &
  categories, blogs, feedback, auth) is placeholder-only until requested.
- Admin portal has NO auth yet — it arrives with the Supabase integration.
  Don't deploy publicly before that.
- Supabase project doesn't exist yet; owner will provide keys. Integration
  steps are in README → "Integrating Supabase".
