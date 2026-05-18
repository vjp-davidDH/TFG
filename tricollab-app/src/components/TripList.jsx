import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const initialTrips = [
    {
        id: 1,
        title: "Amanecer en Kyoto",
        destination: "Japón",
        date: "12 Oct - 25 Oct, 2024",
        tag: "Cultura",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Safari en Serengeti",
        destination: "Tanzania",
        date: "05 Ago - 15 Ago, 2024",
        tag: "Aventura",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Luces del Norte",
        destination: "Islandia",
        date: "10 Ene - 18 Ene, 2024",
        tag: "Naturaleza",
        status: "completed",
        image: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Gastronomía en Lyon",
        destination: "Francia",
        date: "20 May - 25 May, 2024",
        tag: "Gourmet",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Escapada a Santorini",
        destination: "Grecia",
        date: "15 Jun - 22 Jun, 2024",
        tag: "Relax",
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop"
    }
];

const TripList = () => {
    const [trips, setTrips] = useState(initialTrips);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTrips = trips.filter(trip => 
        trip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        trip.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddTrip = () => {
        const newTrip = {
            id: Date.now(),
            title: "Nueva Aventura",
            destination: "Destino Desconocido",
            date: "Próximamente",
            tag: "Exploración",
            status: "upcoming",
            image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop"
        };
        setTrips([newTrip, ...trips]);
    };

    return (
        <>
            <header>
                <div className="logo">TriCollab</div>
                <nav>
                    <button className="btn-primary" onClick={handleAddTrip}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Nuevo Viaje
                    </button>
                </nav>
            </header>

            <section className="hero">
                <h1 style={{fontSize: '3.5rem', marginBottom: '1rem', letterSpacing: '-2px'}}>Lista de Viajes</h1>
                <p style={{color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px'}}>
                    Gestiona tus itinerarios, descubre nuevos destinos y mantén todos tus recuerdos de viaje en un solo lugar con nuestra interfaz inteligente.
                </p>
            </section>

            <div className="controls">
                <div className="search-wrapper">
                    <input 
                        type="text" 
                        placeholder="Buscar destino o plan..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="trip-grid">
                {filteredTrips.map(trip => (
                    <article className="trip-card" key={trip.id}>
                        <img src={trip.image} alt={trip.title} className="trip-image" />
                        <div className="trip-content">
                            <span className="trip-tag">{trip.tag}</span>
                            <h3 className="trip-title">{trip.title}</h3>
                            <div className="trip-info">
                                <span>{trip.destination}</span>
                                <span>•</span>
                                <span>{trip.date}</span>
                            </div>
                            <div className="trip-footer">
                                <span className={`trip-status status-${trip.status}`}>
                                    {trip.status === 'upcoming' ? 'Próximamente' : 'Completado'}
                                </span>
                                <Link to={`/trip/${trip.id}`} className="btn-primary" style={{padding: '0.5rem 1rem', fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', border: '1px solid var(--card-border)'}}>
                                    Ver detalles
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
};

export default TripList;
