import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import { MapPinIcon, CalendarIcon, CheckIcon } from './Icons';

// Import images for cards
// Cusco
import cuscoImg from '../assets/img/cusco/Cusco-2.jpg';
import cusco2Img from '../assets/img/cusco/cusco2.png';
import cusco3Img from '../assets/img/cusco/cusco3.jpg';
import cusco4Img from '../assets/img/cusco/cusco4.webp';

// Patagonia
import patagoniaImg from '../assets/img/patagonia/patagonia.jpg';
import patagonia2Img from '../assets/img/patagonia/patagonia2.jfif';
import patagonia3Img from '../assets/img/patagonia/patagonia3.webp';

// Samarcanda
import samarcandaImg from '../assets/img/samarcanda/Samarcanda.jpg';
import samarcanda2Img from '../assets/img/samarcanda/samarcada2.jfif';
import samarcanda3Img from '../assets/img/samarcanda/samarcada3.jpg';
import samarcanda4Img from '../assets/img/samarcanda/samrcada4.jpg';

// Noruega
import fiordosImg from '../assets/img/noruega/fiordos-noruegos.webp';
import fiordos2Img from '../assets/img/noruega/noruega.jfif';
import fiordos3Img from '../assets/img/noruega/noruega2.jpg';
import fiordos4Img from '../assets/img/noruega/norueg3.jpg';

// Kenia
import keniaImg from '../assets/img/kenia/itinerario-viaje-kenia-2.webp';
import kenia2Img from '../assets/img/kenia/kenia.jpg';
import kenia3Img from '../assets/img/kenia/kenia2.jfif';
import kenia4Img from '../assets/img/kenia/kenia3.jpg';

// Miami
import miamiImg from '../assets/img/miami/miami.jfif';
import miami2Img from '../assets/img/miami/miami2.jpg';
import miami3Img from '../assets/img/miami/miami3.jfif';
import miami4Img from '../assets/img/miami/miami4.jpg';

// China
import murallaImg from '../assets/img/china/muralla china.jpg';
import china2Img from '../assets/img/china/china.jpg';
import china3Img from '../assets/img/china/china2.jfif';
import china4Img from '../assets/img/china/china3.jfif';

// New York
import newyorkImg from '../assets/img/newyork/new york.jfif';
import newyork2Img from '../assets/img/newyork/new york2.jfif';
import newyork3Img from '../assets/img/newyork/new york3.jfif';
import newyork4Img from '../assets/img/newyork/new york4.jpg';

// Egipto
import piramidesImg from '../assets/img/egipto/piramides.jfif';
import egipto2Img from '../assets/img/egipto/egipto2.jfif';
import egipto3Img from '../assets/img/egipto/egipto3.jpg';
import egipto4Img from '../assets/img/egipto/egipto4.jpg';

// Islandia
import reikiavikImg from '../assets/img/islandia/reikiavik.webp';
import islandia2Img from '../assets/img/islandia/islandia1.jpeg';
import islandia3Img from '../assets/img/islandia/islandia2.avif';
import islandia4Img from '../assets/img/islandia/islandia3.webp';

// Tokyo
import tokyoImg from '../assets/img/tokyo/tokyo.jpg';
import tokyo2Img from '../assets/img/tokyo/tokyo2.jfif';
import tokyo3Img from '../assets/img/tokyo/tokyo3.jfif';
import tokyo4Img from '../assets/img/tokyo/tokyo4.jpg';

// Paris
import eiffelImg from '../assets/img/paris/torre-eiffel-altura.avif';
import paris2Img from '../assets/img/paris/paris2.jpg';
import paris3Img from '../assets/img/paris/paris3.jpg';
import paris4Img from '../assets/img/paris/paris4.jfif';

const getTripImages = (viaje) => {
    if (!viaje) return [eiffelImg, paris2Img, paris3Img, paris4Img];
    const dest = (viaje.destino || viaje.destination || '').toLowerCase();
    const tit = (viaje.titulo || viaje.title || '').toLowerCase();

    if (dest.includes('cusco') || tit.includes('andes') || tit.includes('cusco')) {
        return [cuscoImg, cusco2Img, cusco3Img, cusco4Img];
    }
    if (dest.includes('chile') || dest.includes('patagonia') || tit.includes('patagonia')) {
        return [patagoniaImg, patagonia2Img, patagonia3Img];
    }
    if (dest.includes('uzbek') || dest.includes('samar') || tit.includes('seda') || tit.includes('samar')) {
        return [samarcandaImg, samarcanda2Img, samarcanda3Img, samarcanda4Img];
    }
    if (dest.includes('noruega') || dest.includes('oslo') || tit.includes('fiordo') || tit.includes('norue')) {
        return [fiordosImg, fiordos2Img, fiordos3Img, fiordos4Img];
    }
    if (dest.includes('kenya') || dest.includes('nairobi') || tit.includes('safari') || tit.includes('kenya')) {
        return [keniaImg, kenia2Img, kenia3Img, kenia4Img];
    }
    if (dest.includes('miami') || tit.includes('caribe') || tit.includes('miami')) {
        return [miamiImg, miami2Img, miami3Img, miami4Img];
    }
    if (dest.includes('china') || dest.includes('beijing') || tit.includes('muralla')) {
        return [murallaImg, china2Img, china3Img, china4Img];
    }
    if (dest.includes('york') || tit.includes('broadway') || tit.includes('york')) {
        return [newyorkImg, newyork2Img, newyork3Img, newyork4Img];
    }
    if (dest.includes('egipto') || dest.includes('cairo') || tit.includes('pirámide') || tit.includes('piramide')) {
        return [piramidesImg, egipto2Img, egipto3Img, egipto4Img];
    }
    if (dest.includes('islandia') || dest.includes('reyk') || tit.includes('aurora') || tit.includes('reikiavik')) {
        return [reikiavikImg, islandia2Img, islandia3Img, islandia4Img];
    }
    if (dest.includes('tokyo') || dest.includes('japon') || dest.includes('japón') || tit.includes('tokyo') || tit.includes('tokio')) {
        return [tokyoImg, tokyo2Img, tokyo3Img, tokyo4Img];
    }
    if (dest.includes('paris') || dest.includes('parís') || dest.includes('francia') || tit.includes('euro') || tit.includes('eiffel')) {
        return [eiffelImg, paris2Img, paris3Img, paris4Img];
    }

    // Fallback based on id
    const defaultImageArrays = [
        [eiffelImg, paris2Img, paris3Img, paris4Img],
        [cuscoImg, cusco2Img, cusco3Img, cusco4Img],
        [tokyoImg, tokyo2Img, tokyo3Img, tokyo4Img],
        [keniaImg, kenia2Img, kenia3Img, kenia4Img],
        [reikiavikImg, islandia2Img, islandia3Img, islandia4Img],
        [miamiImg, miami2Img, miami3Img, miami4Img],
        [samarcandaImg, samarcanda2Img, samarcanda3Img, samarcanda4Img],
        [patagoniaImg, patagonia2Img, patagonia3Img],
        [newyorkImg, newyork2Img, newyork3Img, newyork4Img],
        [murallaImg, china2Img, china3Img, china4Img],
        [fiordosImg, fiordos2Img, fiordos3Img, fiordos4Img],
        [piramidesImg, egipto2Img, egipto3Img, egipto4Img]
    ];
    return defaultImageArrays[(viaje.id || 0) % defaultImageArrays.length];
};

const getTripImage = (viaje) => {
    const imgs = getTripImages(viaje);
    return imgs[0];
};

const getDestinoDescripcion = (viaje, t) => {
    if (viaje.destino_descripcion) return viaje.destino_descripcion;
    const dest = (viaje.destino || viaje.destination || '').toLowerCase();
    
    if (dest.includes('madrid')) return 'Capital de España con cultura, ocio y gastronomía.';
    if (dest.includes('parís') || dest.includes('paris')) return 'Ciudad turística famosa por la Torre Eiffel.';
    if (dest.includes('marrakech') || dest.includes('marrakesh')) return 'Ciudad imperial con zocos vibrantes.';
    if (dest.includes('tokio') || dest.includes('tokyo')) return 'Metrópolis futurista con raíces tradicionales.';
    if (dest.includes('londres') || dest.includes('london')) return 'Centro histórico y cultural global.';
    if (dest.includes('berlín') || dest.includes('berlin')) return 'Ciudad de historia moderna y arte.';
    if (dest.includes('roma')) return 'La ciudad eterna con monumentos antiguos.';
    if (dest.includes('nueva york') || dest.includes('new york') || dest.includes('ny')) return 'La gran manzana, nunca duerme.';
    if (dest.includes('lisboa') || dest.includes('lisbon')) return 'Ciudad de las siete colinas y fado.';
    if (dest.includes('praga') || dest.includes('prague')) return 'La ciudad de las cien torres.';
    if (dest.includes('viena') || dest.includes('vienna')) return 'Elegancia imperial y música clásica.';
    if (dest.includes('ámsterdam') || dest.includes('amsterdam')) return 'Canales históricos y ambiente liberal.';
    
    // For other places not in seed SQL but in mock data
    if (dest.includes('cusco') || dest.includes('perú') || dest.includes('peru')) return 'Antigua capital del Imperio Inca, famosa por su arqueología y arquitectura colonial.';
    if (dest.includes('patagonia') || dest.includes('chile')) return 'Región salvaje con majestuosos glaciares, montañas andinas y lagos turquesa.';
    if (dest.includes('samarcanda') || dest.includes('uzbek')) return 'Histórica ciudad de la Ruta de la Seda conocida por sus mezquitas y mausoleos.';
    if (dest.includes('noruega') || dest.includes('oslo') || dest.includes('fiordo')) return 'Impresionantes fiordos tallados por glaciares bajo el sol de medianoche.';
    if (dest.includes('kenia') || dest.includes('kenya') || dest.includes('nairobi')) return 'Reserva natural icónica para safaris de fauna salvaje en la sabana africana.';
    if (dest.includes('miami')) return 'Vibrante ciudad costera conocida por sus playas, arte art déco y vida nocturna.';
    if (dest.includes('china') || dest.includes('beijing')) return 'Una de las grandes maravillas del mundo, llena de templos antiguos y la gran muralla.';
    if (dest.includes('islandia') || dest.includes('reyk')) return 'Tierra de fuego y hielo con géiseres activos, cascadas y auroras boreales.';
    
    return 'Lugar espectacular lleno de encantos únicos por descubrir.';
};

const TripCard = ({ viaje, showReserve = true, showConfirm = false, onConfirm, onRemove, isBooked = false }) => {
    const { t } = useLanguage();
    const { addReservation } = useTrips();
    const [showDetails, setShowDetails] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();

    const { titulo, title, destino, destination, fechaInicio, startDate, fechaFin, endDate, rol, precio, descripcion, description, destino_descripcion } = viaje;

    const displayTitulo = titulo || title || 'Sin título';
    const displayDestino = destino || destination || 'Destino desconocido';
    const displayResumen = descripcion || description || viaje.resumen || viaje.summary || t('tripSummary');
    const displayDestinoDescripcion = getDestinoDescripcion(viaje, t);
    const tripImages = getTripImages(viaje);

    const handleOpenDetails = () => {
        setCurrentImageIndex(0);
        setShowDetails(true);
    };

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
            <div className={`card-3d-content glass flex flex-col gap-4 p-6 rounded-[28px] h-full relative overflow-hidden ${isBooked ? 'opacity-80 grayscale-[0.3]' : ''}`}>
                
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

                <p className="text-xs text-text-muted/80 relative z-10 transition-all duration-700 line-clamp-2">
                    {displayResumen}
                </p>

                <p className="flex items-center gap-2 text-sm text-text-muted relative z-10 transition-all duration-700">
                    <MapPinIcon />
                    <span>{displayDestino}</span>
                </p>

                <div className="text-xl font-black text-teal-glow relative z-10 transition-all duration-700 origin-left">
                    ${(precio || 0).toLocaleString()}
                </div>

                <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 mt-6 relative z-10">

                    <button
                        onClick={handleOpenDetails}
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

                    {isBooked && (
                        <div className="py-3 px-2 rounded-2xl bg-teal/10 border border-teal/20 text-teal text-center font-black text-[9px] uppercase tracking-wider flex items-center justify-center gap-1 shadow-inner leading-tight">
                            ✓ {t('paymentSuccessShort')}
                        </div>
                    )}
                </div>
            </div>

            {/* Details Modal */}
            {showDetails && createPortal(
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
                    <div className="glass w-full max-w-2xl p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] animate-in zoom-in-95 duration-300 relative my-8">

                        <button
                            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-sm font-bold hover:scale-105 z-20 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-white transition-all"
                            onClick={() => setShowDetails(false)}
                        >
                            ✕
                        </button>

                        {/* Image Carousel Header for details modal */}
                        <div className="relative overflow-hidden w-full h-48 sm:h-64 rounded-2xl border border-border-card/30 mb-6 group/carousel">
                            <img 
                                src={tripImages[currentImageIndex]} 
                                alt={`${displayTitulo} - ${currentImageIndex + 1}`} 
                                className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

                            {/* Carousel Arrows (only if multiple images exist) */}
                            {tripImages.length > 1 && (
                                <>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(prev => (prev === 0 ? tripImages.length - 1 : prev - 1));
                                        }}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 hover:scale-105 border border-white/10 rounded-full text-white font-bold transition-all shadow-md z-20"
                                        title="Previous image"
                                    >
                                        ⟨
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCurrentImageIndex(prev => (prev === tripImages.length - 1 ? 0 : prev + 1));
                                        }}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black/50 hover:bg-black/80 hover:scale-105 border border-white/10 rounded-full text-white font-bold transition-all shadow-md z-20"
                                        title="Next image"
                                    >
                                        ⟩
                                    </button>

                                    {/* Indicators / Dots */}
                                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                                        {tripImages.map((_, idx) => (
                                            <button
                                                key={idx}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(idx);
                                                }}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    idx === currentImageIndex 
                                                        ? 'bg-teal w-4' 
                                                        : 'bg-white/40 hover:bg-white/70'
                                                }`}
                                                title={`Go to image ${idx + 1}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Counter badge */}
                                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/50 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold rounded-lg z-20">
                                        {currentImageIndex + 1} / {tripImages.length}
                                    </div>
                                </>
                            )}
                        </div>

                        <header className="mb-6">
                            <span className="text-[10px] uppercase tracking-widest text-teal-glow font-black">
                                {t(currentRol)}
                            </span>

                            <h2 className="text-2xl sm:text-4xl font-black mt-1">
                                {displayTitulo}
                            </h2>

                            <p className="text-sm text-text-muted/80 mt-2">
                                {displayResumen}
                            </p>

                            <p className="text-text-muted mt-2 flex items-center gap-2">
                                <MapPinIcon /> {displayDestino}
                            </p>
                        </header>

                        <div className="space-y-6">

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    {t('aboutPlace')}
                                </p>

                                <p className="text-base leading-relaxed text-text-primary">
                                    {displayDestinoDescripcion}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/5">
                                <div>
                                    <p className="text-[10px] uppercase text-text-muted font-bold">
                                        {t('price')}
                                    </p>

                                    <p className="text-3xl font-black text-teal-glow">
                                        ${(precio || 0).toLocaleString()}
                                    </p>
                                </div>

                                {isBooked ? (
                                    <div className="px-6 py-3.5 bg-teal/10 border border-teal/20 text-teal rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-inner flex items-center justify-center gap-1.5 leading-none w-full sm:w-auto">
                                        ✓ {t('paymentSuccessShort')}
                                    </div>
                                ) : (
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
                                        className="px-8 py-4 bg-linear-to-r from-teal to-primary rounded-2xl text-white font-bold shadow-xl shadow-teal/20 hover:scale-105 transition-all uppercase tracking-widest w-full sm:w-auto text-center"
                                    >
                                        {t('reserve')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </article>
    );
};

export default TripCard;