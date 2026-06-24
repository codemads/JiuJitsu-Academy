
import { supabaseClient } from '../config/supabase.js';
import { showToast } from '../components/toast.js';

export async function recuperarSenha(email) {
  const { error } = await supabaseClient.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: `${window.location.origin}/reset-password.html`
    }
  );

  if (error) throw error;
 }

export async function atualizarSenha(novaSenha){

const { error } =
await supabaseClient.auth.updateUser({

password: novaSenha


});


if(error){
showToast('Algo deu errado!','error')
 throw error;
}}
