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

// Abre el modal para crear un blog
function openCreateBlogModal() {
    document.getElementById('createBlogModal').style.display = 'block';
}

// Cierra el modal para crear un blog
function closeCreateBlogModal() {
    document.getElementById('createBlogModal').style.display = 'none';
}

// Publica el blog y lo agrega a la página principal
function publishBlog() {
    const title = document.getElementById('blogTitle').value;
    const text = document.getElementById('blogText').value;
    const imageInput = document.getElementById('blogImage');
    const imageFiles = imageInput.files;

    // Crear un nuevo contenedor para el blog
    const blogContainer = document.createElement('div');
    blogContainer.className = 'blog-post';

    // Agregar el título
    const blogTitle = document.createElement('h3');
    blogTitle.textContent = title;
    blogContainer.appendChild(blogTitle);

    // Agregar el texto
    const blogText = document.createElement('p');
    blogText.textContent = text;
    blogContainer.appendChild(blogText);

    // Agregar las imágenes
    for (let i = 0; i < imageFiles.length; i++) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imageFiles[i]);
        blogContainer.appendChild(img);
    }

    // Agregar el nuevo blog a la página principal
    document.getElementById('main-container').appendChild(blogContainer);

    // Cerrar el modal
    closeCreateBlogModal();
}