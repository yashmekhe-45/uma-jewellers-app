import {createClient} from '@supabase/supabase-js';

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) {
    console.warn('Supabase environment variables are not set.');
  }
  return createClient(url || 'http://localhost', anon || 'public-anon-key');
}