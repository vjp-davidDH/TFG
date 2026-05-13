async function register() {
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("password-confirm").value;

    if (!nombre || !email || !password || !passwordConfirm) {
        alert("Por favor, rellena todos los campos");
        return;
    }

    if (password !== passwordConfirm) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const body = {
        nombre: nombre,
        email: email,
        password: password
    };

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });

        if (response.ok) {
            alert("Registro completado con éxito. Ahora puedes iniciar sesión.");
            window.location.href = "../Inicio de Sesion/Inicio_Sesion.html";
        } else {
            const err = await response.json().catch(() => ({}));
            alert(err.message || "Error en el registro");
        }
    } catch (error) {
        console.error("Error en el registro:", error);
        // Fallback demo
        alert("Simulación: Registro completado con éxito (Servidor no disponible). Redirigiendo al login...");
        window.location.href = "../Inicio de Sesion/Inicio_Sesion.html";
    }
}

function googleLogin() {
    alert("Simulando registro/conexión con Google...");
    localStorage.setItem("token", "google_token_demo");
    localStorage.setItem("user", JSON.stringify({ nombre: "Viajero Google", email: "google_user@gmail.com" }));
    window.location.href = "../Inicio/Inicio.html";
}
