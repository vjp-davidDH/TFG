import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import { MapPinIcon, CalendarIcon, CheckIcon } from './Icons';

const TripCard = ({ viaje, showReserve = true, showConfirm = false, onConfirm }) => {
    const { t } = useLanguage();
    const { addReservation } = useTrips();
    const [showDetails, setShowDetails] = useState(false);
    
    const { titulo, title, destino, destination, fechaInicio, startDate, fechaFin, endDate, rol, precio } = viaje;
    
    const displayTitulo = titulo || title || 'Sin título';
    const displayDestino = destino || destination || 'Destino desconocido';
    
    const formatFecha = (isoStr) => {
        if (!isoStr) return '—';
        try {
            const d = new Date(isoStr);
            return d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        } catch {
            return isoStr;
        }
    };

    const currentRol = (rol || 'colaborador').toLowerCase();
    
    const rolStyles = {
        creador: 'bg-teal/20 text-teal-glow border-teal/40',
        admin: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        colaborador: 'bg-primary/20 text-primary-glow border-primary/40'
    }[currentRol];

    return (
        <article className="group card-3d stagger-in">
            <div className="card-3d-content glass flex flex-col gap-4 p-6 rounded-[28px] h-full">
                {/* Border Glow Animation */}
                <div className="border-glow"></div>
                {/* Shimmer Reflection */}
                <div className="shimmer"></div>
                
                <div className="flex items-start justify-between gap-2.5 relative z-10 transition-all duration-700 group-hover:translate-z-10 group-hover:translate-x-1">
                    <h2 className="text-lg font-bold text-text-primary leading-tight flex-1">{displayTitulo}</h2>
                    <span className={`shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${rolStyles}`}>
                        {t(currentRol)}
                    </span>
                </div>

                <p className="flex items-center gap-2 text-sm text-text-muted relative z-10 transition-all duration-700 group-hover:translate-z-5 group-hover:translate-x-2">
                    <MapPinIcon />
                    <span>{displayDestino}</span>
                </p>

                <div className="text-xl font-black text-teal-glow relative z-10 transition-all duration-700 group-hover:translate-z-12 group-hover:scale-110 origin-left">
                    ${(precio || 0).toLocaleString()}
                </div>

                <div className="grid grid-cols-2 gap-2 mt-auto relative z-10 group-hover:translate-z-5">
                    <button 
                        onClick={() => setShowDetails(true)}
                        className="py-2.5 rounded-xl bg-white/5 border border-border-card text-text-primary font-bold text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                    >
                        {t('viewDetails')}
                    </button>
                    
                    {showReserve && (
                        <button 
                            onClick={() => addReservation(viaje)}
                            className="py-2.5 rounded-xl bg-teal/20 border border-teal/40 text-teal font-bold text-xs hover:bg-teal hover:text-white transition-all shadow-lg hover:shadow-teal/20"
                        >
                            {t('reserve')}
                        </button>
                    )}

                    {showConfirm && (
                        <button 
                            onClick={() => onConfirm(viaje)}
                            className="col-span-2 py-3 rounded-xl bg-linear-to-r from-teal to-primary text-white font-bold text-xs shadow-lg shadow-teal/20 hover:scale-[1.02] transition-all uppercase tracking-widest"
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
                        <button className="absolute top-6 right-6 text-xl hover:opacity-50" onClick={() => setShowDetails(false)}>✕</button>
                        
                        <header className="mb-8">
                            <span className="text-[10px] uppercase tracking-widest text-teal-glow font-black">{t(currentRol)}</span>
                            <h2 className="text-3xl font-black mt-1">{displayTitulo}</h2>
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
                                    <p className="font-bold">{formatFecha(fechaInicio || startDate)}</p>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-border-card">
                                    <p className="text-[10px] uppercase text-text-muted font-bold mb-1 flex items-center gap-1">
                                        <CalendarIcon /> {t('endDate')}
                                    </p>
                                    <p className="font-bold">{formatFecha(fechaFin || endDate)}</p>
                                </div>
                            </div>

                            <div className="p-6 bg-linear-to-br from-teal/10 to-primary/10 rounded-2xl border border-border-card">
                                <p className="text-[10px] uppercase text-text-muted font-bold mb-2">{t('summary')}</p>
                                <p className="text-sm leading-relaxed text-text-primary">
                                    {t('tripSummary')}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <p className="text-[10px] uppercase text-text-muted font-bold">{t('price')}</p>
                                    <p className="text-3xl font-black text-teal-glow">${(precio || 0).toLocaleString()}</p>
                                </div>
                                <button 
                                    onClick={() => { addReservation(viaje); setShowDetails(false); }}
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
