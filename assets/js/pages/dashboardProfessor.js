
import { verificarSessao, logout }

from '../services/auth.js';
import { listarAlunos } from '../services/professorService.js';
const alunos = await listarAlunos();
renderizarAlunos(alunos);



function renderizarAlunos(alunos) {
  document.getElementById('totalAlunos').textContent =
  alunos.length;
  
  const tbody =
    document.getElementById('listaAlunos');

  tbody.innerHTML = '';

  alunos.forEach((aluno) => {
    tbody.innerHTML += `
      <tr class="border-b border-slate-800">
        <td class="py-3">${aluno.nome}</td>
        <td>${aluno.faixa || '-'}</td>
        <td>${aluno.status_matricula || '-'}</td>
        <td>
          <button
            class="text-blue-400">
            Editar
          </button>
        </td>
      </tr>
    `;
  });
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

  }
);