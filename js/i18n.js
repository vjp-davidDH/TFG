const translations = {
    es: {
        "nav-logo-text": "TripCollab",
        "search-input": "Buscar viaje…",
        "avatar-initials": "JD",
        "page-title": "Mis Viajes",
        "viajes-count": "Cargando tus aventuras…",
        "btn-crear-viaje": "Nuevo viaje",
        "tab-todos": "Todos",
        "tab-creador": "Creados por mí",
        "tab-admin": "Admin",
        "tab-colaborador": "Colaborador",
        "empty-title": "Aún no tienes viajes",
        "empty-desc": "Crea tu primer viaje y empieza a planificar tu próxima aventura.",
        "btn-crear-primero": "Crear mi primer viaje",
        "dropdown-perfil": "👤 Ver perfil",
        "dropdown-planes": "🗺️ Mis planes",
        "dropdown-favs": "⭐ Mis favoritos",
        "dropdown-logout": "🚪 Cerrar sesión",
        "lang-text": "ES",
        // Modal
        "modal-title": "✈ Nuevo Viaje",
        "nuevo-titulo": "Título del viaje",
        "nuevo-destino": "Destino",
        "btn-confirmar-crear": "Crear viaje",
        // Perfil
        "profile-stats-title": "Resumen de viajes",
        "profile-pendientes": "Pendientes",
        "profile-realizados": "Realizados",
        "profile-personal-title": "Información Personal",
        "profile-label-name": "Nombre",
        "profile-label-birth": "Cumpleaños",
        "reserva-summary-total": "Total Estimado",
        "reserva-btn-checkout": "Finalizar Reserva",
        // Lista Planes
        "planes-title": "Lista de Viajes",
        "planes-subtitle": "Gestiona tus itinerarios, descubre nuevos destinos y mantén todos tus recuerdos de viaje en un solo lugar con nuestra interfaz inteligente.",
        "planes-search-placeholder": "Buscar destino o plan..."
    },
    en: {
        "nav-logo-text": "TripCollab",
        "search-input": "Search trip…",
        "avatar-initials": "JD",
        "page-title": "My Trips",
        "viajes-count": "Loading your adventures…",
        "btn-crear-viaje": "New trip",
        "tab-todos": "All",
        "tab-creador": "Created by me",
        "tab-admin": "Admin",
        "tab-colaborador": "Collaborator",
        "empty-title": "You don't have trips yet",
        "empty-desc": "Create your first trip and start planning your next adventure.",
        "btn-crear-primero": "Create my first trip",
        "dropdown-perfil": "👤 View profile",
        "dropdown-planes": "🗺️ My plans",
        "dropdown-favs": "⭐ My favorites",
        "dropdown-logout": "🚪 Log out",
        "lang-text": "EN",
        // Modal
        "modal-title": "✈ New Trip",
        "nuevo-titulo": "Trip title",
        "nuevo-destino": "Destination",
        "btn-confirmar-crear": "Create trip",
        // Perfil
        "profile-stats-title": "Travel Summary",
        "profile-pendientes": "Pending",
        "profile-realizados": "Completed",
        "profile-personal-title": "Personal Information",
        "profile-label-name": "Name",
        "profile-label-birth": "Birthday",
        "profile-label-payment": "Payment Method",
        "profile-btn-save": "Save Changes",
        // Reserva
        "reserva-title": "Book your Adventure",
        "reserva-subtitle": "Complete the details to confirm your next collaborative experience.",
        "reserva-destino-title": "📍 Destination Information",
        "reserva-fecha-ida": "📅 Departure Date",
        "reserva-fecha-vuelta": "🏁 Return Date",
        "reserva-pasajeros-title": "👥 Passengers and Class",
        "reserva-clase-eco": "Economy",
        "reserva-clase-bus": "Business",
        "reserva-clase-first": "First Class",
        "reserva-btn-confirmar": "Confirm Booking",
        "reserva-summary-title": "Summary",
        "reserva-summary-duracion": "Duration",
        "reserva-summary-vuelo": "Flight (round trip)",
        "reserva-summary-seguro": "Travel Insurance",
        "reserva-summary-total": "Estimated Total",
        "reserva-btn-checkout": "Finish Booking",
        // Lista Planes
        "planes-title": "Trip List",
        "planes-subtitle": "Manage your itineraries, discover new destinations and keep all your travel memories in one place with our smart interface.",
        "planes-search-placeholder": "Search destination or plan..."
    }
};

let currentLang = localStorage.getItem('lang') || 'es';

function applyTranslations() {
    const langData = translations[currentLang];
    if (!langData) return;
    
    // Mapeo dinámico para elementos comunes y específicos
    const elements = {
        "page-title": document.getElementById('page-title'),
        "viajes-count": document.getElementById('viajes-count'),
        "btn-crear-viaje": document.querySelector('#btn-crear-viaje span:not(.btn-crear-icon)'),
        "tab-todos": document.querySelector('[data-filter="todos"]'),
        "tab-creador": document.querySelector('[data-filter="creador"]'),
        "tab-admin": document.querySelector('[data-filter="admin"]'),
        "tab-colaborador": document.querySelector('[data-filter="colaborador"]'),
        "empty-title": document.querySelector('#empty-state h2'),
        "empty-desc": document.querySelector('#empty-state p'),
        "btn-crear-primero": document.querySelector('#empty-state .btn-crear span:not(.btn-crear-icon)'),
        "lang-text": document.getElementById('lang-text'),
        // Dropdown
        "dropdown-perfil": document.querySelector('.user-dropdown a:nth-child(1)'),
        "dropdown-planes": document.querySelector('.user-dropdown a:nth-child(2)'),
        "dropdown-favs": document.querySelector('.user-dropdown a:nth-child(3)'),
        "dropdown-logout": document.querySelector('.logout-item'),
        // Modal
        "modal-title": document.getElementById('modal-title'),
        "btn-confirmar-crear": document.querySelector('#btn-confirmar-crear span:not(.btn-crear-icon)'),
        // Perfil
        "profile-stats-title": document.querySelector('.stats-card h3'),
        "profile-pendientes": document.querySelector('.stats-card .stat-item:nth-child(1) .stat-label'),
        "profile-realizados": document.querySelector('.stats-card .stat-item:nth-child(2) .stat-label'),
        "profile-personal-title": document.querySelector('.info-card h3'),
        "profile-label-name": document.querySelector('label[for="input-name"]'),
        "profile-label-birth": document.querySelector('label[for="input-birth"]'),
        "profile-label-payment": document.querySelector('label[for="input-payment"]'),
        "profile-btn-save": document.querySelector('.info-card button.btn-crear'),
        // Reserva
        "reserva-title": document.querySelector('.dash-title'),
        "reserva-subtitle": document.querySelector('.dash-subtitle'),
        "reserva-destino-title": document.querySelector('.booking-form .form-section-title:nth-child(1)'),
        "reserva-fecha-ida": document.querySelector('.form-grid div:nth-child(1) .form-section-title'),
        "reserva-fecha-vuelta": document.querySelector('.form-grid div:nth-child(2) .form-section-title'),
        "reserva-pasajeros-title": document.querySelector('.booking-form div:nth-child(4) .form-section-title'),
        "reserva-clase-eco": document.querySelector('#clase option[value="economy"]'),
        "reserva-clase-bus": document.querySelector('#clase option[value="business"]'),
        "reserva-clase-first": document.querySelector('#clase option[value="first"]'),
        "reserva-btn-confirmar": document.querySelector('.booking-form .btn-crear span:nth-child(1)'),
        "reserva-summary-title": document.querySelector('.summary-card .form-section-title'),
        "reserva-summary-duracion": document.querySelector('.summary-item:nth-child(2) span:nth-child(1)'),
        "reserva-summary-vuelo": document.querySelector('.summary-item:nth-child(3) span:nth-child(1)'),
        "reserva-summary-seguro": document.querySelector('.summary-item:nth-child(4) span:nth-child(1)'),
        "reserva-summary-total": document.querySelector('.summary-total span:nth-child(1)'),
        "reserva-btn-checkout": document.querySelector('.btn-checkout span:nth-child(1)'),
        // Lista Planes
        "planes-title": document.querySelector('.hero h1'),
        "planes-subtitle": document.querySelector('.hero p')
    };

    for (const [key, el] of Object.entries(elements)) {
        if (el && langData[key]) {
            if (el.querySelector('.dropdown-icon')) {
                const icon = el.querySelector('.dropdown-icon').outerHTML;
                el.innerHTML = icon + ' ' + langData[key].replace(/.*?\s/, '');
            } else if (key.startsWith('dropdown-')) {
                el.innerHTML = langData[key];
            } else {
                el.textContent = langData[key];
            }
        }
    }

    // Placeholders
    const placeholders = {
        "search-input": document.getElementById('search-input'),
        "nuevo-titulo": document.getElementById('nuevo-titulo'),
        "nuevo-destino": document.getElementById('nuevo-destino')
    };

    for (const [key, el] of Object.entries(placeholders)) {
        if (el && langData[key]) el.placeholder = langData[key];
    }

    // Bandera
    const flagEl = document.getElementById('lang-flag');
    if (flagEl) {
        flagEl.textContent = currentLang === 'es' ? '🇪🇸' : '🇺🇸';
    }
}

function toggleLanguage() {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
    
    // Especial: Contador de viajes si existe la función
    if (typeof cargarViajes === 'function' && document.getElementById('viajes-count')) {
        actualizarContadorIdiomas();
    }
}

function actualizarContadorIdiomas() {
    const countEl = document.getElementById('viajes-count');
    if (!countEl || typeof todosLosViajes === 'undefined') return;
    
    const n = todosLosViajes.length;
    if (currentLang === 'es') {
        countEl.textContent = n === 0 ? 'No hay viajes' : (n === 1 ? 'Tienes 1 viaje' : `Tienes ${n} viajes`);
    } else {
        countEl.textContent = n === 0 ? 'No trips' : (n === 1 ? 'You have 1 trip' : `You have ${n} trips`);
    }
}

document.addEventListener('DOMContentLoaded', applyTranslations);
