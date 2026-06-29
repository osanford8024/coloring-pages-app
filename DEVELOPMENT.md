# Development Notes

## Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill in the production service keys from your hosted project:

   ```bash
   cp .env.example .env.local
   ```

3. Start the local app:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Required Environment Variables

- `NEXT_PUBLIC_SITE_URL`: Local or deployed site URL. Use `http://localhost:3000` for local development.
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anon key used by client-safe requests.
- `SUPABASE_SERVICE_ROLE_KEY`: Supabase service role key used by server-side image uploads and database inserts.
- `OPENAI_API_KEY`: OpenAI API key used for categorization and image generation.
- `STRIPE_SECRET_KEY`: Stripe secret key used for checkout and paid download confirmation.

## Fresh Supabase Setup

Use this when replacing a paused or broken Supabase project.

1. Create a new Supabase project.
2. Open the new project's SQL editor.
3. Run the full contents of `supabase/setup.sql`.
4. Open Project Settings > API and copy these values into `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

5. Add the same values to the production host environment variables.
6. Restart the local dev server after changing `.env.local`.

The app expects:

- A public storage bucket named `coloring-pages`.
- A public table named `images`.
- Public read access for gallery images.
- Server-only writes through `SUPABASE_SERVICE_ROLE_KEY`.

## Current Restart Status

- `npm run build` passes.
- `npm run lint` passes with warnings only.
- The local `main` branch tracks `origin/main`.
- `MAINTENANCE_MODE` is currently set to `false` in `app/layout.tsx`.
- The paid download flow now includes API routes for Stripe checkout and download verification.
