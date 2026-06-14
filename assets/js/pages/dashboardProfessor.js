
import { verificarSessao, logout }from '../services/auth.js';
import { listarAlunos } from '../services/professorService.js';
import { inicializarModal } from '../components/modal.js';

function renderizarAlunos(alunos) {
  
  document.getElementById('totalAlunos').textContent =
  alunos.length;

    const totalAtivos = alunos.filter(
    aluno => aluno.status_matricula === 'Ativa'
  ).length;

  document.getElementById('matriculasAtivas').textContent =
    totalAtivos;
  
  const tbody =
    document.getElementById('listaAlunos');

  tbody.innerHTML = '';
     

  alunos.forEach((aluno) => {

    tbody.innerHTML += `
      <tr class="border-b border-slate-800">
         <td class="px-6 py-4 font-medium">
${aluno.nome}</td>
          <td class="px-6 py-4 font-medium">
${aluno.faixa || '-'}</td>
          <td class="px-6 py-4 font-medium">
${aluno.status_matricula || '-'}</td>
          <td class="px-6 py-4 font-medium">

          <button
            class="text-blue-400">
            Editar
          </button>
        </td>
      </tr>
    `;
  });

  
}

document
  .getElementById('btnNovoAluno')
  ?.addEventListener('click', () => {

    document
      .getElementById('modalAluno')
      .classList.remove('hidden');

  });
  document
  .getElementById('fecharModal')
  ?.addEventListener('click', fecharModal);

function fecharModal() {
  document
    .getElementById('modalAluno')
    .classList.add('hidden');
}

document.addEventListener(
  'DOMContentLoaded',
  
  async () => {

    await verificarSessao();
   const alunos =
      await listarAlunos();
   renderizarAlunos(alunos);

    document
      .getElementById('btnLogout')
      ?.addEventListener(
        'click',
        logout
      );
      
      
inicializarModal(
  'modalAluno',
  'btnNovoAluno',
  'fecharModal'
);
  }
);