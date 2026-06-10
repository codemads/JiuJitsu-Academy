import { uploadAvatar } from '../services/porfileService.js';

export function inicializarAvatar() {
  document
    .getElementById('avatarUsuario')
    ?.addEventListener('click', () => {
      document.getElementById('avatarInput')?.click();
    });

  document
    .getElementById('avatarInput')
    ?.addEventListener('change', async (e) => {
      const file = e.target.files[0];

      if (!file) return;

      document.getElementById('avatarUsuario').src =
        URL.createObjectURL(file);

      const avatarUrl = await uploadAvatar(file);

      document.getElementById('avatarUsuario').src =
        avatarUrl;
    });
}