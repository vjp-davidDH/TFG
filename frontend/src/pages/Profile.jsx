import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { UserIcon, CalendarIcon, PhoneIcon, EditIcon, CheckIcon, MailIcon } from '../components/Icons';
import apiClient from '../services/api';

const Profile = () => {
    const { t, lang } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [user, setUser] = useState({
        nombre: '',
        email: '',
        telefono: '',
        fecha_registro: ''
    });

    const [viajesReservadosCount, setViajesReservadosCount] = useState(0);
    const [viajesCompletadosCount, setViajesCompletadosCount] = useState(0);

    useEffect(() => {
        const fetchProfileData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch profile
                const profileData = await apiClient.users.getProfile();
                setUser(profileData);

                // Fetch reservations
                const reservations = await apiClient.reservations.getAll();
                setViajesReservadosCount(reservations.length);
                
                // Count confirmada/completada trips
                const completedCount = reservations.filter(r => r.estado === 'confirmada').length;
                setViajesCompletadosCount(completedCount);
            } catch (err) {
                console.error('Error fetching profile:', err);
                setError(err.message || 'Error al cargar perfil');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    const handleSave = async () => {
        try {
            const updatedUser = await apiClient.users.updateProfile({
                nombre: user.nombre,
                telefono: user.telefono,
                email: user.email
            });
            setUser(updatedUser);
            
            // Sync with local 'user' item for navbar/header display
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                parsed.nombre = updatedUser.nombre;
                parsed.telefono = updatedUser.telefono;
                parsed.email = updatedUser.email;
                localStorage.setItem('user', JSON.stringify(parsed));
                // Dispatch event to notify navbar/other listeners
                window.dispatchEvent(new Event('storage'));
            }
            setIsEditing(false);
        } catch (err) {
            alert('Error al guardar cambios: ' + err.message);
        }
    };

    const getInitials = (name) => {
        if (!name) return '??';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const memberSinceYear = user.fecha_registro ? new Date(user.fecha_registro).getFullYear() : '—';

    if (loading) {
        return (
            <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
                <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                    <div className="text-5xl mb-4 text-teal animate-pulse">⏳</div>
                    <h2 className="text-xl font-bold text-text-muted">Cargando perfil...</h2>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
                <div className="glass p-16 rounded-[32px] text-center border-dashed border-2 border-white/5 bg-white/[0.02]">
                    <div className="text-5xl mb-4">❌</div>
                    <h2 className="text-xl font-bold text-text-muted">{error}</h2>
                    <Link to="/" className="mt-4 inline-block text-teal-glow hover:underline uppercase tracking-widest text-xs font-bold">Volver al Inicio</Link>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold bg-linear-to-r from-teal-glow to-primary bg-clip-text text-transparent uppercase tracking-tight">
                        {t('viewProfile')}
                    </h1>
                </div>
                <Link to="/" className="text-sm font-bold text-teal-glow hover:underline uppercase tracking-widest">← {t('back')}</Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="glass p-8 rounded-[32px] flex flex-col items-center gap-4">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal to-primary flex items-center justify-center text-3xl font-black text-white border-4 border-white/10 shadow-2xl">
                        {getInitials(user.nombre)}
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-text-primary">{user.nombre || '—'}</h2>
                        <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">{t('memberSince')} {memberSinceYear}</p>
                    </div>
                    <div className="w-full mt-6 space-y-4">
                        <Link to="/reservas" className="flex flex-col items-center justify-center p-5 bg-white/5 rounded-2xl border border-white/10 text-center transition-all hover:bg-white/[0.07] hover:border-teal/30 cursor-pointer block">
                            <span className="text-3xl font-black text-teal-glow leading-none mb-2">{viajesReservadosCount}</span>
                            <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest leading-none">{t('tripsReserved')}</span>
                        </Link>
                        <div className="flex flex-col items-center justify-center p-5 bg-white/5 rounded-2xl border border-white/10 text-center transition-all hover:bg-white/[0.07]">
                            <span className="text-3xl font-black text-primary-glow leading-none mb-2">{viajesCompletadosCount}</span>
                            <span className="text-[10px] uppercase font-bold text-text-muted tracking-widest leading-none">{t('tripsCompleted')}</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 glass p-10 rounded-[32px] space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter text-text-primary">
                            <UserIcon /> {t('name')}
                        </h3>
                        <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                isEditing ? 'bg-teal text-white shadow-lg hover:bg-teal-glow' : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            {isEditing ? <><CheckIcon /> {t('save')}</> : <><EditIcon /> {t('edit')}</>}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('name')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><UserIcon /></span>
                                <input 
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.nombre || ''}
                                    onChange={(e) => setUser({...user, nombre: e.target.value})}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('registrationDate')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><CalendarIcon /></span>
                                <input 
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl text-text-primary text-sm disabled:opacity-75 cursor-not-allowed"
                                    value={user.fecha_registro ? new Date(user.fecha_registro).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'}
                                    disabled={true}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('phone')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><PhoneIcon /></span>
                                <input 
                                    type="tel"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.telefono || ''}
                                    onChange={(e) => setUser({...user, telefono: e.target.value})}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('email')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><MailIcon /></span>
                                <input 
                                    type="email"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.email || ''}
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    disabled={!isEditing}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;
