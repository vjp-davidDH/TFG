/* =====================================================
   TripCollab — Dashboard (Mis Viajes)
   dashboard.js
   ===================================================== */

'use strict';

// ─── Configuración ────────────────────────────────────
const API_BASE = 'http://localhost:8080/api';

// ─── Estado global ────────────────────────────────────
let todosLosViajes = [];   // cache completo de la API
let filtroActivo  = 'todos';
let busqueda      = '';

// ─── Helpers ──────────────────────────────────────────

/** Devuelve el token o redirige al login si no existe */
function getToken() {
    // Para desarrollo local sin backend real, podemos simular un token
    const token = localStorage.getItem('token') || 'token_demo';
    if (!token) {
        window.location.href = '../Inicio de Sesion/Inicio_Sesion.html';
        return null;
    }
    return token;
}

/** Muestra un toast con un mensaje y tipo ('success' | 'error') */
function showToast(msg, tipo = 'success', duracion = 3500) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.className = `toast toast-${tipo}`;
    toast.classList.remove('hidden');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
        toast.classList.add('hidden');
        toast.className = 'toast hidden';
    }, duracion);
}

/** Formatea una fecha ISO a dd/mm/aaaa */
function formatFecha(isoStr) {
    if (!isoStr) return '—';
    try {
        const d = new Date(isoStr);
        return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    } catch {
        return isoStr;
    }
}

/** Normaliza texto para búsqueda (sin tildes, minúsculas) */
function normalizar(str = '') {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

// ─── Inicialización ───────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    const token = getToken();
    if (!token) return;

    inicializarAvatar();
    cargarViajes();
    inicializarBusqueda();
    inicializarModalTeclado();
});

// ─── Avatar ───────────────────────────────────────────

function inicializarAvatar() {
    // Intenta leer datos de usuario del localStorage si el login los guardó
    try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const nombre   = userData.nombre || userData.name || userData.email || '';
        const iniciales = nombre
            .split(/\s+/)
            .slice(0, 2)
            .map(p => p[0]?.toUpperCase() || '')
            .join('');
        document.getElementById('avatar-initials').textContent = iniciales || '?';
    } catch {
        document.getElementById('avatar-initials').textContent = '?';
    }
}

// ─── Carga de viajes ──────────────────────────────────

async function cargarViajes() {
    const token = getToken();
    if (!token) return;

    const grid = document.getElementById('viajes-grid');
    grid.setAttribute('aria-busy', 'true');

    try {
        const res = await fetch(`${API_BASE}/viajes`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '../Inicio de Sesion/Inicio_Sesion.html';
            return;
        }

        if (!res.ok) throw new Error(`Error ${res.status}`);

        const data = await res.json();
        // Acepta tanto array directo como { viajes: [...] }
        todosLosViajes = Array.isArray(data) ? data : (data.viajes ?? []);
        localStorage.setItem('viajes_cache', JSON.stringify(todosLosViajes));
        renderViajes();

    } catch (err) {
        console.error('Error cargando viajes:', err);
        // Si la API no está levantada, mostramos datos de demo para el prototipo
        todosLosViajes = datosDemo();
        localStorage.setItem('viajes_cache', JSON.stringify(todosLosViajes));
        renderViajes();
        showToast('Backend no disponible — mostrando datos de demo', 'error', 5000);
    }
}

// ─── Renderizado de tarjetas ──────────────────────────

function renderViajes() {
    const grid      = document.getElementById('viajes-grid');
    const emptyEl   = document.getElementById('empty-state');
    const countEl   = document.getElementById('viajes-count');

    if (!grid) return; // Evita errores en páginas sin la cuadrícula de viajes

    // Aplica filtro de rol
    let lista = todosLosViajes.filter(v => {
        if (filtroActivo === 'todos') return true;
        return normalizar(v.rol || '') === normalizar(filtroActivo);
    });

    // Aplica búsqueda de texto
    if (busqueda) {
        lista = lista.filter(v =>
            normalizar(v.titulo || v.title || '').includes(busqueda) ||
            normalizar(v.destino || v.destination || '').includes(busqueda)
        );
    }

    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = '';

    if (lista.length === 0) {
        emptyEl.classList.remove('hidden');
        countEl.textContent = 'No hay viajes que coincidan';
        return;
    }

    emptyEl.classList.add('hidden');

    const totalTodos = todosLosViajes.length;
    countEl.textContent = totalTodos === 1
        ? 'Tienes 1 viaje'
        : `Tienes ${totalTodos} viaje${totalTodos !== 1 ? 's' : ''}${lista.length !== totalTodos ? ` · mostrando ${lista.length}` : ''}`;

    lista.forEach((viaje, idx) => {
        const card = crearTarjeta(viaje, idx);
        grid.appendChild(card);
    });
}

/** Crea el elemento DOM de una tarjeta de viaje */
function crearTarjeta(viaje, idx) {
    const id        = viaje.id ?? idx;
    const titulo    = viaje.titulo    ?? viaje.title       ?? 'Sin título';
    const destino   = viaje.destino   ?? viaje.destination ?? 'Destino desconocido';
    const inicio    = viaje.fechaInicio ?? viaje.startDate  ?? null;
    const fin       = viaje.fechaFin    ?? viaje.endDate    ?? null;
    const rol       = (viaje.rol ?? 'colaborador').toLowerCase();

    const rolLabel = {
        creador:     'Creador',
        admin:       'Admin',
        colaborador: 'Colaborador'
    }[rol] ?? rol;

    const article = document.createElement('article');
    article.className = 'viaje-card';
    article.setAttribute('aria-label', `Viaje: ${titulo}`);
    // Retraso escalonado de animación para efecto cascada
    article.style.animationDelay = `${idx * 60}ms`;

    article.innerHTML = `
        <div class="card-top">
            <h2 class="card-title">${escapeHtml(titulo)}</h2>
            <span class="role-badge role-${rol}" aria-label="Tu rol: ${rolLabel}">${rolLabel}</span>
        </div>

        <p class="card-destino">
            <span class="card-destino-icon" aria-hidden="true">📍</span>
            <span>${escapeHtml(destino)}</span>
        </p>

        <div class="card-fechas">
            <span class="card-fechas-icon" aria-hidden="true">🗓️</span>
            <span>
                <time datetime="${inicio ?? ''}">${formatFecha(inicio)}</time>
                <span aria-hidden="true"> → </span>
                <span class="sr-only">hasta </span>
                <time datetime="${fin ?? ''}">${formatFecha(fin)}</time>
            </span>
        </div>

        <button
            class="btn-ver"
            onclick="verViaje(${id})"
            aria-label="Ver detalles del viaje ${escapeHtml(titulo)}"
        >
            <span aria-hidden="true">🚀</span>
            Ver viaje
        </button>
    `;

    return article;
}

/** Escapa HTML para evitar XSS */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ─── Filtrado por rol ─────────────────────────────────

function filtrar(btn) {
    // Actualiza aria-pressed en todos los tabs
    document.querySelectorAll('.filter-tabs .tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');
    filtroActivo = btn.dataset.filter;
    renderViajes();
}

// ─── Búsqueda en tiempo real ───────────────────────────

function inicializarBusqueda() {
    const input = document.getElementById('search-input');
    let debounceTimer;
    input.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            busqueda = normalizar(input.value);
            renderViajes();
        }, 250); // espera 250ms tras dejar de escribir
    });
}

// ─── Ver viaje ────────────────────────────────────────

function verViaje(id) {
    // Por ahora navega a la futura página de detalle
    window.location.href = `viaje.html?id=${id}`;
}

// ─── Logout ───────────────────────────────────────────

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '../Inicio de Sesion/Inicio_Sesion.html';
}

function toggleDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown.classList.toggle('hidden');
}

// Cerrar dropdown al hacer click fuera
window.addEventListener('click', (e) => {
    const dropdown = document.getElementById('user-dropdown');
    const avatar = document.getElementById('nav-avatar');
    if (dropdown && !dropdown.classList.contains('hidden')) {
        if (!avatar.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    }
});

// ─── Modal: Crear Viaje ───────────────────────────────

/** Elemento que tenía el foco antes de abrir el modal (para restaurarlo al cerrar) */
let focusAnterior = null;

function abrirModalCrear() {
    focusAnterior = document.activeElement;
    const modal = document.getElementById('modal-crear');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // bloquea scroll de fondo

    // Limpia campos y errores
    document.getElementById('nuevo-titulo').value      = '';
    document.getElementById('nuevo-destino').value     = '';
    document.getElementById('nuevo-fecha-inicio').value = '';
    document.getElementById('nuevo-fecha-fin').value   = '';
    limpiarErrorModal();

    // Foco al primer campo (accesibilidad)
    setTimeout(() => document.getElementById('nuevo-titulo').focus(), 50);
}

function cerrarModalCrear() {
    const modal = document.getElementById('modal-crear');
    modal.classList.add('hidden');
    document.body.style.overflow = '';

    // Devuelve el foco al elemento que lo tenía antes (accesibilidad)
    if (focusAnterior) {
        focusAnterior.focus();
        focusAnterior = null;
    }
}

/** Focus trap: mantiene el foco dentro del modal con Tab / Shift+Tab */
function inicializarModalTeclado() {
    const modal = document.getElementById('modal-crear');

    modal.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            cerrarModalCrear();
            return;
        }
        if (e.key !== 'Tab') return;

        const focusables = Array.from(
            modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
        ).filter(el => !el.disabled && !el.closest('.hidden'));

        if (focusables.length === 0) { e.preventDefault(); return; }

        const first = focusables[0];
        const last  = focusables[focusables.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                e.preventDefault();
                last.focus();
            }
        } else {
            if (document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });

    // Cerrar al hacer clic en el overlay (fuera del modal-box)
    modal.addEventListener('click', e => {
        if (e.target === modal) cerrarModalCrear();
    });
}

// ─── Crear viaje (POST /api/viajes) ──────────────────

async function crearViaje() {
    const titulo     = document.getElementById('nuevo-titulo').value.trim();
    const destino    = document.getElementById('nuevo-destino').value.trim();
    const fechaInicio = document.getElementById('nuevo-fecha-inicio').value;
    const fechaFin   = document.getElementById('nuevo-fecha-fin').value;

    // Validación accesible
    if (!titulo || !destino || !fechaInicio || !fechaFin) {
        mostrarErrorModal('Por favor, rellena todos los campos antes de continuar.');
        return;
    }
    if (fechaFin < fechaInicio) {
        mostrarErrorModal('La fecha de fin no puede ser anterior a la de inicio.');
        document.getElementById('nuevo-fecha-fin').focus();
        return;
    }

    const token = getToken();
    if (!token) return;

    const btn = document.getElementById('btn-confirmar-crear');
    btn.disabled = true;
    btn.textContent = 'Creando…';

    try {
        const res = await fetch(`${API_BASE}/viajes`, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titulo, destino, fechaInicio, fechaFin })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message ?? `Error ${res.status}`);
        }

        const nuevoViaje = await res.json();
        todosLosViajes.unshift(nuevoViaje);
        cerrarModalCrear();
        renderViajes();
        showToast(`¡Viaje "${titulo}" creado con éxito! ✈`, 'success');

    } catch (err) {
        console.error('Error creando viaje:', err);
        mostrarErrorModal(err.message || 'No se pudo crear el viaje. Inténtalo de nuevo.');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '<span class="btn-crear-icon" aria-hidden="true">＋</span><span>Crear viaje</span>';
    }
}

function mostrarErrorModal(msg) {
    const el = document.getElementById('modal-error');
    el.textContent = msg;
    el.classList.remove('hidden');
    el.focus(); // lleva el foco al error para que el lector lo anuncie
}

function limpiarErrorModal() {
    const el = document.getElementById('modal-error');
    el.textContent = '';
    el.classList.add('hidden');
}

// ─── Datos de demo (cuando el backend no está disponible) ──
function datosDemo() {
    return []; // Devolvemos un array vacío para mostrar el estado "sin viajes" por defecto
}
