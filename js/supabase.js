const supabaseUrl = 'SUA_URL';
const supabaseKey = 'SUA_ANON_KEY';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

export { supabase };
