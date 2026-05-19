import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import { MapPinIcon, CalendarIcon, StarIcon } from './Icons';

const TripCard = ({ viaje, showReserve = true, showConfirm = false, onConfirm, onRemove }) => {
    const { t } = useLanguage();
    const { addReservation, addFavorite } = useTrips();
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    // Corregido: mostrar destino como string si es objeto
    let displayDestino = viaje.destino || viaje.destination || 'Destino desconocido';
    if (typeof displayDestino === 'object' && displayDestino) {
        displayDestino = `${displayDestino.ciudad}, ${displayDestino.pais}`;
    }

    const { titulo, title, fechaInicio, startDate, fechaFin, endDate, rol, precio } = viaje;
    const displayTitulo = titulo || title || 'Sin título';

    const formatFecha = (isoStr) => {
        if (!isoStr) return '—';
        try {
            const d = new Date(isoStr);
            return d.toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch {
            return isoStr;
        }
    };

    const currentRol = (rol || 'colaborador').toLowerCase();

    const rolStyles = {
        creador: 'bg-teal/10 text-teal border-teal/20',
        admin: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        colaborador: 'bg-primary/20 text-blue-400 border-primary/30'
    }[currentRol];

    return (
        <article className="group card-3d stagger-in">
            <div className="card-3d-content glass flex flex-col gap-4 p-6 rounded-[28px] h-full relative">


                <div className="flex items-start justify-between gap-2.5 relative z-10 transition-all duration-700">
                    <h2 className="text-lg font-bold text-text-primary leading-tight flex-1">
                        {displayTitulo}
                    </h2>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${rolStyles}`}>
                                {t(currentRol)}
                            </span>
                            {!onRemove && showReserve && addFavorite && (
                                <button
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        const success = await addFavorite(viaje.id);
                                        if (success) {
                                            alert('¡Añadido a favoritos!');
                                        } else {
                                            alert('Ya está en tus favoritos o hubo un error.');
                                        }
                                    }}
                                    className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-md flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all shadow-lg backdrop-blur-md"
                                    title="Añadir a favoritos"
                                >
                                    <StarIcon />
                                </button>
                            )}
                            {onRemove && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(viaje.id);
                                    }}
                                    className="w-8 h-8 bg-red-500/10 border border-red-500/20 text-red-500 rounded-md flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg backdrop-blur-md"
                                    title={t('remove')}
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <p className="flex items-center gap-2 text-sm text-text-muted relative z-10 transition-all duration-700">
                    <MapPinIcon />
                    <span>{displayDestino}</span>
                </p>

                <div className="text-xl font-black text-teal-glow relative z-10 transition-all duration-700 origin-left">
                    ${(precio || 0).toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">

                    <button
                        onClick={() => setShowDetails(true)}
                        className="py-3 rounded-2xl bg-white/5 border border-white/10 text-text-primary font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center"
                    >
                        {t('viewDetails')}
                    </button>

                    {showReserve && (
                        <button
                            onClick={() => {
                                addReservation(viaje);

                                navigate('/reservas', {
                                    state: {
                                        trip: viaje
                                    }
                                });
                            }}
                            className="py-3 rounded-2xl bg-white/5 border border-teal/50 text-teal font-bold text-xs hover:bg-teal/10 transition-all shadow-lg shadow-teal/5"
                        >
                            {t('reserve')}
                        </button>
                    )}

                    {showConfirm && (
                        <button
                            onClick={() => onConfirm(viaje)}
                            className="py-3 rounded-2xl bg-white/5 border border-teal/50 text-teal font-bold text-xs hover:bg-teal/10 transition-all shadow-lg shadow-teal/5 uppercase tracking-widest"
                        >
                            {t('confirmReserva')}
                        </button>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {showDetails && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="glass w-full max-w-lg p-8 rounded-[32px] animate-in zoom-in-95 duration-300 overflow-hidden relative">

                        <button
                            className="absolute top-6 right-6 text-xl hover:opacity-50"
                            onClick={() => setShowDetails(false)}
                        >
                            ✕
                        </button>

                        <header className="mb-8">
                            <span className="text-[10px] uppercase tracking-widest text-teal-glow font-black">
                                {t(currentRol)}
                            </span>

                            <h2 className="text-3xl font-black mt-1">
                                {displayTitulo}
                            </h2>

                            <p className="text-text-muted mt-2 flex items-center gap-2">
                                <MapPinIcon /> {displayDestino}
                            </p>
                        </header>

                        <div className="space-y-6">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-border-card">
                                    <p className="text-[10px] uppercase text-text-muted font-bold mb-1 flex items-center gap-1">
                                        <CalendarIcon /> {t('startDate')}
                                    </p>

                                    <p className="font-bold">
                                        {formatFecha(fechaInicio || startDate)}
                                    </p>
                                </div>

                                <div className="p-4 bg-white/5 rounded-2xl border border-border-card">
                                    <p className="text-[10px] uppercase text-text-muted font-bold mb-1 flex items-center gap-1">
                                        <CalendarIcon /> {t('endDate')}
                                    </p>

                                    <p className="font-bold">
                                        {formatFecha(fechaFin || endDate)}
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-linear-to-br from-teal/10 to-primary/10 rounded-2xl border border-border-card">
                                <p className="text-[10px] uppercase text-text-muted font-bold mb-2">
                                    {t('summary')}
                                </p>

                                <p className="text-sm leading-relaxed text-text-primary">
                                    {t('tripSummary')}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <p className="text-[10px] uppercase text-text-muted font-bold">
                                        {t('price')}
                                    </p>

                                    <p className="text-3xl font-black text-teal-glow">
                                        ${(precio || 0).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => {
                                        addReservation(viaje);
                                        setShowDetails(false);

                                        navigate('/reservas', {
                                            state: {
                                                trip: viaje
                                            }
                                        });
                                    }}
                                    className="px-8 py-4 bg-linear-to-r from-teal to-primary rounded-2xl text-white font-bold shadow-xl shadow-teal/20 hover:scale-105 transition-all uppercase tracking-widest"
                                >
                                    {t('reserve')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

export default TripCard;