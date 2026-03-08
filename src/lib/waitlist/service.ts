import { createClient } from '@supabase/supabase-js';

type WaitlistInsert = {
  email: string;
  name?: string;
  role?: string;
  source?: string;
  note?: string;
  phone?: string;
  countryCode?: string;
  metadata?: Record<string, string | null>;
};

export async function insertWaitlistEntry(input: WaitlistInsert) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from('waitlist_entries').insert({
    email: input.email,
    name: input.name ?? null,
    role: input.role ?? null,
    note: input.note ?? null,
    phone: input.phone ?? null,
    country_code: input.countryCode ?? null,
    source: input.source ?? 'landing',
    metadata: input.metadata ?? null,
  });

  if (!error) return { created: true as const };

  if (error.code === '23505') {
    return { created: false as const, duplicate: true as const };
  }

  throw new Error(error.message);
}
