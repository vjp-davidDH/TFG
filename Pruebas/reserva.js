/**
 * TripCollab — Lógica de Reservas
 * Maneja la población de destinos, el cálculo de precios dinámico
 * y la actualización del resumen de la reserva.
 */

// 1. "Base de Datos" de Destinos
const DESTINOS = [
    { id: 'tokio', nombre: 'Tokio, Japón', precioBase: 850 },
    { id: 'paris', nombre: 'París, Francia', precioBase: 600 },
    { id: 'nueva-york', nombre: 'Nueva York, EE. UU.', precioBase: 750 },
    { id: 'sidney', nombre: 'Sídney, Australia', precioBase: 1200 },
    { id: 'el-cairo', nombre: 'El Cairo, Egipto', precioBase: 500 },
    { id: 'bali', nombre: 'Bali, Indonesia', precioBase: 900 },
    { id: 'roma', nombre: 'Roma, Italia', precioBase: 550 },
    { id: 'londres', nombre: 'Londres, Reino Unido', precioBase: 650 }
];

const PRECIO_SEGURO_POR_PERSONA = 45;

const MULTIPLICADORES_CLASE = {
    'economy': 1,
    'business': 1.8,
    'first': 3.2
};

// 2. Referencias a elementos del DOM
const selectDestino = document.getElementById('destino');
const inputPasajeros = document.getElementById('pasajeros');
const selectClase = document.getElementById('clase');
const inputFechaIda = document.getElementById('fecha-ida');
const inputFechaVuelta = document.getElementById('fecha-vuelta');

// Referencias al resumen (UI)
const summaryDestino = document.getElementById('summary-destino');
const summaryDuracion = document.getElementById('summary-duracion');
const summaryVuelo = document.getElementById('summary-vuelo');
const summarySeguro = document.getElementById('summary-seguro');
const summaryTotal = document.getElementById('summary-total');

/**
 * Rellena el elemento select con los destinos disponibles.
 */
function popularDestinos() {
    if (!selectDestino) return;
    
    DESTINOS.forEach(dest => {
        const option = document.createElement('option');
        option.value = dest.id;
        option.textContent = dest.nombre;
        selectDestino.appendChild(option);
    });
}

/**
 * Calcula los precios y actualiza el resumen en la interfaz.
 */
function actualizarResumen() {
    const destinoId = selectDestino.value;
    const destino = DESTINOS.find(d => d.id === destinoId);
    const numPasajeros = parseInt(inputPasajeros.value) || 1;
    const clase = selectClase.value;
    const multiplicador = MULTIPLICADORES_CLASE[clase] || 1;

    if (!destino) return;

    // Cálculo de duración del viaje
    const fechaIda = new Date(inputFechaIda.value);
    const fechaVuelta = new Date(inputFechaVuelta.value);
    let duracion = 0;
    
    if (!isNaN(fechaIda) && !isNaN(fechaVuelta) && fechaVuelta > fechaIda) {
        const diffTime = Math.abs(fechaVuelta - fechaIda);
        duracion = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    // Cálculos económicos
    const totalVuelo = (destino.precioBase * multiplicador) * numPasajeros;
    const totalSeguro = PRECIO_SEGURO_POR_PERSONA * numPasajeros;
    const totalEstimado = totalVuelo + totalSeguro;

    // Actualizar la interfaz con los resultados
    summaryDestino.textContent = destino.nombre.split(',')[0];
    summaryDuracion.textContent = `${duracion} Días`;
    summaryVuelo.textContent = `$${Math.round(totalVuelo).toLocaleString()}`;
    summarySeguro.textContent = `$${totalSeguro.toLocaleString()}`;
    summaryTotal.textContent = `$${Math.round(totalEstimado).toLocaleString()}`;
}

/**
 * Configuración inicial de la página.
 */
function init() {
    // 1. Establecer fechas por defecto si están vacías
    if (!inputFechaIda.value) {
        inputFechaIda.valueAsDate = new Date();
    }
    
    if (!inputFechaVuelta.value) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 7);
        inputFechaVuelta.valueAsDate = tomorrow;
    }

    // 2. Poblar el select de destinos
    popularDestinos();
    
    // 3. Vincular eventos para actualización automática
    const inputs = [selectDestino, inputPasajeros, selectClase, inputFechaIda, inputFechaVuelta];
    inputs.forEach(input => {
        if (input) {
            input.addEventListener('change', actualizarResumen);
            input.addEventListener('input', actualizarResumen);
        }
    });

    // 4. Ejecutar la primera actualización
    actualizarResumen();
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);
