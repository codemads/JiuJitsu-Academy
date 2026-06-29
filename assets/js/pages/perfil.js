import { verificarSessao, logout } from '../services/auth.js';
import { carregarPerfil, salvarPerfil,} from '../services/profileService.js';
import { renderizarPerfil } from '../components/perfilView.js';
import { showToast } from '../components/toast.js';
import { inicializarModal } from '../components/modal.js';
import { inicializarAvatar } from '../components/avatar.js';


document.addEventListener('DOMContentLoaded', async () => {
  const usuario = await verificarSessao('aluno');

if (!usuario) {
    window.location.replace('/pages/erros/403.html');
    return;
}

document.body.classList.remove('hidden');
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