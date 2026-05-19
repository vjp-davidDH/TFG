import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TripCard from '../components/TripCard';
import apiClient from '../services/api';
import { useTrips } from '../context/TripContext';

const MyReservations = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const { reservations: localReservations, removeReservation } = useTrips();
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReservas = async () => {
            setLoading(true);
            setError(null);
            try {
                const dbReservas = await apiClient.reservations.getAll();
                const mappedLocal = localReservations.map(lr => ({
                    id_reserva: `local-${lr.id}`,
                    id_usuario: null,
                    id_plan: lr.id,
                    estado: 'pendiente',
                    total_pagado: 0,
                    fecha_reserva: new Date().toISOString(),
                    plan: {
                        id_plan: lr.id,
                        nombre: lr.titulo,
                        destino: lr.destino,
                        precio_total: lr.precio,
                        alojamientos: lr.alojamientos || [],
                        transportes: lr.transportes || []
                    }
                }));
                const dbPlanIds = new Set(dbReservas.map(r => r.id_plan));
                const filteredLocal = mappedLocal.filter(lr => !dbPlanIds.has(lr.id_plan));

                setReservas([...dbReservas, ...filteredLocal]);
            } catch (err) {
                setError(err.message || 'Error al cargar reservas');
            } finally {
                setLoading(false);
            }
        };
        fetchReservas();
    }, [localReservations]);

    const handleConfirm = (reserva) => {
        navigate('/reserva', { 
            state: { 
                trip: {
                    ...reserva.plan,
                    id: reserva.plan?.id_plan || reserva.id_plan,
                    id_reserva: reserva.id_reserva,
                    titulo: reserva.plan?.nombre || 'Sin título',
                    destino: reserva.plan?.destino,
                    precio: reserva.plan?.precio_total || 0,
                } 
            } 
        });
    };

    const handleRemove = async (reservaId) => {
        if (window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
            try {
                if (typeof reservaId === 'string' && reservaId.startsWith('local-')) {
                    const id = parseInt(reservaId.replace('local-', ''));
                    removeReservation(id);
                } else {
                    await apiClient.reservations.delete(reservaId);
                    setReservas(prev => prev.filter(r => r.id_reserva !== reservaId));
                }
            } catch (err) {
                alert('Error al cancelar la reserva: ' + err.message);
            }
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
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 animate-in fade-in duration-500 space-y-16">
            <section>
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black bg-linear-to-r from-teal-glow to-primary bg-clip-text text-transparent uppercase">
                            {t('myReservations')}
                        </h1>
                        <p className="text-text-muted mt-2 font-bold uppercase text-[10px] tracking-widest">{t('reservedTrips')}</p>
                    </div>
                </header>

                {loading ? (
                    <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                        <div className="text-5xl mb-4">⏳</div>
                        <h2 className="text-xl font-bold text-text-muted">Cargando reservas...</h2>
                    </div>
                ) : error ? (
                    <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                        <div className="text-5xl mb-4">❌</div>
                        <h2 className="text-xl font-bold text-text-muted">{error}</h2>
                    </div>
                ) : reservas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reservas.map(r => {
                            const { fechaInicio, fechaFin } = getDates(r.plan);
                            return (
                                <TripCard
                                    key={r.id_reserva}
                                    viaje={{
                                        ...r.plan,
                                        id: r.id_reserva,
                                        titulo: r.plan?.nombre || 'Sin título',
                                        destino: r.plan?.destino,
                                        precio: r.plan?.precio_total || 0,
                                        fechaInicio,
                                        fechaFin,
                                        estado: r.estado,
                                        total_pagado: r.total_pagado,
                                        fecha_reserva: r.fecha_reserva,
                                        rol: r.plan?.rol || 'colaborador'
                                    }}
                                    showReserve={false}
                                    showConfirm={r.estado === 'pendiente'}
                                    onConfirm={() => handleConfirm(r)}
                                    onRemove={() => handleRemove(r.id_reserva)}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                        <div className="text-5xl mb-4">🎫</div>
                        <h2 className="text-xl font-bold text-text-muted">{t('emptyReservations')}</h2>
                    </div>
                )}
            </section>
        </main>
    );
};

export default MyReservations;
