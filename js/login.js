const form = document.getElementById('loginForm');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  // Proximas feature:
  // loginSupabase(email, senha);
});
