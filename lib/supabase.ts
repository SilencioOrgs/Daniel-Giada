import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

// ============================================
// SUPABASE CLIENT (anon key — client-side safe)
// ============================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let client: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
    client = createClient(supabaseUrl, supabaseAnonKey);
}

const missingVars = [
    !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
    !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null,
].filter(Boolean) as string[];

const setupError = `Missing Supabase env var(s): ${missingVars.join(", ")}. Add them to .env.local (copy from .env.example).`;

function getClient(): SupabaseClient {
    if (!client) {
        throw new Error(setupError);
    }
    return client;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
    get(_target, prop, receiver) {
        return Reflect.get(getClient(), prop, receiver);
    },
});
