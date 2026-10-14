// Supabase Client Configuration
// Hardcoded public anon key (safe to expose on frontend)

const SUPABASE_URL = 'https://xctkmaxffamccaxreqam.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjdGttYXhmZmFtY2NheHJlcWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTE5NzA2MzYsImV4cCI6MjEwNzU0NjYzNn0.KdIWMWBqLIgirZWwtvM44wUI0jFHOIV0_i0g1nxO3x8';

(function initSupabase() {
  // The CDN exposes the library as global "supabase"
  if (typeof window.supabase === 'undefined' || typeof window.supabase.createClient !== 'function') {
    console.error('Supabase library not loaded. Make sure the CDN script is included before this file.');
    window.supabaseClient = null;
    return;
  }

  try {
    window.supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully');
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    window.supabaseClient = null;
  }
})();
