# Content Dashboard (Sanity) — Activation

The site ships with an editing dashboard at **`/studio`** so the client can change
photos, text, and travel dates without touching code. Until it's connected, the
site shows its built-in default content — so nothing breaks in the meantime.

Editable today: **About / Philosophy / Sidenote text**, **Availability** (dates,
style, studio, deposit, pricing), **Travel Dates**, **Portfolio photos**, and
**Testimonials**. (More sections can be added the same way — see the bottom.)

## One-time setup (~5 minutes)

### 1. Create a free Sanity project
- Sign up at <https://www.sanity.io> (free plan is plenty).
- Go to <https://www.sanity.io/manage> → **Create project**.
- Name it (e.g. "Josh Swid"), keep the dataset named **`production`**.
- Copy the **Project ID** (looks like `a1b2c3d4`).

### 2. Add the two environment variables
**Locally** — create a file named `.env.local` in the project root:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

**On Vercel** — Project → **Settings → Environment Variables** → add the same two
(for Production + Preview), then **redeploy**.

### 3. Allow the site to read from Sanity (CORS)
In <https://www.sanity.io/manage> → your project → **API → CORS origins → Add**:
- `http://localhost:3000` (with credentials) — for local editing
- your live URL, e.g. `https://joshswid.com` (with credentials)

## Using it
- Visit **`/studio`** on your site (e.g. `https://joshswid.com/studio`), log in
  with the Sanity account, and edit.
- **Site Settings** holds the About/Philosophy/Sidenote text and the Availability
  block. **Travel Dates**, **Portfolio Pieces**, and **Testimonials** are lists —
  add/reorder/delete entries freely (the `Order` field controls sequence).
- Changes appear on the live site within ~60 seconds.

## Notes
- No Sanity? The site keeps working on the defaults baked into
  `lib/content-types.ts`.
- To make another section editable, add a schema in `sanity/schemaTypes/`,
  register it in `sanity/schemaTypes/index.ts`, add a getter in `lib/content.ts`,
  and pass it as a prop in `app/page.tsx` — same pattern as the existing ones.
