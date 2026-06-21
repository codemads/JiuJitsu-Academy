import { verificarSessao} from '../services/auth.js';
import {buscarAlunoPorId} from '../services/professorService.js';

document.addEventListener('DOMContentLoaded', async () => {

  await verificarSessao();

  const alunoId =
    new URLSearchParams(location.search)
      .get('id');


  if (!alunoId) {
    location.replace('dashboard-professor.html');
    return;
  }

  const aluno =
    await buscarAlunoPorId(alunoId);

  if (!aluno) {
    location.replace('dashboard-professor.html');
    return;
  }

  preencherFormulario(aluno);

});

function preencherFormulario(aluno) {
  document.getElementById('nome').value =
    aluno.nome || '';

  document.getElementById('email').value =
    aluno.email || '';

  document.getElementById('celular').value =
    aluno.telefone || '';

  document.getElementById('dataNasc').value = 
    aluno.data_nascimento || '';

  document.getElementById('faixa').value =
    aluno.faixa || '';

  document.getElementById('status').value =
    aluno.status_matricula || '';

document.getElementById('dataMatricula').value =
  aluno.created_at
    ? new Date(aluno.created_at)
        .toLocaleDateString('pt-BR')
    : '';

}