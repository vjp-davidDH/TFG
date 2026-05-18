const trips = [
    {
        id: 1,
        title: "Amanecer en Kyoto",
        destination: "Japón",
        date: "12 Oct - 25 Oct, 2024",
        tag: "Cultura",
        status: "upcoming",
        description: "Explora la belleza atemporal de los templos de Kyoto, vive la experiencia de una ceremonia de té tradicional y piérdete en los bosques de bambú de Arashiyama.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a Osaka y traslado a Kyoto." },
            { day: "Día 2", activity: "Tour por el Templo Kinkaku-ji (Pabellón Dorado)." },
            { day: "Día 3", activity: "Caminata por Fushimi Inari-taisha y sus mil toriis." }
        ]
    },
    {
        id: 2,
        title: "Safari en Serengeti",
        destination: "Tanzania",
        date: "05 Ago - 15 Ago, 2024",
        tag: "Aventura",
        status: "upcoming",
        description: "Vive la emoción de la vida salvaje en su estado más puro. Observa a los cinco grandes en su hábitat natural y disfruta de atardeceres inolvidables en la sabana.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a Arusha y briefing del safari." },
            { day: "Día 2", activity: "Primer game drive en el Parque Nacional Serengeti." },
            { day: "Día 3", activity: "Exploración del Cráter del Ngorongoro." }
        ]
    },
    {
        id: 3,
        title: "Luces del Norte",
        destination: "Islandia",
        date: "10 Ene - 18 Ene, 2024",
        tag: "Naturaleza",
        status: "completed",
        description: "Un viaje al corazón del invierno islandés. Caza auroras boreales, explora cuevas de hielo y relájate en las aguas termales de la Laguna Azul.",
        image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Aterrizaje en Keflavík y Blue Lagoon." },
            { day: "Día 2", activity: "Ruta del Círculo Dorado (Geysir, Gullfoss)." },
            { day: "Día 3", activity: "Costa sur y búsqueda de auroras." }
        ]
    },
    {
        id: 4,
        title: "Ruta de la Seda",
        destination: "Uzbekistán",
        date: "20 Sep - 05 Oct, 2024",
        tag: "Historia",
        status: "upcoming",
        description: "Descubre las joyas de Asia Central. Samarcanda, Bujará y Jiva te esperan con sus cúpulas azules y su historia milenaria.",
        image: "https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a Taskent y cena de bienvenida." },
            { day: "Día 2", activity: "Tren de alta velocidad a Samarcanda." },
            { day: "Día 3", activity: "Visita a la Plaza de Registán." }
        ]
    },
    {
        id: 5,
        title: "Glaciares y Fiordos",
        destination: "Noruega",
        date: "15 Jun - 25 Jun, 2024",
        tag: "Aventura",
        status: "upcoming",
        description: "Navega por los fiordos más profundos del mundo y camina sobre glaciares milenarios en una experiencia de naturaleza pura.",
        image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a Bergen, la puerta de los fiordos." },
            { day: "Día 2", activity: "Crucero por el Nærøyfjord." },
            { day: "Día 3", activity: "Senderismo en el glaciar Jostedalsbreen." }
        ]
    },
    {
        id: 7,
        title: "Colores de la Toscana",
        destination: "Italia",
        date: "05 May - 15 May, 2024",
        tag: "Relax",
        status: "upcoming",
        description: "Recorre las colinas de cipreses, disfruta de catas de vino en Chianti y enamórate de la arquitectura renacentista de Florencia.",
        image: "https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a Florencia." },
            { day: "Día 2", activity: "Ruta en coche por el Valle de Orcia." },
            { day: "Día 3", activity: "Cata de vinos en una villa tradicional." }
        ]
    },
    {
        id: 8,
        title: "Aventura en Patagonia",
        destination: "Argentina",
        date: "12 Dic - 28 Dic, 2024",
        tag: "Aventura",
        status: "upcoming",
        description: "Trekking en el Fitz Roy, navegación frente al Perito Moreno y la inmensidad del fin del mundo en Tierra del Fuego.",
        image: "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a El Calafate." },
            { day: "Día 2", activity: "Pasarelas del Glaciar Perito Moreno." },
            { day: "Día 3", activity: "Traslado a El Chaltén para trekking." }
        ]
    },
    {
        id: 9,
        title: "Misterios de Egipto",
        destination: "Egipto",
        date: "15 Oct - 25 Oct, 2024",
        tag: "Historia",
        status: "upcoming",
        description: "Crucero por el Nilo, las Pirámides de Giza y el Valle de los Reyes en un viaje a la cuna de la civilización.",
        image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a El Cairo." },
            { day: "Día 2", activity: "Pirámides y Esfinge de Giza." },
            { day: "Día 3", activity: "Vuelo a Luxor y embarque en el crucero." }
        ]
    },
    {
        id: 10,
        title: "Espíritu de Bali",
        destination: "Indonesia",
        date: "20 Jun - 05 Jul, 2024",
        tag: "Relax",
        status: "upcoming",
        description: "Terrazas de arroz en Ubud, templos sobre el mar y playas paradisíacas en las islas Gili.",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Llegada a Denpasar y traslado a Ubud." },
            { day: "Día 2", activity: "Bosque de los monos y terrazas de Tegalalang." },
            { day: "Día 3", activity: "Clase de yoga al amanecer." }
        ]
    }
];

function createTripCard(trip) {
    return `
        <article class="trip-card" data-id="${trip.id}">
            <img src="${trip.image}" alt="${trip.title}" class="trip-image">
            <div class="trip-content">
                <span class="trip-tag">${trip.tag}</span>
                <h3 class="trip-title">${trip.title}</h3>
                <div class="trip-info">
                    <span>${trip.destination}</span>
                    <span>•</span>
                    <span>${trip.date}</span>
                </div>
                <div class="trip-footer">
                    <span class="trip-status status-${trip.status}">
                        ${trip.status === 'upcoming' ? 'Próximamente' : 'Completado'}
                    </span>
                    <button onclick="showDetails(${trip.id})" class="btn-primary" style="padding: 0.5rem 1rem; font-size: 0.8rem; background: rgba(255,255,255,0.1); border: 1px solid var(--card-border);">
                        Ver detalles
                    </button>
                </div>
            </div>
        </article>
    `;
}

function showDetails(id) {
    const trip = trips.find(t => t.id === id);
    if (!trip) return;

    const modalBody = document.getElementById('modal-body');
    const modal = document.getElementById('details-modal');

    modalBody.innerHTML = `
        <div class="detail-hero">
            <img src="${trip.image}" alt="${trip.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <div class="detail-overlay">
                <span class="trip-tag">${trip.tag}</span>
                <h2>${trip.title}</h2>
                <p style="color: var(--text-secondary); margin-bottom: 0;">${trip.destination} • ${trip.date}</p>
            </div>
        </div>
        <div class="detail-content">
            <h3 style="margin-bottom: 1rem;">Sobre este viaje</h3>
            <p style="color: var(--text-secondary);">${trip.description}</p>
            
            <h3 style="margin-top: 2rem; margin-bottom: 1rem;">Itinerario</h3>
            ${trip.itinerary ? trip.itinerary.map(item => `
                <div class="itinerary-item">
                    <strong class="day-title" style="margin-bottom: 0.5rem;">${item.day}</strong>
                    <p style="font-size: 0.95rem; margin-bottom: 0;">${item.activity}</p>
                </div>
            `).join('') : '<p>No hay itinerario disponible.</p>'}
        </div>
    `;

    modal.classList.add('active');
}

function renderTrips(tripsToRender) {
    const grid = document.getElementById('trip-grid');
    grid.innerHTML = tripsToRender.map(trip => createTripCard(trip)).join('');
}

// Initial render
document.addEventListener('DOMContentLoaded', () => {
    // Clear localStorage to use our new 10 examples as base
    localStorage.removeItem('trips');
    
    renderTrips(trips);

    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTrips = trips.filter(trip => 
            trip.title.toLowerCase().includes(searchTerm) || 
            trip.destination.toLowerCase().includes(searchTerm) ||
            trip.tag.toLowerCase().includes(searchTerm)
        );
        renderTrips(filteredTrips);
    });

    document.getElementById('close-details').onclick = () => {
        document.getElementById('details-modal').classList.remove('active');
    };
});

