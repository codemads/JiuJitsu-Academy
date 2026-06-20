//Função global para modal
export function inicializarModal(modalId,btnAbrirId,btnFecharId) {

  const modal =
    document.getElementById(modalId);

  const btnAbrir = btnAbrirId
    ? document.getElementById(btnAbrirId) :null;

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

//Modal para edição dinamica
export function abrirModalDinamico(
  containerId,
  btnClass,
  modalId,
  callback
) {
  document.getElementById(containerId)
    ?.addEventListener('click', (e) => {

      if (!e.target.classList.contains(btnClass))
        return;

      const id = e.target.dataset.id;

      document.getElementById(modalId)
        ?.classList.remove('hidden');

      callback?.(id);
    });
}