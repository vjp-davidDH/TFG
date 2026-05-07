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