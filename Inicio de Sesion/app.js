async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const body = {
        email: email,
        password: password
    };

    const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        alert("Login correcto");
        window.location.href = "viajes.html";
    } else {
        alert("Credenciales incorrectas");
    }
}
