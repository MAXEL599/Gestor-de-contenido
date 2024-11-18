document.addEventListener('DOMContentLoaded', function() {
    // Simulación de obtención de datos del usuario desde la base de datos
    const user = {
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        role: 'Administrador'
    };

    // Actualiza el contenido del perfil con los datos del usuario
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role;
});