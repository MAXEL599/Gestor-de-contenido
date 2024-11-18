document.addEventListener('DOMContentLoaded', (event) => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = 'Modo Claro';
    }
});

function login() {
    window.location.href = 'principal.html';
}

function exit() {
    if (confirm("¿Seguro que quieres salir?")) {
        window.location.href = 'about:blank';
    }
}

// Función para alternar el tema
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        themeToggle.textContent = 'Modo Claro';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.textContent = 'Modo Oscuro';
        localStorage.setItem('theme', 'light');
    }
}

// Mostrar el modal
document.querySelector('a[href="#"]').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('forgot-password-modal').style.display = 'block';
});

// Cerrar el modal
function closeModal() {
    document.getElementById('forgot-password-modal').style.display = 'none';
}

// Enviar el correo electrónico
function sendPassword() {
    const email = document.getElementById('email').value;
    if (email) {
        fetch('/send-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Se ha enviado su contraseña a su correo electrónico.');
                closeModal();
            } else {
                alert('No se encontró el correo electrónico.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Por favor, ingrese un correo electrónico válido.');
    }
}