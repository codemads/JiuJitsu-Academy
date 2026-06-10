import { supabaseClient } from '../config/supabase.js';

export async function carregarPerfil() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function salvarPerfil(nome, telefone) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return await supabaseClient
    .from('profiles')
    .update({
      nome,
      telefone,
    })
    .eq('id', user.id);
}

export async function uploadAvatar(file) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const nomeArquivo = `${user.id}-${Date.now()}`;

  await supabaseClient.storage
    .from('avatars')
    .upload(nomeArquivo, file, {
      upsert: true,
    });

  const { data } = supabaseClient.storage
    .from('avatars')
    .getPublicUrl(nomeArquivo);

  const avatarUrl = data.publicUrl;

  await supabaseClient
    .from('profiles')
    .update({
      avatar_url: avatarUrl,
    })
    .eq('id', user.id);

  return avatarUrl;
}