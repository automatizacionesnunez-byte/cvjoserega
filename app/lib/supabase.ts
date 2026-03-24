import { createClient } from '@supabase/supabase-js';

// Usamos fallbacks para evitar errores durante el prerendering de Next.js (SSG)
// Es CRÍTICO configurar estas variables en el dashboard de despliegue (Vercel/Zeabur/etc.)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'no-key-provided';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
