/*  B"H
 */

import { createClient, SupabaseClient } from "@supabase/supabase-js"

export function connect() {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SECRET_KEY

    if (!supabaseUrl || !supabaseKey) {
        throw new Error(
            "Supabase URL and key must be set in environment variables",
        )
    }

    return createClient(supabaseUrl, supabaseKey)
}
