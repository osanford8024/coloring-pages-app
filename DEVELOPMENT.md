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

## Current Restart Status

- `npm run build` passes.
- `npm run lint` passes with warnings only.
- The source folder is not currently a git clone; it appears to be a downloaded GitHub source export.
- `MAINTENANCE_MODE` is set to `true` in `app/layout.tsx`, so the app shows a maintenance screen until that is changed.
- The paid download flow now includes API routes for Stripe checkout and download verification.
