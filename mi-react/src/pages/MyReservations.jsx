import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import TripCard from '../components/TripCard';

const MyReservations = () => {
    const { t } = useLanguage();
    const { reservations, bookedTrips } = useTrips();
    const navigate = useNavigate();

    const handleConfirm = (trip) => {
        // Redirect to payment (Reservation page) with trip details
        navigate('/reserva', { state: { trip } });
    };

    return (
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 animate-in fade-in duration-500 space-y-16">
            {/* Section 1: Pending Reservations */}
            <section>
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-black bg-linear-to-r from-teal-glow to-primary bg-clip-text text-transparent uppercase">
                            {t('myReservations')}
                        </h1>
                        <p className="text-text-muted mt-2 font-bold uppercase text-[10px] tracking-widest">{t('reservedTrips')}</p>
                    </div>
                </header>

                {reservations.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reservations.map(r => (
                            <TripCard 
                                key={r.id} 
                                viaje={r} 
                                showReserve={false} 
                                showConfirm={true} 
                                onConfirm={handleConfirm}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                        <div className="text-5xl mb-4">🎫</div>
                        <h2 className="text-xl font-bold text-text-muted">{t('emptyReservations')}</h2>
                    </div>
                )}
            </section>

            {/* Section 2: Already Booked (Paid) */}
            {bookedTrips.length > 0 && (
                <section>
                    <header className="mb-10">
                        <h2 className="text-3xl font-black bg-linear-to-r from-accent to-primary bg-clip-text text-transparent uppercase">
                            {t('bookedTrips')}
                        </h2>
                        <p className="text-text-muted mt-2 font-bold uppercase text-[10px] tracking-widest">{t('completedTrips')}</p>
                    </header>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {bookedTrips.map(b => (
                            <div key={b.id} className="relative opacity-80 grayscale-[0.3]">
                                <TripCard viaje={b} showReserve={false} />
                                <div className="absolute top-4 left-4 bg-teal text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
                                    ✓ {t('paymentSuccess')}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default MyReservations;
