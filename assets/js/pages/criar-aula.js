import { criaAula } from '../services/professorService.js'; 
import { showToast } from '../components/toast.js';
import { iniciarLoading, finalizarLoading } from '../components/spinner.js';


export function initCriaAula(){


const form = document.getElementById('criar-aula');

const btnCriarAula = document.getElementById('btnSalvarCriaAula');

  if (!form || !btnCriarAula) {
    console.warn('Form criar-aula não encontrado');
    return;
  }

form.addEventListener('submit', async (e) => {

  e.preventDefault();


  const formData = {

    titulo: document.getElementById('tituloId').value,

    descricao:
    document.getElementById('descricaoId').value,

    status:
    document.getElementById('statusAula').value,

    horario_inicio:
    document.getElementById('horaInicioId').value,

    horario_fim:
    document.getElementById('horaFimId').value,

    turma:
    document.getElementById('tipoAula').value,

  };



  try {


    iniciarLoading(
      btnCriarAula,
      'Criando...'
    );


    await criaAula(formData);



    showToast(
      'Aula criada com sucesso!',
      'success'
    );


    form.reset();



  } catch(error){


    console.error(error);


    showToast(
      error.message || 'Erro ao criar aula',
      'error'
    );


  } finally {


    finalizarLoading(
      btnCriarAula,
      'Criar Aula'
    );


  }


});
}