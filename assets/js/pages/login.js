import { supabaseClient } from '../config/supabase.js';
import { showToast } from '../components/toast.js';

const form = document.getElementById('loginForm');

const emailInput =
  document.getElementById('email');

const senhaInput =
  document.getElementById('senha');

const btnLogin =
  document.getElementById('btnLogin');

const btnText =
  document.getElementById('btnText');

const btnSpinner =
  document.getElementById('btnSpinner');

function iniciarLoading() {
  btnLogin.disabled = true;

  btnLogin.classList.add(
    'opacity-80',
    'cursor-not-allowed'
  );

  btnText.textContent =
    'Entrando...';

  btnSpinner.classList.remove(
    'hidden'
  );
}

function finalizarLoading() {
  btnLogin.disabled = false;

  btnLogin.classList.remove(
    'opacity-80',
    'cursor-not-allowed'
  );

  btnText.textContent =
    'Entrar';

  btnSpinner.classList.add(
    'hidden'
  );
}

form.addEventListener(
  'submit',
  async (e) => {
    e.preventDefault();

    const email =
      emailInput.value.trim();

    const senha =
      senhaInput.value;

    if (!email || !senha) {
      showToast(
        'Preencha todos os campos.',
        'error'
      );
      return;
    }

    try {
      iniciarLoading();

      const { error } =
        await supabaseClient.auth.signInWithPassword({
          email,
          password: senha,
        });

      if (error) {
        throw error;
      }

      const {
  data: { user },
} = await supabaseClient.auth.getUser();

const { data: perfil } =
  await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

      showToast(
        'Login realizado com sucesso!',
        'success'
      );

      setTimeout(() => {
        if (perfil.role === 'professor') {
  window.location.href = 'dashboard-professor.html';
} else {
  window.location.href = 'dashboard.html';
}
      }, 500);

    } catch (error) {

      showToast(
       'Email ou senha invalido!',
       'error'
      );

    } finally {

      finalizarLoading();

    }
  }
);