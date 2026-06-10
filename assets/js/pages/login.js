import {supabaseClient} from '../config/supabase.js';

const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

try {
  const { data, error } =
    await supabaseClient.auth.signInWithPassword({
      email,
      password: senha,
    });

  if (error) {
    showToast('Email ou senha inválidos.', 'error');
    return;
  }

  window.location.href = 'dashboard.html';

} catch (err) {
  console.error(err);
  showToast('Erro ao realizar login.', 'error');
}
});


function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');

  const colors = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-yellow-500',
  };

  const toast = document.createElement('div');

  toast.className = `
    ${colors[type] || colors.info}
    text-white px-4 py-3 rounded-lg shadow-lg
    min-w-[220px] max-w-[280px]
    transform transition-all duration-300
    translate-x-0 opacity-100
  `;

  toast.innerText = message;

  container.appendChild(toast);

  // anima saída
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-x-10');

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
