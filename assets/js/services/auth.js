import { supabaseClient } from '../config/supabase.js';

export async function verificarSessao() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = 'index.html';
    return false;
  }

  return true;
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