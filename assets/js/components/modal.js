export function inicializarModalPerfil() {
  const modal = document.getElementById('modalPerfil');
  const btnEditar = document.getElementById('btnEditar');
  const btnFechar = document.getElementById('fecharModal');

  btnEditar?.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  });

  btnFechar?.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  });
}