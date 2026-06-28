export function iniciarLoading(botao, texto = 'Carregando...') {

  const textoBtn = botao.querySelector('[data-text]');
  const spinner = botao.querySelector('[data-spinner]');


  botao.disabled = true;


  botao.classList.add(
    'opacity-80',
    'cursor-not-allowed'
  );


  if(textoBtn){

    textoBtn.textContent = texto;

  }


  if(spinner){

    spinner.classList.remove('hidden');

  }

}



export function finalizarLoading(botao, textoOriginal) {


  const textoBtn = botao.querySelector('[data-text]');
  const spinner = botao.querySelector('[data-spinner]');


  botao.disabled = false;


  botao.classList.remove(
    'opacity-80',
    'cursor-not-allowed'
  );


  if(textoBtn){

    textoBtn.textContent = textoOriginal;

  }


  if(spinner){

    spinner.classList.add('hidden');

  }

}