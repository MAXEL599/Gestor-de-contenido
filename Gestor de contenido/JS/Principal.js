document.addEventListener('DOMContentLoaded', (event) => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = 'Modo Claro';
    }
});

function toggleProfileMenu() {
    document.getElementById("profile-dropdown").classList.toggle("show");
}

// Cerrar el menú desplegable si el usuario hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('.profile-button')) {
        var dropdowns = document.getElementsByClassName("profile-dropdown");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

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

function openModal() {
    document.getElementById('publishModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('publishModal').style.display = 'none';
}

function publishContent() {
    const postText = document.getElementById('postText').value;
    const fileInput = document.getElementById('fileInput');
    const files = fileInput.files;
    const mainContainer = document.getElementById('main-container');

    const postContainer = document.createElement('div');
    postContainer.className = 'post-container';

    if (postText) {
        const textElement = document.createElement('p');
        textElement.textContent = postText;
        postContainer.appendChild(textElement);
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileReader = new FileReader();

        fileReader.onload = function(e) {
            const fileURL = e.target.result;
            const img = document.createElement('img');
            img.src = fileURL;
            img.style.width = '100px'; // Ajusta el tamaño según sea necesario
            postContainer.appendChild(img);
        };

        fileReader.readAsDataURL(file);
    }

    mainContainer.appendChild(postContainer);
    closeModal();
}

function redirectToCreate() {
    window.location.href = 'crear.html';
}