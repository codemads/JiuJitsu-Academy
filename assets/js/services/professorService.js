import { supabaseClient } from '../config/supabase.js';
import { showToast } from '../components/toast.js';

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

export async function buscarAlunoPorId(id) {

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

//atualizar cadastro do aluno 
export async function atualizarAluno(id, dados) {

  const { data, error } = await supabaseClient
    .from('profiles')
    .update(dados)
    .eq('id', id)
    .select()
    

  if (error){ showToast(
    'Não foi possivel ataulizar o cadastro, revise os dados e tente novamente',
    'error'); 
    
    throw error
  }
  showToast('Cadastro atualizado com sucesso!','sucess');

}