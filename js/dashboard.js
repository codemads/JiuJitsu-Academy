async function verificarSessao() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    window.location.href = 'index.html';
    return;
  }
}

async function carregarPerfil() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.error('Erro ao carregar perfil:', error);
    return null;
  }

  return data;
}

function renderizarPerfil(perfil) {
  const nomeUsuario = document.getElementById('nomeUsuario');

  const nome = document.getElementById('nome');

  const telefone = document.getElementById('telefone');

  const avatar = document.getElementById('avatarUsuario');

  if (nomeUsuario) {
    nomeUsuario.textContent = perfil.nome;
  }

  if (nome) {
    nome.value = perfil.nome || '';
  }

  if (telefone) {
    telefone.value = perfil.telefone || '';
  }

  if (avatar && perfil.avatar_url) {
    avatar.src = perfil.avatar_url;
  }
}

async function salvarPerfil() {
  const nome = document.getElementById('nome').value;

  const telefone = document.getElementById('telefone').value;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
    .from('profiles')
    .update({
      nome,
      telefone,
    })
    .eq('id', user.id);

  if (error) {
    console.error('Erro ao atualizar perfil:', error);
    alert('Erro ao atualizar perfil.');
    return;
  }

  document.getElementById('nomeUsuario').textContent = nome;

  alert('Perfil atualizado com sucesso!');
}

async function uploadAvatar(file) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nomeArquivo = `${user.id}-${Date.now()}`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(nomeArquivo, file, {
      upsert: true,
    });

  if (uploadError) {
    console.error(uploadError);
    alert('Erro ao enviar imagem.');
    return;
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(nomeArquivo);

  const avatarUrl = data.publicUrl;

  const { error: updateError } = await supabase
    .from('profiles')
    .update({
      avatar_url: avatarUrl,
    })
    .eq('id', user.id);

  if (updateError) {
    console.error(updateError);
    return;
  }

  document.getElementById('avatarUsuario').src = avatarUrl;
}

async function logout() {
  await supabase.auth.signOut();

  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', async () => {
  await verificarSessao();

  const perfil = await carregarPerfil();

  if (perfil) {
    renderizarPerfil(perfil);
  }

  const formPerfil = document.getElementById('formPerfil');

  if (formPerfil) {
    formPerfil.addEventListener('submit', async (e) => {
      e.preventDefault();
      await salvarPerfil();
    });
  }

  const avatarInput = document.getElementById('avatarInput');

  if (avatarInput) {
    avatarInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (!file) return;

      document.getElementById('avatarUsuario').src = URL.createObjectURL(file);

      await uploadAvatar(file);
    });
  }

  const btnLogout = document.getElementById('btnLogout');

  if (btnLogout) {
    btnLogout.addEventListener('click', logout);
  }
});
