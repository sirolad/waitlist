# Awalingo Landing
A standalone landing + waitlist project for Awalingo.

## Run locally

1. Install dependencies:
   `npm install`
2. Configure environment:
   copy `.env.example` to `.env.local` and fill values.
3. Run dev server:
   `npm run dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables
Create `.env.local`:

`NEXT_PUBLIC_SUPABASE_URL=...`
`SUPABASE_SERVICE_ROLE_KEY=...`

## Waitlist table
Create the table in Supabase:

`create table if not exists public.waitlist_entries (
  id bigint generated always as identity primary key,
  email text not null unique,
  name text,
  role text,
  source text default 'landing',
  metadata jsonb,
  created_at timestamptz not null default now()
);`

## Deploy on Vercel (Hobby)
- Connect this repo/project to Vercel.
- Add the same environment variables in Project Settings.
- Add your custom domain and follow Vercel DNS instructions:
  - Apex domain uses A record to Vercel target.
  - Subdomain uses CNAME to Vercel target.
- Verify waitlist submission after deploy.

## Quality checks
- `npm run lint`
- `npm run build`
