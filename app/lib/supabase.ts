import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

let supabaseClient;
try {
  supabaseClient = createClient(url, key);
} catch (e) {
  console.warn("Supabase initialization error during build; using dummy client.");
  supabaseClient = {
    auth: { getSession: async () => ({ data: { session: null } }) },
    from: () => ({ select: () => ({ data: [], error: null }) })
  } as any;
}

export const supabase = supabaseClient;
