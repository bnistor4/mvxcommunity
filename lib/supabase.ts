import { createClient } from "@supabase/supabase-js"
import type { Database } from "../types/supabase"

// Use environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-url.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
