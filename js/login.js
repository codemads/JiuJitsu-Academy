const form = document.getElementById('loginForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password: senha,
  });

  console.log('Login realizado');
  console.log(window.location.href);

  if (error) {
    console.error(error);
    alert(error.message);
    return;
  }

  window.location.href = '/pages/dashboard.html';
});
