// Perfil.js

document.addEventListener('DOMContentLoaded', () => {
    cargarEstadisticas();
    cargarDatosUsuario();
});

function cargarEstadisticas() {
    // Intentamos obtener los viajes del localStorage o usar una lista vacía
    const viajesRaw = localStorage.getItem('viajes_cache');
    const viajes = viajesRaw ? JSON.parse(viajesRaw) : [];
    
    const hoy = new Date();
    let pendientes = 0;
    let realizados = 0;

    viajes.forEach(v => {
        const fechaFin = new Date(v.fechaFin);
        if (fechaFin < hoy) {
            realizados++;
        } else {
            pendientes++;
        }
    });

    // Si no hay viajes en cache (primera vez), simulamos algunos números
    if (viajes.length === 0) {
        pendientes = 2;
        realizados = 5;
    }

    document.getElementById('count-pendientes').textContent = pendientes;
    document.getElementById('count-realizados').textContent = realizados;
}

function cargarDatosUsuario() {
    const user = JSON.parse(localStorage.getItem('user')) || {
        nombre: "Juan David",
        cumple: "1995-08-15",
        metodoPago: "visa"
    };

    document.getElementById('display-name').textContent = user.nombre;
    document.getElementById('input-name').value = user.nombre;
    if (user.cumple) document.getElementById('input-birth').value = user.cumple;
    if (user.metodoPago) document.getElementById('input-payment').value = user.metodoPago;
}

function saveProfile() {
    const nombre = document.getElementById('input-name').value;
    const cumple = document.getElementById('input-birth').value;
    const metodoPago = document.getElementById('input-payment').value;

    const user = {
        nombre,
        cumple,
        metodoPago
    };

    localStorage.setItem('user', JSON.stringify(user));
    document.getElementById('display-name').textContent = nombre;
    
    // Actualizar iniciales en el avatar
    const iniciales = nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    const avatar = document.getElementById('avatar-initials');
    if (avatar) avatar.textContent = iniciales;

    alert("Perfil actualizado correctamente");
}
