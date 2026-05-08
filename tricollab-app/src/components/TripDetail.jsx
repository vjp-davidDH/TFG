import React from 'react';
import { useParams, Link } from 'react-router-dom';

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
    // Mock data simplified for brevity
];

const TripDetail = () => {
    const { id } = useParams();
    // In a real app, we would fetch this from an API
    const trip = tripsData.find(t => t.id === parseInt(id)) || tripsData[0];

    return (
        <div style={{animation: 'fadeIn 0.6s ease-out'}}>
            <header>
                <Link to="/" className="logo">TriCollab</Link>
                <nav>
                    <Link to="/" className="btn-primary" style={{background: 'rgba(255,255,255,0.05)', border: '1px solid var(--card-border)'}}>
                        Volver a la lista
                    </Link>
                </nav>
            </header>

            <div className="detail-hero">
                <img src={trip.image} alt={trip.title} />
                <div className="detail-overlay">
                    <span className="trip-tag">{trip.tag}</span>
                    <h1 style={{fontSize: '3rem', marginBottom: '0.5rem'}}>{trip.title}</h1>
                    <p style={{color: 'var(--text-secondary)'}}>{trip.destination} • {trip.date}</p>
                </div>
            </div>

            <div className="detail-grid">
                <div className="main-content">
                    <h2 style={{marginBottom: '1.5rem'}}>Sobre este viaje</h2>
                    <p style={{color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem'}}>
                        {trip.description}
                    </p>

                    <h2 style={{marginBottom: '1.5rem'}}>Itinerario</h2>
                    {trip.itinerary.map((item, index) => (
                        <div key={index} className="itinerary-card">
                            <span className="day-title">{item.day}</span>
                            <p>{item.activity}</p>
                        </div>
                    ))}
                </div>

                <div className="sidebar">
                    <div className="itinerary-card" style={{position: 'sticky', top: '2rem'}}>
                        <h3 style={{marginBottom: '1rem'}}>Detalles Rápidos</h3>
                        <div style={{marginBottom: '1rem'}}>
                            <small style={{color: 'var(--text-secondary)'}}>Presupuesto estimado</small>
                            <p style={{fontSize: '1.25rem', fontWeight: '700'}}>$2,500 - $3,500</p>
                        </div>
                        <div style={{marginBottom: '1rem'}}>
                            <small style={{color: 'var(--text-secondary)'}}>Alojamiento</small>
                            <p>Ryokan Tradicional & Hoteles Boutique</p>
                        </div>
                        <button className="btn-primary" style={{width: '100%', justifyContent: 'center', marginTop: '1rem'}}>
                            Editar Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetail;
