import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTrips } from '../context/TripContext';
import { CardIcon, CalendarIcon, LockIcon, MailIcon, TicketIcon } from '../components/Icons';

const Reservation = () => {
    const { t } = useLanguage();
    const { confirmBooking } = useTrips();
    const location = useLocation();
    const navigate = useNavigate();
    const trip = location.state?.trip;

    const [paymentMethod, setPaymentMethod] = useState('card');
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        paypalEmail: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!trip) navigate('/reservas');
    }, [trip, navigate]);

    if (!trip) return null;

    const handlePayment = (e) => {
        e.preventDefault();
        const newErrors = {};

        if (paymentMethod === 'card') {
            if (formData.cardNumber.length < 16) newErrors.cardNumber = true;
            if (formData.expiry.length < 5) newErrors.expiry = true;
            if (formData.cvv.length < 3) newErrors.cvv = true;
        } else if (paymentMethod === 'paypal') {
            if (!formData.paypalEmail.includes('@')) newErrors.paypalEmail = true;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            alert(t('errorFields'));
            return;
        }

        // Simulate payment
        alert(t('paymentSuccess'));
        confirmBooking(trip.id);
        navigate('/reservas');
    };

    return (
        <main className="max-w-7xl mx-auto px-6 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-500">
            <section className="lg:col-span-2 space-y-10">
                <header>
                    <h1 className="text-4xl font-black bg-linear-to-r from-teal-glow to-primary-glow bg-clip-text text-transparent uppercase tracking-tight">
                        {t('reservaTitle')}
                    </h1>
                    <p className="text-text-muted mt-2 font-bold uppercase text-[10px] tracking-widest">{t('reservaDesc')}</p>
                </header>

                <div className="glass p-10 rounded-[32px] space-y-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">{t('payWith')}</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {['card', 'paypal', 'apple', 'google'].map(method => (
                                <button 
                                    key={method}
                                    type="button"
                                    onClick={() => setPaymentMethod(method)}
                                    className={`py-4 rounded-2xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                                        paymentMethod === method 
                                        ? 'border-teal bg-teal/10 text-teal-glow' 
                                        : 'border-white/5 bg-white/5 text-text-muted hover:bg-white/10'
                                    }`}
                                >
                                    {method}
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handlePayment} className="space-y-6">
                        {paymentMethod === 'card' && (
                            <div className="space-y-4 animate-in slide-in-from-left-4">
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><CardIcon /></span>
                                    <input 
                                        type="text" placeholder={t('cardNumber')}
                                        className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-sm focus:outline-hidden transition-all text-text-primary ${errors.cardNumber ? 'border-red-500' : 'border-white/10 focus:border-teal/50'}`}
                                        value={formData.cardNumber}
                                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value.replace(/\D/g, '').slice(0,16)})}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><CalendarIcon /></span>
                                        <input 
                                            type="text" placeholder="MM/YY"
                                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-sm focus:outline-hidden transition-all text-text-primary ${errors.expiry ? 'border-red-500' : 'border-white/10 focus:border-teal/50'}`}
                                            value={formData.expiry}
                                            onChange={(e) => setFormData({...formData, expiry: e.target.value.slice(0,5)})}
                                        />
                                    </div>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><LockIcon /></span>
                                        <input 
                                            type="password" placeholder="CVV"
                                            className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-sm focus:outline-hidden transition-all text-text-primary ${errors.cvv ? 'border-red-500' : 'border-white/10 focus:border-teal/50'}`}
                                            value={formData.cvv}
                                            onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '').slice(0,3)})}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {paymentMethod === 'paypal' && (
                            <div className="relative animate-in slide-in-from-left-4">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><MailIcon /></span>
                                <input 
                                    type="email" placeholder="PayPal Email"
                                    className={`w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-sm focus:outline-hidden transition-all text-text-primary ${errors.paypalEmail ? 'border-red-500' : 'border-white/10 focus:border-teal/50'}`}
                                    value={formData.paypalEmail}
                                    onChange={(e) => setFormData({...formData, paypalEmail: e.target.value})}
                                />
                            </div>
                        )}

                        {(paymentMethod === 'apple' || paymentMethod === 'google') && (
                            <div className="p-10 bg-white/5 rounded-3xl border border-dashed border-white/20 text-center animate-in zoom-in-95">
                                <p className="text-sm font-bold text-text-muted">{t('paymentInfo')}</p>
                            </div>
                        )}

                        <button type="submit" className="w-full py-5 bg-linear-to-r from-teal to-primary rounded-[20px] font-black text-white shadow-2xl shadow-teal/30 hover:scale-[1.01] transition-all uppercase tracking-widest mt-4">
                            {t('payNow')} →
                        </button>
                    </form>
                </div>
            </section>

            <aside className="space-y-6">
                <div className="glass p-8 rounded-[32px] border-teal/20 bg-teal/5 sticky top-24">
                    <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter text-text-primary">
                        <TicketIcon /> {t('summary')}
                    </h2>
                    <div className="space-y-5 text-sm">
                        <div className="flex justify-between border-b border-white/5 pb-4">
                            <span className="text-text-muted font-bold uppercase text-[10px] tracking-widest">{t('tripTitle')}</span>
                            <span className="font-bold text-text-primary">{trip.titulo}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-4">
                            <span className="text-text-muted font-bold uppercase text-[10px] tracking-widest">{t('destination')}</span>
                            <span className="font-bold text-text-primary">{trip.destino}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                            <span className="text-xs font-black uppercase text-text-muted">{t('total')}</span>
                            <span className="text-3xl font-black text-teal-glow">${trip.precio?.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </main>
    );
};

export default Reservation;
