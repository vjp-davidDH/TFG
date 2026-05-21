import React, { useState } from 'react';
import TripCard from '../components/TripCard';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/dark.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import { PlusIcon, MapPinIcon, CalendarIcon, SearchIcon } from '../components/Icons';

const Dashboard = ({ searchTerm }) => {
    const { t } = useLanguage();
    const { availableTrips, setAvailableTrips } = useTrips();
    const [filtro, setFiltro] = useState('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [nuevoViaje, setNuevoViaje] = useState({ titulo: '', destino: '', fechaInicio: null, fechaFin: null, precio: 500 });

    const handleCreateTrip = (e) => {
        e.preventDefault();
        if (!nuevoViaje.titulo || !nuevoViaje.destino || !nuevoViaje.fechaInicio || !nuevoViaje.fechaFin) {
            alert(t('errorFields'));
            return;
        }

        const trip = {
            id: Date.now(),
            titulo: nuevoViaje.titulo,
            destino: nuevoViaje.destino,
            fechaInicio: nuevoViaje.fechaInicio[0].toISOString().split('T')[0],
            fechaFin: nuevoViaje.fechaFin[0].toISOString().split('T')[0],
            rol: 'creador',
            precio: nuevoViaje.precio
        };

        setAvailableTrips([trip, ...availableTrips]);
        setIsModalOpen(false);
        setNuevoViaje({ titulo: '', destino: '', fechaInicio: null, fechaFin: null, precio: 500 });
    };

    const filteredViajes = availableTrips.filter(v => {
        const matchesFilter = filtro === 'todos' || v.rol.toLowerCase() === filtro.toLowerCase();
        const matchesSearch = searchTerm === '' || 
            (v.titulo || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (v.destino || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-teal-glow to-primary-glow bg-clip-text text-transparent uppercase">
                        {t('title')}
                    </h1>
                    <p className="text-text-muted mt-1.5 font-medium uppercase tracking-widest text-[10px]">
                        {t('exploring')} {availableTrips.length} {t('destinations')}
                    </p>
                </div>
                <button 
                    className="flex items-center gap-2 px-6 py-3 bg-linear-to-br from-teal to-primary rounded-2xl text-white font-bold shadow-lg shadow-teal/20 hover:scale-[1.02] transition-all active:scale-95"
                    onClick={() => setIsModalOpen(true)}
                >
                    <PlusIcon />
                    <span className="uppercase text-xs tracking-wider">{t('newTrip')}</span>
                </button>
            </header>

            <div className="flex gap-2.5 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {['todos', 'creador', 'admin', 'colaborador'].map(f => (
                    <button 
                        key={f}
                        className={`px-5 py-2 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${
                            filtro === f 
                            ? 'bg-teal/20 border-teal/50 text-teal-glow shadow-inner' 
                            : 'bg-white/5 border-white/10 text-text-muted hover:bg-white/10 hover:text-text-primary'
                        }`}
                        onClick={() => setFiltro(f)}
                    >
                        {f === 'todos' ? t('all') : t(f)}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredViajes.length > 0 ? (
                    filteredViajes.map(v => (
                        <TripCard key={v.id} viaje={v} showReserve={true} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <div className="text-6xl mb-6 text-text-muted/20 flex justify-center"><SearchIcon /></div>
                        <h2 className="text-2xl font-bold uppercase">{t('noResults')}</h2>
                        <p className="text-text-muted mt-2">{t('tryAnother')}</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
                    <form className="glass w-full max-w-xl p-8 rounded-[32px] shadow-3xl animate-in slide-in-from-bottom-8 duration-500" onSubmit={handleCreateTrip}>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-black bg-linear-to-r from-teal to-primary bg-clip-text text-transparent uppercase">
                                {t('newTrip')}
                            </h2>
                            <button type="button" className="p-2 hover:bg-white/10 rounded-full transition-colors" onClick={() => setIsModalOpen(false)}>✕</button>
                        </div>
                        <div className="space-y-4">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><PlusIcon /></span>
                                <input 
                                    type="text" placeholder={t('tripTitle')} 
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 transition-all text-text-primary placeholder:text-text-muted text-sm" 
                                    value={nuevoViaje.titulo}
                                    onChange={(e) => setNuevoViaje({...nuevoViaje, titulo: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><MapPinIcon /></span>
                                <select 
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 transition-all text-text-primary appearance-none text-sm" 
                                    value={nuevoViaje.destino}
                                    onChange={(e) => setNuevoViaje({...nuevoViaje, destino: e.target.value})}
                                    required
                                >
                                    <option value="" disabled className="bg-bg-deep">{t('destination')}</option>
                                    <option value="París, Francia" className="bg-bg-deep">París, Francia</option>
                                    <option value="Cusco, Perú" className="bg-bg-deep">Cusco, Perú</option>
                                    <option value="Tokyo, Japón" className="bg-bg-deep">Tokyo, Japón</option>
                                    <option value="Nueva York, USA" className="bg-bg-deep">Nueva York, USA</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-text-muted"><CalendarIcon /></span>
                                    <Flatpickr 
                                        placeholder={t('startDate')} 
                                        options={{ locale: Spanish, dateFormat: 'd/m/Y' }} 
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl text-text-primary text-sm" 
                                        value={nuevoViaje.fechaInicio}
                                        onChange={(date) => setNuevoViaje({...nuevoViaje, fechaInicio: date})}
                                        required
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-text-muted"><CalendarIcon /></span>
                                    <Flatpickr 
                                        placeholder={t('endDate')} 
                                        options={{ locale: Spanish, dateFormat: 'd/m/Y', minDate: nuevoViaje.fechaInicio ? nuevoViaje.fechaInicio[0] : null }} 
                                        className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl text-text-primary text-sm" 
                                        value={nuevoViaje.fechaFin}
                                        onChange={(date) => setNuevoViaje({...nuevoViaje, fechaFin: date})}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full py-4 bg-linear-to-r from-teal to-primary rounded-2xl text-white font-bold shadow-lg shadow-teal/30 hover:scale-[1.01] transition-all uppercase tracking-widest mt-4">
                                {t('createTrip')}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
