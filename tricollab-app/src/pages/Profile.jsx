import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Profile = () => {
    const { t } = useLanguage();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {
        nombre: "Juan David",
        cumple: "1995-08-15",
        metodoPago: "visa"
    });

    const handleSave = () => {
        localStorage.setItem('user', JSON.stringify(user));
        alert("Perfil actualizado");
        window.location.reload(); // Para actualizar el avatar en el navbar
    };

    return (
        <div className="profile-page">
            <section className="profile-header">
                <div className="profile-avatar-large">
                    {user.nombre.substring(0, 1).toUpperCase()}
                </div>
                <div className="profile-title-group">
                    <h1>{user.nombre}</h1>
                    <p className="text-muted">Miembro desde Mayo 2024</p>
                </div>
            </section>

            <div className="profile-grid">
                <div className="profile-card stats-card">
                    <h3>{t('profile-stats-title')}</h3>
                    <div className="stats-row">
                        <div className="stat-item">
                            <span className="stat-value">2</span>
                            <span className="stat-label">{t('profile-pendientes')}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-value">5</span>
                            <span className="stat-label">{t('profile-realizados')}</span>
                        </div>
                    </div>
                </div>

                <div className="profile-card info-card">
                    <h3>{t('profile-personal-title')}</h3>
                    <div className="edit-group">
                        <label>{t('profile-label-name')}</label>
                        <input 
                            type="text" 
                            value={user.nombre}
                            onChange={(e) => setUser({...user, nombre: e.target.value})}
                        />
                    </div>
                    <div className="edit-group">
                        <label>{t('profile-label-birth')}</label>
                        <input 
                            type="date" 
                            value={user.cumple}
                            onChange={(e) => setUser({...user, cumple: e.target.value})}
                        />
                    </div>
                    <div className="edit-group">
                        <label>{t('profile-label-payment')}</label>
                        <select 
                            value={user.metodoPago}
                            onChange={(e) => setUser({...user, metodoPago: e.target.value})}
                        >
                            <option value="visa">Visa **** 4242</option>
                            <option value="mastercard">Mastercard **** 8888</option>
                            <option value="paypal">PayPal (jd@example.com)</option>
                        </select>
                    </div>
                    <button className="btn-primary" onClick={handleSave} style={{marginTop: '20px', width: '100%'}}>
                        {t('profile-btn-save')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
