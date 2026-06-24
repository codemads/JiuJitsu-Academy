import { atualizarSenha } from '../services/passwordService.js';
import { showToast } from '../components/toast.js';


const btn =
document.getElementById('btnAltSenha');

const text =
document.getElementById('btnText');

const spinner =
document.getElementById('btnSpinner');

document
.getElementById('resetSenhaForm')
.addEventListener('submit', async(e)=>{

e.preventDefault();

const novaSenha =
document.getElementById('novaSenha').value;

if(novaSenha.length < 6){

showToast(
'Senha deve ter no mínimo 6 caracteres',
'error'
);
return;
}

btn.disabled = true;

text.textContent =
'Atualizando...';

spinner.classList.remove('hidden');

try{

await atualizarSenha(novaSenha);

showToast(
'Senha atualizada!',
'success'
);

setTimeout(()=>{
window.location.href =
'index.html';

},1500);


}catch (error) {showToast('ops', 'error')
    

}finally{

btn.disabled = false;
text.textContent =
'Alterar senha';
spinner.classList.add('hidden');

}

});