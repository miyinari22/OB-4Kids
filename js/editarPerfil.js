// Manejo de selección de avatar
document.querySelectorAll('.avatar-option').forEach(avatar => {
    avatar.addEventListener('click', () => {
        document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('selected'));
        avatar.classList.add('selected');
        console.log(`Avatar seleccionado: ${avatar.dataset.avatar}`);
    });
});

// Guardar cambios
function guardarCambios(event) {
    event.preventDefault();
    const nombre = document.getElementById('username').value;
    const edad = document.getElementById('edad').value;
    const avatarSeleccionado = document.querySelector('.avatar-option.selected');

    if (!avatarSeleccionado) {
        alert('Por favor selecciona un avatar antes de guardar.');
        return;
    }

    console.log(`Cambios guardados:
        - Nombre: ${nombre}
        - Edad: ${edad}
        - Avatar: ${avatarSeleccionado.dataset.avatar}`);

    // Redirigir a la página de perfil
    window.location.href = 'perfil.html';
}