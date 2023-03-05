import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPERBASE_URL
const supabaseAnonKey = process.env.VITE_SUPERBASE_API_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)