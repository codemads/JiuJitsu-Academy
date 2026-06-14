import { verificarSessao, logout } from '../services/auth.js';
import { carregarPerfil, salvarPerfil,} from '../services/porfileService.js';
import { showToast } from '../components/toast.js';
import { inicializarModal } from '../components/modal.js';
import { inicializarAvatar } from '../components/avatar.js';
 

function renderizarPerfil(perfil) {
  const primeiroNome =
    perfil.nome?.split(' ')[0] || '';

  document.getElementById('nomeUsuario').textContent =
    perfil.nome;

  document.getElementById('emailUsuario').textContent =
    perfil.email;

  document.getElementById('nome').value =
    perfil.nome || '';

  document.getElementById('nomeSaudacao').textContent =
    primeiroNome;

  document.getElementById('telefone').value =
    perfil.telefone || '';

  

  if (perfil.avatar_url) {
    document.getElementById('avatarUsuario').src =
      perfil.avatar_url;
  }



   // CARDS
  document.getElementById('statusMatricula').textContent =
    perfil.status_matricula || '-';

  document.getElementById('faixaAtual').textContent =
    perfil.faixa || '-';
}

document.addEventListener('DOMContentLoaded', async () => {
  await verificarSessao();
  const perfil = await carregarPerfil();

  renderizarPerfil(perfil);
  inicializarModal('modalPerfil','btnEditar','fecharModal');
  inicializarAvatar();


  document.getElementById('btnLogout')?.addEventListener('click', logout);
  document.getElementById('formPerfil')?.addEventListener('submit', async (e) => {
      e.preventDefault();
      try {await salvarPerfil(
          document.getElementById('nome').value,
          document.getElementById('telefone').value
        );

        showToast(
          'Perfil atualizado com sucesso!',
          'success'
        );
      } catch {
        showToast(
          'Erro ao atualizar perfil.',
          'error'
        );
      }
    });
});