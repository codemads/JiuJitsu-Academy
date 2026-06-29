import { supabaseClient } from '../config/supabase.js';

export async function verificarSessao(rolePermitido = null) {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();

    

    const { data: perfil } = await supabaseClient
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

 

    if (perfil.role !== rolePermitido) {
      
        return null;
    }


    return { session, perfil };
}


export async function cadastrarUsuario(dados) {

  if (dados.senha !== dados.confirmarSenha) {
    throw new Error(
      'As senhas não coincidem.'
    );
  }

  const { data, error } =
    await supabaseClient.auth.signUp({
      email: dados.email,
      password: dados.senha,
    });

  if (error) {
    throw error;
  }

  const { error: profileError } =
    await supabaseClient
      .from('profiles')
      .insert({
        id: data.user.id,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        data_nascimento:
          dados.dataNascimento,
        faixa: dados.faixa,
        status_matricula: 'Ativa',
      });

  if (profileError) {
    throw profileError;
  }

  return data;
}

export async function logout() {
  await supabaseClient.auth.signOut();

  window.location.href = '../index.html';
}