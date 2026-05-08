import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Booking = () => {
    const { t } = useLanguage();
    const [booking, setBooking] = useState({
        destino: '',
        fechaIda: '',
        fechaVuelta: '',
        pasajeros: 1,
        clase: 'economy'
    });

    return (
        <div className="booking-page">
            <header className="dash-header">
                <div className="dash-header-text">
                    <h1 className="dash-title">{t('reserva-title')}</h1>
                    <p className="dash-subtitle">{t('reserva-subtitle')}</p>
                </div>
            </header>

            <div className="reserva-container">
                <section className="booking-form-card">
                    <h2 className="section-title">📍 Información del Destino</h2>
                    <div className="input-group-v2">
                        <select 
                            value={booking.destino}
                            onChange={(e) => setBooking({...booking, destino: e.target.value})}
                        >
                            <option value="">Selecciona un destino...</option>
                            <option value="paris">París, Francia</option>
                            <option value="tokyo">Tokio, Japón</option>
                            <option value="newyork">Nueva York, USA</option>
                        </select>
                    </div>

                    <div className="form-grid-v2">
                        <div className="input-group-v2">
                            <label>Fecha de Ida</label>
                            <input type="date" />
                        </div>
                        <div className="input-group-v2">
                            <label>Fecha de Vuelta</label>
                            <input type="date" />
                        </div>
                    </div>

                    <div className="form-grid-v2">
                        <div className="input-group-v2">
                            <label>Pasajeros</label>
                            <input type="number" min="1" value={booking.pasajeros} />
                        </div>
                        <div className="input-group-v2">
                            <label>Clase</label>
                            <select>
                                <option value="economy">Económica</option>
                                <option value="business">Business</option>
                                <option value="first">Primera Clase</option>
                            </select>
                        </div>
                    </div>

                    <button className="btn-primary" style={{width: '100%', marginTop: '32px'}}>
                        {t('reserva-btn-confirmar')}
                    </button>
                </section>

                <aside className="summary-card-v2">
                    <h2>Resumen</h2>
                    <div className="summary-list">
                        <div className="summary-row"><span>Vuelo</span><span>$450</span></div>
                        <div className="summary-row"><span>Seguro</span><span>$45</span></div>
                        <div className="summary-total-row"><span>Total</span><span>$495</span></div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Booking;
