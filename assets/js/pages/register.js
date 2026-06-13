import { cadastrarUsuario } from '../services/auth.js';
import { showToast } from '../components/toast.js';

document
  .getElementById('registerForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      faixa: document.getElementById('faixa').value,
      telefone: document.getElementById('celular').value,
      dataNascimento: document.getElementById('dataNasc').value,
      senha: document.getElementById('senha').value,
      confirmarSenha:
        document.getElementById('confirmarSenha').value,
    };

    try {
      await cadastrarUsuario(formData);

      showToast(
        'Cadastro realizado com sucesso!',
        'success'
      );

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);

    } catch (error) {
      showToast(error.message, 'error')
    }
  });