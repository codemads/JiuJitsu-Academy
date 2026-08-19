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
// alunos cadastrados
export async function listarAlunosCadastrados() {
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('id, nome')
    .eq('role', 'aluno')
    .order('nome');

  if (error) {
    console.error('Erro ao listar alunos:', error);
    throw error;
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
    

  if (error){ console.error(error)
    throw error
  }
 
}

export async function listarTurmas() {
  const { data, error } = await supabaseClient
    .from('turmas')
    .select('id, nome')
    .order('nome');

  if (error) {
   console.error(error)

    throw error;
  }

  return data;
}

export async function listarAulas() {
  const { data, error } = await supabaseClient
    .from('aulas')
    .select('id, titulo')
    .order('titulo');

  if (error) {
   console.error(error)

    throw error;
  }

  return data;
}

export async function criaAula(dados) {

  const {data: usuario, error} = await supabaseClient.auth.getUser();

if(error){
  console.error(error)
  throw error
  
}
if(!usuario.user){
console.error(error)

  return;

}

const {data, error:dadosUser} = await supabaseClient
  .from('aulas')
  .insert({

 professor_id: usuario.user.id,
 titulo: dados.titulo,
 descricao: dados.descricao,
 turma_id: dados.turma,
 horario_inicio: dados.horario_inicio,
 horario_fim: dados.horario_fim,
 status: dados.status,

})
      
      .select();

  if(dadosUser){

    console.error(dadosUser);
   

    throw dadosUser;

  }


  return data;

}

export async function registrarPresenca(alunoId, aulaId) {

  const { data, error } = await supabaseClient
    .from('presencas')
    .insert({
      aluno_id: alunoId,
      aula_id: aulaId,
      presente: true
    })
    .select()
    .single();

  if (error) {
    console.error('Erro ao registrar presença:', error);
    throw error;
  }

  return data;
}