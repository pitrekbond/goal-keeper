import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://cekgjvejwnvnukcgsups.supabase.co";
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNla2dqdmVqd252bnVrY2dzdXBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwMDIyMjcsImV4cCI6MjA0NjU3ODIyN30.nOjjuME1GCxdaqXNhChqb-KJtMzz6VuSzQQckTGlFBQ`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
