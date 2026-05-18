import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import { MapPinIcon, CalendarIcon, CheckIcon } from './Icons';

// Import images for cards
import cuscoImg from '../assets/img/Cusco-2.jpg';
import patagoniaImg from '../assets/img/Patagonia Salvaje.jfif';
import samarcandaImg from '../assets/img/Samarcanda.jpg';
import fiordosImg from '../assets/img/fiordos-noruegos.webp';
import keniaImg from '../assets/img/itinerario-viaje-kenia-2.webp';
import miamiImg from '../assets/img/miami.jfif';
import murallaImg from '../assets/img/muralla china.jpg';
import newyorkImg from '../assets/img/new york.jfif';
import piramidesImg from '../assets/img/piramides.jfif';
import reikiavikImg from '../assets/img/reikiavik.webp';
import tokyoImg from '../assets/img/tokyo.jpg';
import eiffelImg from '../assets/img/torre-eiffel-altura.avif';

const getTripImage = (viaje) => {
    if (!viaje) return eiffelImg;
    const dest = (viaje.destino || viaje.destination || '').toLowerCase();
    const tit = (viaje.titulo || viaje.title || '').toLowerCase();

    if (dest.includes('cusco') || tit.includes('andes') || tit.includes('cusco')) return cuscoImg;
    if (dest.includes('chile') || dest.includes('patagonia') || tit.includes('patagonia')) return patagoniaImg;
    if (dest.includes('uzbek') || dest.includes('samar') || tit.includes('seda') || tit.includes('samar')) return samarcandaImg;
    if (dest.includes('noruega') || dest.includes('oslo') || tit.includes('fiordo') || tit.includes('norue')) return fiordosImg;
    if (dest.includes('kenya') || dest.includes('nairobi') || tit.includes('safari') || tit.includes('kenya')) return keniaImg;
    if (dest.includes('miami') || tit.includes('caribe') || tit.includes('miami')) return miamiImg;
    if (dest.includes('china') || dest.includes('beijing') || tit.includes('muralla')) return murallaImg;
    if (dest.includes('york') || tit.includes('broadway') || tit.includes('york')) return newyorkImg;
    if (dest.includes('egipto') || dest.includes('cairo') || tit.includes('pirámide') || tit.includes('piramide')) return piramidesImg;
    if (dest.includes('islandia') || dest.includes('reyk') || tit.includes('aurora') || tit.includes('reikiavik')) return reikiavikImg;
    if (dest.includes('tokyo') || dest.includes('japon') || dest.includes('japón') || tit.includes('tokyo') || tit.includes('tokio')) return tokyoImg;
    if (dest.includes('paris') || dest.includes('parís') || dest.includes('francia') || tit.includes('euro') || tit.includes('eiffel')) return eiffelImg;

    // Fallback based on id
    const defaultImages = [
        eiffelImg, cuscoImg, tokyoImg, keniaImg, reikiavikImg, miamiImg,
        samarcandaImg, patagoniaImg, newyorkImg, murallaImg, fiordosImg, piramidesImg
    ];
    return defaultImages[(viaje.id || 0) % defaultImages.length];
};

const TripCard = ({ viaje, showReserve = true, showConfirm = false, onConfirm, onRemove }) => {
    const { t } = useLanguage();
    const { addReservation } = useTrips();
    const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

    const { titulo, title, destino, destination, fechaInicio, startDate, fechaFin, endDate, rol, precio } = viaje;

    const displayTitulo = titulo || title || 'Sin título';
    const displayDestino = destino || destination || 'Destino desconocido';

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
            <div className="card-3d-content glass flex flex-col gap-4 p-6 rounded-[28px] h-full relative overflow-hidden">
                
                {/* Image frame - beautifully adjusted to fit the space */}
                <div className="relative overflow-hidden w-full aspect-video rounded-2xl border border-border-card/25 shadow-inner transition-all duration-700">
                    <img 
                        src={getTripImage(viaje)} 
                        alt={displayTitulo} 
                        className="w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-[cubic-bezier(0.15,0.83,0.66,1)]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60"></div>
                </div>

                <div className="flex items-start justify-between gap-2.5 relative z-10 transition-all duration-700">
                    <h2 className="text-lg font-bold text-text-primary leading-tight flex-1">
                        {displayTitulo}
                    </h2>

                    <div className="flex flex-col items-end gap-2 shrink-0">
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
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${rolStyles}`}>
                            {t(currentRol)}
                        </span>
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
                            className="absolute top-6 right-6 text-sm font-bold hover:scale-105 z-20 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white transition-all"
                            onClick={() => setShowDetails(false)}
                        >
                            ✕
                        </button>

                        {/* Large Image Header for details modal */}
                        <div className="relative overflow-hidden w-full h-48 rounded-2xl border border-border-card/30 mb-6">
                            <img 
                                src={getTripImage(viaje)} 
                                alt={displayTitulo} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>

                        <header className="mb-6">
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