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
- `STRIPE_SECRET_KEY`: Stripe secret key used for checkout before image generation.

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
- A server-side table named `generation_jobs` for paid, no-login generation sessions.
- Public read access for gallery images.
- Server-only writes through `SUPABASE_SERVICE_ROLE_KEY`.


## Paid Generation Flow

The no-login paid generation flow works like this:

1. User enters a prompt on `/generate`.
2. The app creates a Stripe Checkout session through `/api/stripe/create-generation-checkout`.
3. Stripe stores the prompt in session metadata.
4. After payment, Stripe redirects to `/generate/complete?session_id=...`.
5. The completion page calls `/api/generation-jobs/start`.
6. The server verifies the Stripe session is paid, creates or resumes a `generation_jobs` row, generates the image, uploads it to Supabase Storage, saves the public gallery row, and returns the image URL.

The `session_id` is the temporary secure claim token, so users can refresh the completion page without needing an account.
## Current Restart Status

- `npm run build` passes.
- `npm run lint` passes with warnings only.
- The local `main` branch tracks `origin/main`.
- `MAINTENANCE_MODE` is currently set to `true` in `app/layout.tsx`.
- The generator uses Stripe checkout before image generation. The Stripe session ID acts as the temporary claim token, so no login system is required.

