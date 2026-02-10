# CMES

Discover your dream type across **Contribution**, **Mastery**, **Experience**, and **Stability** (CMES). Take a short assessment, see your profile, and get suggested platforms for further exploration.

## Tech stack

- **Next.js 15** (App Router)
- **Tailwind CSS 4**
- **Supabase** (Auth + Postgres for optional sign-in and saved results)

## Getting started

### 1. Install and run (no Supabase)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You can take the quiz and see results without an account. Save and history require Supabase.

### 2. Supabase (optional sign-in and history)

1. Create a project at [supabase.com](https://supabase.com).
2. **Disable email verification** (so sign up/sign in work without confirmation emails):
   - In the dashboard go to **Authentication** → **Providers** → **Email**.
   - Turn **off** “Confirm email”.
   - This avoids using the built-in email service for verification and lets users sign up and sign in immediately.
3. Copy `.env.local.example` to `.env.local` and set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (Publishable key from API Keys tab)
   - `SUPABASE_SECRET_KEY` (optional, for server-only use)
4. **Create the `results` table** (pick one):
   - **Easier (CLI):** Install [Supabase CLI](https://supabase.com/docs/guides/cli), then from the project root run:
     ```bash
     npx supabase login
     npx supabase link --project-ref YOUR_PROJECT_REF
     npx supabase db push
     ```
     (`YOUR_PROJECT_REF` is in the project URL: `https://app.supabase.com/project/YOUR_PROJECT_REF`)
   - **Manual:** In the Supabase dashboard → **SQL Editor**, run the contents of `supabase/migrations/001_create_results.sql`.
5. Restart the dev server. Sign up and sign in work without email verification.

## Project structure

- `app/` — Pages: landing, quiz, result, history, login, signup
- `components/` — Layout, quiz UI, result profile, auth nav, save button
- `lib/` — CMES types/scoring, questions config, suggested platforms, Supabase client
- `supabase/migrations/` — SQL for `results` table and RLS

## Customization

- **Questions**: Edit `lib/questions.ts` (text and dimension weights).
- **Suggested platforms**: Edit `lib/suggestedPlatforms.ts` (labels and URLs per type).
