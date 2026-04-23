/*  B"H
 */

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SECRET_KEY || ""

export function connect() {
    return createClient(supabaseUrl, supabaseKey)
}
