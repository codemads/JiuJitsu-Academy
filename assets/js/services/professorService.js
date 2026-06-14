import { supabaseClient } from '../config/supabase.js';

export async function listarAlunos() {
  const { data, error } = await supabaseClient
    .from('profiles').
    select('id, nome, faixa, status_matricula')
    .eq('role', 'aluno');
  if (error) throw error;
  return data;
}