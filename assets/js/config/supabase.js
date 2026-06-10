const supabaseUrl = 'https://kmyxiedfzpsllycqjpfa.supabase.co';

const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtteXhpZWRmenBzbGx5Y3FqcGZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3NzY0MjEsImV4cCI6MjA5NjM1MjQyMX0.dZfOh0FuAUhkqyCPfDsxxozphuYPiV3xf4bTHEdzlK8';

export const supabaseClient =  window.supabase.createClient(supabaseUrl, supabaseKey);
