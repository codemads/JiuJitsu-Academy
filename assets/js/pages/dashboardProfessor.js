
import { verificarSessao, logout }from '../services/auth.js';
import { listarAlunos, buscarAlunoPorId } from '../services/professorService.js';
import { carregarPerfil, salvarPerfil} from '../services/profileService.js';
import { renderizarPerfil } from './perfil.js';
import { abrirModalDinamico, inicializarModal } from '../components/modal.js';
import { inicializarAvatar } from '../components/avatar.js';


//renderizaçao da lisyta de alunos na base de dados
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
//redirecinamento botao editar ficha do aluno
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

    
inicializarModal('modalAluno','btnNovoAluno','fecharModal',);
inicializarModal('modalRegistrarPresenca','btnPresenca','fecharModalPresenca')
inicializarModal('modalCriaAula','btnCriaAula','fecharModalCriaAula')
inicializarModal('modalFichaAluno',null,'fecharModalFichaAluno')
inicializarModal('modalPerfil','btnEditar','fecharModalPerfilProfessor');
abrirModalDinamico('listaAlunos','btnEditarAluno','modalEditarAluno')



document.getElementById('btnLogout')?.addEventListener('click',logout);

  

//DOM Load
document.addEventListener('DOMContentLoaded', async () => {
   
  await verificarSessao();
  await inicializarAvatar()
  await carregarPerfil()
  await carregarAlunos();

});