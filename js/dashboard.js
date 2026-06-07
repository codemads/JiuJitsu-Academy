async function verificarSessao() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = 'index.html';
    return;
  }
}

//Toast

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  const toast = document.createElement('div');

  toast.className = `
    ${colors[type] || colors.info}
    text-white px-4 py-3 rounded-lg shadow-lg
    min-w-[220px] max-w-[280px]
    transform transition-all duration-300
    translate-x-0 opacity-100
  `;

  toast.innerText = message;

  container.appendChild(toast);

  // anima saída
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-10');

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
async function carregarPerfil() {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data, error } = await supabaseClient
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
  const emailUsuario = document.getElementById('emailUsuario');

  const nome = document.getElementById('nome');

  const telefone = document.getElementById('telefone');

  const avatar = document.getElementById('avatarUsuario');

  if (nomeUsuario) {
    const modal = document.getElementById('modalPerfil');
    const btnEditar = document.getElementById('btnEditar');
    const btnFechar = document.getElementById('fecharModal');

    // abrir modal
    btnEditar?.addEventListener('click', () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    });

    // fechar modal (X)
    btnFechar?.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });

    // fechar clicando fora
    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
    nomeUsuario.textContent = perfil.nome;
  }
  if (emailUsuario) {
    emailUsuario.textContent = perfil.email;
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
  document.getElementById('avatarUsuario')?.addEventListener('click', () => {
    document.getElementById('avatarInput')?.click();
  });
  document
    .getElementById('avatarInput')
    ?.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (!file) return;

      // preview instantâneo
      document.getElementById('avatarUsuario').src = URL.createObjectURL(file);

      // upload pro supabase
      await uploadAvatar(file);
    });
}

async function salvarPerfil() {
  const nome = document.getElementById('nome').value;

  const telefone = document.getElementById('telefone').value;

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { error } = await supabaseClient
    .from('profiles')
    .update({
      nome,
      telefone,
    })
    .eq('id', user.id);

  if (error) {
    console.error('Erro ao atualizar perfil:', error);
    // alert('Erro ao atualizar perfil.');
    showToast('Erro ao atualizar perfil.', 'error');
    return;
  }

  document.getElementById('nomeUsuario').textContent = nome;

  //alert('Perfil atualizado com sucesso!');
  showToast('Perfil atualizado com sucesso!', 'success');
}

async function uploadAvatar(file) {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const nomeArquivo = `${user.id}-${Date.now()}`;

  const { error: uploadError } = await supabaseClient.storage
    .from('avatars')
    .upload(nomeArquivo, file, {
      upsert: true,
    });

  if (uploadError) {
    console.error(uploadError);
    //alert('Erro ao enviar imagem.');
    showToast('Erro ao enviar imagem.', 'error');

    return;
  }

  const { data } = supabaseClient.storage
    .from('avatars')
    .getPublicUrl(nomeArquivo);

  const avatarUrl = data.publicUrl;

  const { error: updateError } = await supabaseClient
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
  await supabaseClient.auth.signOut();

  window.location.href = '../index.html';
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
