// Supabase Client Configuration
// For production on Vercel: these will come from environment variables injected at build/runtime
// For local development we hardcode the public anon values (safe to expose)

const SUPABASE_URL = 'https://xctkmaxffamccaxreqam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdGttYXhmZmFtY2NheHJlcWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NzA2MzYsImV4cCI6MjEwNzU0NjYzNn0.KdIWMWBqLIgirZWwtvM44wUI0jFHOIV0_i0g1nxO3x8';

// Create the Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for use in other scripts
window.supabaseClient = supabase;
