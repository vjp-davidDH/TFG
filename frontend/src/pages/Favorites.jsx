import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import TripCard from '../components/TripCard';
import apiClient from '../services/api';

const Favorites = () => {
    const { t } = useLanguage();
    const { removeFavorite } = useTrips();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavorites = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiClient.favorites.getAll();
                setFavorites(data);
            } catch (err) {
                setError(err.message || 'Error al cargar favoritos');
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, []);

    const handleRemove = async (idPlan) => {
        try {
            const success = await removeFavorite(idPlan);
            if (success) {
                setFavorites(prev => prev.filter(f => f.id_plan !== idPlan));
            } else {
                throw new Error('No se pudo eliminar del servidor');
            }
        } catch (err) {
            alert('Error al eliminar de favoritos: ' + err.message);
        }
    };

    const getDates = (plan) => {
        if (!plan) return { fechaInicio: null, fechaFin: null };
        if (plan.fecha_inicio) return { fechaInicio: plan.fecha_inicio, fechaFin: plan.fecha_fin };
        if (plan.transportes && plan.transportes.length > 0) {
            const salidas = plan.transportes.map(t => t.fecha_salida).filter(Boolean).sort();
            const llegadas = plan.transportes.map(t => t.fecha_llegada).filter(Boolean).sort();
            return {
                fechaInicio: salidas[0] || null,
                fechaFin: llegadas[llegadas.length - 1] || null
            };
        }
        return { fechaInicio: null, fechaFin: null };
    };

    return (
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 animate-in fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-4xl font-black bg-linear-to-r from-teal-glow to-primary bg-clip-text text-transparent uppercase tracking-tight">
                    {t('myFavorites')}
                </h1>
                <p className="text-text-muted mt-2 font-bold uppercase text-[10px] tracking-widest">Tus destinos guardados</p>
            </header>

            {loading ? (
                <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                    <div className="text-5xl mb-4">⏳</div>
                    <h2 className="text-xl font-bold text-text-muted">Cargando favoritos...</h2>
                </div>
            ) : error ? (
                <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                    <div className="text-5xl mb-4">❌</div>
                    <h2 className="text-xl font-bold text-text-muted">{error}</h2>
                </div>
            ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(f => {
                        const { fechaInicio, fechaFin } = getDates(f.plan);
                        return (
                            <TripCard
                                key={f.id_plan}
                                viaje={{
                                    ...f.plan,
                                    id: f.plan?.id_plan || f.id_plan,
                                    titulo: f.plan?.nombre || 'Sin título',
                                    destino: f.plan?.destino,
                                    precio: f.plan?.precio_total || 0,
                                    fechaInicio,
                                    fechaFin,
                                    rol: f.plan?.rol || 'colaborador'
                                }}
                                showReserve={true}
                                onRemove={() => handleRemove(f.id_plan)}
                            />
                        );
                    })}
                </div>
            ) : (
                <div className="glass p-20 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                    <div className="text-6xl mb-4">⭐</div>
                    <h2 className="text-xl font-bold text-text-muted">{t('emptyFavorites')}</h2>
                </div>
            )}
        </main>
    );
};

export default Favorites;
