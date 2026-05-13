import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { UserIcon, PhoneIcon, EditIcon, CheckIcon, MailIcon, CalendarIcon, HashIcon } from '../components/Icons';
import apiClient from '../services/api';

const Profile = () => {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiClient.users.getProfile();
                setUser(data);
                localStorage.setItem('user', JSON.stringify(data));
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();

        const syncUser = () => {
            const saved = localStorage.getItem('user');
            setUser(saved ? JSON.parse(saved) : null);
        };
        window.addEventListener('storage', syncUser);
        return () => window.removeEventListener('storage', syncUser);
    }, []);

    const handleSave = async () => {
        try {
            const updatedUser = await apiClient.users.updateProfile(user);
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
            setIsEditing(false);
        } catch (error) {
            alert('Error al guardar el perfil: ' + error.message);
        }
    };

    if (loading && !user) {
        return (
            <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 animate-in fade-in duration-500">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="w-12 h-12 border-4 border-teal border-t-transparent rounded-full animate-spin"></div>
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h1 className="text-2xl font-bold text-center">{t('notLoggedIn') || 'No has iniciado sesión.'}</h1>
                <div className="text-center mt-6">
                    <Link to="/login" className="text-teal-glow font-bold hover:underline">Iniciar sesión</Link>
                </div>
            </main>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        try {
            return new Date(dateString).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return dateString;
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold bg-linear-to-r from-teal-glow to-primary bg-clip-text text-transparent uppercase tracking-tight">
                        {t('viewProfile') || 'Perfil'}
                    </h1>
                </div>
                <Link to="/" className="text-sm font-bold text-teal-glow hover:underline uppercase tracking-widest">← {t('back') || 'Volver'}</Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* User Sidebar */}
                <div className="glass p-8 rounded-[32px] flex flex-col items-center gap-4 h-fit">
                    <div className="w-24 h-24 rounded-full bg-linear-to-br from-teal to-primary flex items-center justify-center text-3xl font-black text-white border-4 border-white/10 shadow-2xl">
                        {user.nombre ? user.nombre.substring(0, 2).toUpperCase() : '?'}
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-text-primary">{user.nombre}</h2>
                        <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">{user.email}</p>
                    </div>
                    <div className="w-full h-px bg-white/5 my-2"></div>
                    <div className="w-full space-y-3">
                        <div className="flex items-center gap-3 text-text-muted">
                            <HashIcon />
                            <span className="text-[10px] font-bold uppercase tracking-widest">ID: {user.id_usuario}</span>
                        </div>
                        <div className="flex items-center gap-3 text-text-muted">
                            <CalendarIcon />
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t('memberSince')}: {formatDate(user.fecha_registro)}</span>
                        </div>
                    </div>
                </div>

                {/* Profile Details */}
                <div className="md:col-span-2 glass p-10 rounded-[32px] space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                            <UserIcon /> {t('details') || 'Detalles'}
                        </h3>
                        <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                isEditing ? 'bg-teal text-white shadow-lg shadow-teal/20' : 'bg-white/10 hover:bg-white/20'
                            }`}
                        >
                            {isEditing ? <><CheckIcon /> {t('save') || 'Guardar'}</> : <><EditIcon /> {t('edit') || 'Editar'}</>}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* ID Field (Read-only) */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('userId')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><HashIcon /></span>
                                <input 
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl opacity-50 text-text-primary text-sm transition-all"
                                    value={user.id_usuario || ''}
                                    disabled
                                />
                            </div>
                        </div>

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('name') || 'Nombre'}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><UserIcon /></span>
                                <input 
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.nombre || ''}
                                    onChange={(e) => setUser({ ...user, nombre: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('email') || 'Email'}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><MailIcon /></span>
                                <input 
                                    type="email"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.email || ''}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('phone') || 'Teléfono'}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><PhoneIcon /></span>
                                <input 
                                    type="tel"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.telefono || ''}
                                    onChange={(e) => setUser({ ...user, telefono: e.target.value })}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>

                        {/* Registration Date Field (Read-only) */}
                        <div className="space-y-2 sm:col-span-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('memberSince')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><CalendarIcon /></span>
                                <input 
                                    type="text"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl opacity-50 text-text-primary text-sm transition-all"
                                    value={formatDate(user.fecha_registro)}
                                    disabled
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
