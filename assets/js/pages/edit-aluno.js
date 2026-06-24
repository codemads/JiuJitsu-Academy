import { verificarSessao} from '../services/auth.js';
import {atualizarAluno, buscarAlunoPorId} from '../services/professorService.js';
import { showToast } from '../components/toast.js';

document.addEventListener('DOMContentLoaded', async () => {

  await verificarSessao();

  const alunoId = new URLSearchParams(location.search).get('id');


  if (!alunoId) { location.replace('dashboard-professor.html');
    return;
  }

  const aluno = await buscarAlunoPorId(alunoId);

  if (!aluno) { location.replace('dashboard-professor.html');
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

const form = document.getElementById('registerForm');
const alunoId = new URLSearchParams(location.search).get('id');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  const dados = Object.fromEntries(formData.entries());
  const alunoAtualizado = {
    ...dados,
    telefone: dados.celular,
    data_nascimento: dados.dataNasc,
    status_matricula: dados.status,
    nome: dados.nome
  };

  delete alunoAtualizado.celular;
  delete alunoAtualizado.dataNasc;
  delete alunoAtualizado.status;
  delete alunoAtualizado.nome;

  try {

    await atualizarAluno(alunoId, alunoAtualizado);

  }  catch (error) {
showToast('Não foi possivel ataulazar este cadastro, revise os dados','error')

 } 
}

);