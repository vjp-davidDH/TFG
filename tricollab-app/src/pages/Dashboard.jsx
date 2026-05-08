import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
    const { t } = useLanguage();
    const [trips, setTrips] = useState([]);
    const [filter, setFilter] = useState('todos');
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Simulación de carga de viajes
        const demoData = [
            { id: 1, title: 'Gran Cañón del Colorado', destination: 'Arizona, USA', date: '2024-06-15', rol: 'creador', image: 'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&q=80&w=800' },
            { id: 2, title: 'Crucero por el Mediterráneo', destination: 'Grecia e Italia', date: '2024-08-20', rol: 'colaborador', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800' },
            { id: 3, title: 'Expedición a la Antártida', destination: 'Puerto Williams', date: '2025-01-10', rol: 'admin', image: 'https://images.unsplash.com/photo-1517030330234-94c4fa948ebc?auto=format&fit=crop&q=80&w=800' }
        ];
        setTrips(demoData);
    }, []);

    const filteredTrips = trips.filter(trip => {
        const matchesFilter = filter === 'todos' || trip.rol === filter;
        const matchesSearch = trip.title.toLowerCase().includes(search.toLowerCase()) || 
                             trip.destination.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="dashboard-content">
            <header className="dash-header">
                <div className="dash-header-text">
                    <h1 className="dash-title">{t('page-title')}</h1>
                    <p className="dash-subtitle">{t('viajes-count')(filteredTrips.length)}</p>
                </div>
                <button className="btn-primary">
                    <span className="btn-crear-icon">+</span>
                    <span>{t('btn-crear-viaje')}</span>
                </button>
            </header>

            <div className="filter-tabs">
                {['todos', 'creador', 'admin', 'colaborador'].map(f => (
                    <button 
                        key={f}
                        className={`tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {t(`tab-${f}`)}
                    </button>
                ))}
            </div>

            <div className="trip-grid">
                {filteredTrips.map(trip => (
                    <div key={trip.id} className="trip-card-v2">
                        <div className="trip-image-container">
                            <img src={trip.image} alt={trip.title} />
                            <div className="trip-badge">{trip.rol}</div>
                        </div>
                        <div className="trip-info-v2">
                            <h3>{trip.title}</h3>
                            <p className="trip-dest">📍 {trip.destination}</p>
                            <div className="trip-footer-v2">
                                <span className="trip-date">{trip.date}</span>
                                <button className="btn-details">Ver detalles</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTrips.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">🌍</div>
                    <h2>{t('empty-title')}</h2>
                    <p>{t('empty-desc')}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
