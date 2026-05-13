import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TripCard from '../components/TripCard';

const Favorites = () => {
    const { t } = useLanguage();

    // Mock favorites
    const favorites = [
        { id: 201, titulo: 'Crucero por el Mediterráneo', destino: 'Roma, Italia', fechaInicio: '2026-07-15', fechaFin: '2026-07-30', rol: 'colaborador' }
    ];

    return (
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 animate-in fade-in duration-500">
            <header className="mb-10">
                <h1 className="text-4xl font-extrabold bg-linear-to-r from-accent to-primary bg-clip-text text-transparent">
                    {t('myFavorites')}
                </h1>
                <p className="text-text-muted mt-2">Tus destinos guardados</p>
            </header>

            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map(f => <TripCard key={f.id} viaje={f} />)}
                </div>
            ) : (
                <div className="glass p-20 rounded-[32px] text-center border-dashed border-2">
                    <div className="text-6xl mb-4">⭐</div>
                    <h2 className="text-xl font-bold">{t('emptyFavorites')}</h2>
                </div>
            )}
        </main>
    );
};

export default Favorites;
