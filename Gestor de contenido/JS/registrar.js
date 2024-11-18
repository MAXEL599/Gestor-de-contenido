// Facebook SDK initialization
window.fbAsyncInit = function() {
    FB.init({
        appId      : 'YOUR_FACEBOOK_APP_ID',
        cookie     : true,
        xfbml      : true,
        version    : 'v10.0'
    });
};

function loginWithFacebook() {
    FB.login(function(response) {
        if (response.authResponse) {
            sendEmail(response.authResponse.email);
            window.location.href = 'principal.html';
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    });
}

// Google SDK initialization
function loginWithGoogle() {
    gapi.load('auth2', function() {
        var auth2 = gapi.auth2.init({
            client_id: 'YOUR_GOOGLE_CLIENT_ID',
        });
        auth2.signIn().then(function(googleUser) {
            var profile = googleUser.getBasicProfile();
            sendEmail(profile.getEmail());
            window.location.href = 'principal.html';
        }).catch(function(error) {
            console.error('Error during Google login:', error);
        });
    });
}

// GitHub login (requires server-side implementation)
function loginWithGitHub() {
    window.location.href = 'https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID';
}

// Form submission
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.text())
    .then(data => {
        alert('Correo enviado: ' + data);
        redirectToMain();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function redirectToMain() {
    window.location.href = 'principal.html';
}

// Send email function
function sendEmail(email) {
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => console.log('Email sent:', data))
    .catch(error => console.error('Error sending email:', error));
}

// Theme toggle
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

// Apply saved theme on load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});