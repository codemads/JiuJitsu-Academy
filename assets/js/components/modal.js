//Função global para modal
export function inicializarModal(
  modalId,
  btnAbrirId,
  btnFecharId
) {

  const modal =
    document.getElementById(modalId);

  const btnAbrir =
    document.getElementById(btnAbrirId);

  const btnFechar =
    document.getElementById(btnFecharId);

  btnAbrir?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  btnFechar?.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}