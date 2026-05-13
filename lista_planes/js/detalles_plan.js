const tripsData = [
    {
        id: 1,
        title: "Amanecer en Kyoto",
        destination: "Japón",
        date: "12 Oct - 25 Oct, 2024",
        tag: "Cultura",
        description: "Explora la belleza atemporal de los templos de Kyoto, vive la experiencia de una ceremonia de té tradicional y piérdete en los bosques de bambú de Arashiyama.",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
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
        description: "Vive la emoción de la vida salvaje en su estado más puro. Observa a los cinco grandes en su hábitat natural y disfruta de atardeceres inolvidables en la sabana.",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop",
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
        description: "Un viaje al corazón del invierno islandés. Caza auroras boreales, explora cuevas de hielo y relájate en las aguas termales de la Laguna Azul.",
        image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1200&auto=format&fit=crop",
        itinerary: [
            { day: "Día 1", activity: "Aterrizaje en Keflavík y Blue Lagoon." },
            { day: "Día 2", activity: "Ruta del Círculo Dorado (Geysir, Gullfoss)." },
            { day: "Día 3", activity: "Costa sur y búsqueda de auroras." }
        ]
    }
];

function renderDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const tripId = parseInt(urlParams.get('id'));
    
    // Load from localStorage or use default
    const storedTrips = JSON.parse(localStorage.getItem('trips')) || tripsData;
    const trip = storedTrips.find(t => t.id === tripId) || storedTrips[0];
    
    const container = document.getElementById('detail-container');

    container.innerHTML = `
        <div style="animation: fadeIn 0.6s ease-out">
            <div class="detail-hero">
                <img src="${trip.image}" alt="${trip.title}">
                <div class="detail-overlay">
                    <span class="trip-tag">${trip.tag}</span>
                    <h1 style="font-size: 3rem; margin-bottom: 0.5rem">${trip.title}</h1>
                    <p style="color: var(--text-secondary)">${trip.destination} • ${trip.date}</p>
                </div>
            </div>

            <div class="detail-grid">
                <div class="main-content">
                    <h2 style="margin-bottom: 1.5rem">Sobre este viaje</h2>
                    <p style="color: var(--text-secondary); font-size: 1.1rem; margin-bottom: 3rem">
                        ${trip.description}
                    </p>

                    <h2 style="margin-bottom: 1.5rem">Itinerario</h2>
                    ${trip.itinerary ? trip.itinerary.map(item => `
                        <div class="itinerary-card">
                            <span class="day-title">${item.day}</span>
                            <p>${item.activity}</p>
                        </div>
                    `).join('') : '<p>No hay itinerario disponible.</p>'}
                </div>

                <div class="sidebar">
                    <div class="itinerary-card" style="position: sticky; top: 2rem">
                        <h3 style="margin-bottom: 1rem">Detalles Rápidos</h3>
                        <div style="margin-bottom: 1rem">
                            <small style="color: var(--text-secondary)">Presupuesto estimado</small>
                            <p style="font-size: 1.25rem; fontWeight: 700">$2,500 - $3,500</p>
                        </div>
                        <div style="margin-bottom: 1rem">
                            <small style="color: var(--text-secondary)">Alojamiento</small>
                            <p>Premium & Hoteles Boutique</p>
                        </div>
                        <button id="edit-btn" class="btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem">
                            Editar Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup Edit Modal logic
    const editBtn = document.getElementById('edit-btn');
    const modal = document.getElementById('edit-modal');
    const closeBtn = document.getElementById('close-modal');
    const editForm = document.getElementById('edit-form');

    editBtn.onclick = () => {
        document.getElementById('edit-title').value = trip.title;
        document.getElementById('edit-destination').value = trip.destination;
        document.getElementById('edit-description').value = trip.description;
        modal.classList.add('active');
    };

    closeBtn.onclick = () => modal.classList.remove('active');

    editForm.onsubmit = (e) => {
        e.preventDefault();
        
        const updatedTrip = {
            ...trip,
            title: document.getElementById('edit-title').value,
            destination: document.getElementById('edit-destination').value,
            description: document.getElementById('edit-description').value
        };

        const allTrips = JSON.parse(localStorage.getItem('trips')) || tripsData;
        const index = allTrips.findIndex(t => t.id === trip.id);
        
        if (index !== -1) {
            allTrips[index] = updatedTrip;
        } else {
            allTrips.push(updatedTrip);
        }

        localStorage.setItem('trips', JSON.stringify(allTrips));
        modal.classList.remove('active');
        renderDetails(); // Re-render with new data
    };
}

document.addEventListener('DOMContentLoaded', renderDetails);
