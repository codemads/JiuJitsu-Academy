import { supabaseClient } from '../config/supabase.js';
export async function listarAlunos(pagina = 1) {
  const limite = 10;
  const inicio = (pagina - 1) * limite;
  const fim = inicio + limite - 1;

  const { data, error, count } = await supabaseClient
    .from('profiles')
    .select(
      'id, nome, faixa, status_matricula',
      { count: 'exact' }
    )
    .eq('role', 'aluno')
    .range(inicio, fim);

  if (error) {
    console.error(error);
    return {
      alunos: [],
      total: 0
    };
  }

  return {
    alunos: data,
    total: count
  };
}