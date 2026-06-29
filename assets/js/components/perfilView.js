
export function renderizarPerfil(perfil) {
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
   if(perfil.role === 'aluno'){
     document.getElementById('statusMatricula').textContent =
    perfil.status_matricula || '-';

  document.getElementById('faixaAtual').textContent =
    perfil.faixa || '-';
   }
 
}