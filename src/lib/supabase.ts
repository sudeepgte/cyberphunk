import { createClient } from "@supabase/supabase-js";

// Use environment variables, fallback to placeholders to prevent crashes during setup
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Initialize the client
// This will not throw an error even with placeholder values, 
// but requests will fail until real keys are provided.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
