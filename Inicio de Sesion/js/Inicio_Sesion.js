async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Por favor, rellena todos los campos");
        return;
    }

    const body = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user || { nombre: email.split('@')[0], email: email }));
            alert("Login correcto");
            window.location.href = "../Inicio/Inicio.html";
        } else {
            alert("Credenciales incorrectas");
        }
    } catch (error) {
        console.error("Error en el login:", error);
        // Fallback para desarrollo sin backend
        localStorage.setItem("token", "demo_token");
        localStorage.setItem("user", JSON.stringify({ nombre: "Usuario Demo", email: email }));
        alert("Entrando en modo demo (Servidor no disponible)");
        window.location.href = "../Inicio/Inicio.html";
    }
}

function googleLogin() {
    alert("Simulando conexión con Google...");
    localStorage.setItem("token", "google_token_demo");
    localStorage.setItem("user", JSON.stringify({ nombre: "Viajero Google", email: "google_user@gmail.com" }));
    window.location.href = "../Inicio/Inicio.html";
}

function forgotPassword() {
    const email = prompt("Introduce tu correo electrónico para restablecer la contraseña:");
    if (email) {
        alert("Se ha enviado un código de recuperación a: " + email);
    }
}

// Inicializar eventos
document.addEventListener('DOMContentLoaded', () => {
    const btnGoogle = document.getElementById('btn-google');
    if (btnGoogle) {
        btnGoogle.onclick = googleLogin;
    }

    const forgotLink = document.querySelector('.forgot-link');
    if (forgotLink) {
        forgotLink.onclick = (e) => {
            e.preventDefault();
            forgotPassword();
        };
    }

    const registerLink = document.getElementById('register-link');
    if (registerLink) {
        registerLink.onclick = (e) => {
            e.preventDefault();
            window.location.href = "../Registro/Registro.html";
        };
    }
});
