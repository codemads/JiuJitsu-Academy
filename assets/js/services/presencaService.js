import { supabase } from '../config/supabase.js';

export async function registrarPresenca({
  aulaId,
  alunoId,
  presente = true
}) {
  const { data, error } = await supabase
    .from('presencas')
    .insert({
      aula_id: aulaId,
      aluno_id: alunoId,
      presente
    })
    .select();

  if (error) throw error;

  return data;
}