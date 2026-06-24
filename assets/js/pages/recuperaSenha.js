import { recuperarSenha, atualizarSenha } from '../services/passwordService.js';
import { showToast } from '../components/toast.js';


const btn = document.getElementById('btnRecuperarSenha');
const text = document.getElementById('btnText');
const spinner = document.getElementById('btnSpinner');


document.getElementById('recuperarSenhaForm').addEventListener('submit', async (e)=>{

e.preventDefault();


btn.disabled = true;
text.textContent = 'Enviando...';
spinner.classList.remove('hidden');


const email =
document.getElementById('email').value;


try {

await recuperarSenha(email);

showToast(
'Link enviado para seu email',
'success'
);


} catch(error){

console.error(error);

showToast(
'Erro ao enviar email',
'error'
);


} finally {

btn.disabled = false;
text.textContent = 'Recuperar senha';
spinner.classList.add('hidden');

}

});