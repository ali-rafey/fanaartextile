# Fanaar

Storefront + admin portal for **Fanaar**, a premium lounge-fabric brand.

## Stack

- **Next.js 16** (App Router, TypeScript, React 19)
- **Tailwind CSS v4**
- **Supabase** (storage / database / auth) — wired up, activated once project keys are provided

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

- `/` — public site (full-screen hero video)
- `/admin` — admin portal (⚠️ no auth yet — see roadmap)
- `/admin/hero` — upload / replace / remove the homepage hero video

## Project structure

```
src/
  app/
    page.tsx                        # Homepage (hero + process section)
    admin/                          # Admin portal
      page.tsx                      #   Dashboard
      hero/page.tsx                 #   Hero video management
    api/
      admin/hero-video/route.ts     # GET/POST/DELETE hero video (admin)
      hero-video/[filename]/route.ts# Streams local video w/ Range support
  components/
    site/                           # Public site components (hero, process)
    admin/                          # Admin components (sidebar, uploader)
  content/                          # Landing-page copy, nav items, image slots
    process.ts                      #   process section
    categories.ts                   #   category cards
    navigation.ts                   #   navbar links
  lib/
    constants.ts                    # Upload limits, allowed types, helpers
    storage/                        # ← media storage abstraction
      types.ts                      #   StorageDriver interface
      local.ts                      #   filesystem driver (default)
      supabase.ts                   #   Supabase driver (ready, needs keys)
    supabase/                       # Supabase clients (browser/server/admin)
public/
  images/process/                   # The four process photos land here
supabase/
  schema.sql                        # Run once when integrating Supabase
var/                                # gitignored — local uploads + manifests
```

## How the hero video works

1. Admin uploads a video at `/admin/hero` (drag & drop or file picker, with progress).
2. `POST /api/admin/hero-video` validates it (MP4/WebM/OGV/MOV, ≤ 200MB — see
   `src/lib/constants.ts`) and hands it to the active **storage driver**.
3. The homepage hero (`src/components/site/hero.tsx`) reads the current video
   from the same driver and plays it full-screen (autoplay, muted, looped).
   `revalidatePath("/")` keeps the statically rendered homepage fresh.

Storage is abstracted behind `StorageDriver` (`src/lib/storage`). The app never
knows where files live:

| `STORAGE_DRIVER` | Files                         | Metadata                     |
| ---------------- | ----------------------------- | ---------------------------- |
| `local` (default)| `var/uploads/hero/`           | `var/data/hero-video.json`   |
| `supabase`       | `site-assets` storage bucket  | `site_settings` table        |

## Integrating Supabase (when the project is created)

1. `cp .env.example .env.local` and fill in `NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
2. Run `supabase/schema.sql` in the Supabase SQL editor (creates the
   `site_settings` table + public `site-assets` bucket).
3. Set `STORAGE_DRIVER=supabase` in `.env.local` and restart. Done — uploads
   now go to Supabase storage and the video streams from the Supabase CDN.

## Roadmap

- [x] Homepage hero section (video)
- [x] Homepage process section — sourcing, lab testing, production,
      feedback & value return (owner's four photos pending)
- [x] Homepage category cards + transparent hero navbar (logo image and
      real category pages pending)
- [x] Admin: upload / replace / remove hero video
- [x] Supabase-ready storage layer + schema
- [ ] Supabase integration (keys pending)
- [ ] **Admin authentication (Supabase Auth) — required before any public deploy**
- [ ] Products & categories
- [ ] Blogs
- [ ] Customer feedback
- [ ] Direct-to-Supabase uploads (signed URLs) so large videos skip the Next server

> ⚠️ **Security note:** `/admin` and its API are currently unauthenticated by
> design (auth lands with Supabase). Keep the app local until then.
