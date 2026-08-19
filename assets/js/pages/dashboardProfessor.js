
import { verificarSessao, logout }from '../services/auth.js';
import { listarAlunos, buscarAlunoPorId, listarTurmas, listarAulas, listarAlunosCadastrados } from '../services/professorService.js';
import { carregarPerfil, salvarPerfil} from '../services/profileService.js';
import { renderizarPerfil } from '../components/perfilView.js';
import { abrirModalDinamico, inicializarModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { inicializarAvatar } from '../components/avatar.js';
import { initCriaAula } from './criar-aula.js';
import { registrarPresenca } from '../services/professorService.js';



//renderizaçao da lista de alunos na base de dados
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

          <button data-id="${aluno.id}"
            class="btnFichaAluno text-blue-400">
            Ver ficha
          </button>
        </td>
      </tr>
    `;
  });

  
}
//prenche select cria aula com turmas
async function carregarTurmas() {
  const turmas = await listarTurmas();
  const select = document.getElementById('tipoAula');

  select.innerHTML = '';

  turmas.forEach(turma => {
    select.innerHTML += `
      <option value="${turma.id}">
        ${turma.nome}
      </option>
    `;
  });

}


//prenche select aulas cadastrados 
async function carregarTurmasRegistro() {
  const aulas = await listarAulas();
  const select = document.getElementById('aulasCadastradas');

  select.innerHTML = '';

  aulas.forEach(aula => {
    select.innerHTML += `
      <option value="${aula.id}">
        ${aula.titulo}
      </option>
    `;
  });

}


//prenche select alunos cadastrados 
async function carregarAlunosCadastrados() {
  const alunos = await listarAlunosCadastrados();
  const select = document.getElementById('alunosCadastrados');

  select.innerHTML = '';

  alunos.forEach(aluno => {
    select.innerHTML += `
      <option value="${aluno.id}">
        ${aluno.nome}
      </option>
    `;
  });

}

//função para renderizar até 10 cadastros
let paginaAtual = 1;
let totalPaginas = 1;

async function carregarAlunos() {
  const resultado = await listarAlunos(paginaAtual);

  renderizarAlunos(resultado.alunos);

  totalPaginas = Math.ceil(resultado.total / 10);

  document.getElementById('infoPagina').textContent =
    `Página ${paginaAtual} de ${totalPaginas}`;
}

//função ficha aluno

document.getElementById('listaAlunos').addEventListener('click', async (e)=>{

if(!e.target.classList.contains('btnFichaAluno'))
return;


const id = e.target.dataset.id;
const aluno = await buscarAlunoPorId(id);

document.getElementById('fichaFoto').src =aluno.avatar_url ? aluno.avatar_url :'../assets/images/avatar-default.png';

document.getElementById('fichaNome').textContent = aluno.nome;

document.getElementById('fichaEmail').textContent = aluno.email;

document.getElementById('fichaTelefone').textContent = aluno.telefone || '-';

document.getElementById('fichaNascimento').textContent = aluno.data_nascimento || '-';

document.getElementById('fichaFaixa').textContent =
aluno.faixa || '-';

document.getElementById('fichaStatus')
.textContent =
aluno.status_matricula || '-';

const modal = document.getElementById('modalFichaAluno');
modal.classList.remove('hidden');
modal.classList.add('flex');

});

//redirecionamento botao editar ficha do aluno
let alunoSelecionado = null;

document.getElementById('listaAlunos').addEventListener('click', async (e) => {

  if (!e.target.classList.contains('btnFichaAluno'))
    return;

  const id = e.target.dataset.id;

  alunoSelecionado = await buscarAlunoPorId(id);

  document.getElementById('btnEditarFichaAluno')
?.addEventListener('click', () => {

  if (!alunoSelecionado) return;

  location.href =
    `edit-aluno.html?id=${alunoSelecionado.id}`;
});
});




//botao anterior
 document.getElementById('btnAnterior').addEventListener('click', async () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      await carregarAlunos();
    }
  });


//botao proximo
document.getElementById('btnProxima').addEventListener('click', async () => {
  if (paginaAtual < totalPaginas) {
      paginaAtual++;
      await carregarAlunos();
    }
  });

//envio do registrar presença
const btnRegistrar = document.getElementById('btn-registrarPresenca');

btnRegistrar.addEventListener('click', async () => {

  const alunoId = document.getElementById('alunosCadastrados').value;
  const aulaId = document.getElementById('aulasCadastradas').value;

  if (!alunoId || !aulaId) {
    showToast('Selecione o aluno e a aula.', 'error');
    return;
  }

  try {

    btnRegistrar.disabled = true;

    await registrarPresenca(alunoId, aulaId);

    showToast('Presença registrada com sucesso!', 'success');

    // limpa os campos
    document.getElementById('alunosCadastrados').value = '';
    document.getElementById('aulasCadastradas').value = '';

   

  } catch (error) {

    // Caso já exista registro para esse aluno nessa aula
    if (error.code === '23505') {
      showToast('Este aluno já foi registrado nesta aula.', 'error');
      return;
    }

    showToast('Não foi possível registrar a presença.', 'error');

  } finally {
    btnRegistrar.disabled = false;
  }
});

    
inicializarModal('modalAluno','btnNovoAluno','fecharModal',);
inicializarModal('modalRegistrarPresenca','btnPresenca','fecharModalPresenca')
inicializarModal('modalCriaAula','btnCriaAula','fecharModalCriaAula')
inicializarModal('modalFichaAluno',null,'fecharModalFichaAluno')
inicializarModal('modalPerfil','btnEditar','fecharModalPerfilProfessor');
abrirModalDinamico('listaAlunos','btnEditarAluno','modalEditarAluno')



document.getElementById('btnLogout')?.addEventListener('click',logout);

  

//DOM Load
document.addEventListener('DOMContentLoaded', async () => {
   
const usuario = await verificarSessao('professor');

if (!usuario) {
    window.location.replace('/pages/erros/403.html');
    return;
}

document.body.classList.remove('hidden');
  await inicializarAvatar()
  const perfil = await carregarPerfil()
  renderizarPerfil(perfil)
  await carregarAlunos();
  await carregarTurmas()
  await carregarTurmasRegistro()
  await carregarAlunosCadastrados()
  initCriaAula()

});