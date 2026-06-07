async function verificarLogin() {
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = '../index.html';
  }
}
