document
  .getElementById('registerForm')
  .addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value;

    const email = document.getElementById('email').value;

    const faixa = document.getElementById('faixa').value;

    const telefone = document.getElementById('celular').value;

    const dataNascimento = document.getElementById('dataNasc').value;

    const senha = document.getElementById('senha').value;

    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password: senha,
    });

    console.log('SIGNUP DATA:', data);
    console.log('SIGNUP ERROR:', error);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    console.log('SESSION:', session);
    const { error: profileError } = await supabaseClient
      .from('profiles')
      .insert({
        id: data.user.id,
        nome,
        email,
        telefone,
        data_nascimento: dataNascimento,
        faixa,
        status_matricula: 'Ativa',
      });

    if (profileError) {
      console.error(profileError);
      alert('Erro ao criar perfil.');
      return;
    }

    alert('Cadastro realizado com sucesso!');

    window.location.href = 'index.html';
  });
