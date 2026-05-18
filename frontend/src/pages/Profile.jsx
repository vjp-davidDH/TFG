import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { UserIcon, CalendarIcon, PhoneIcon, EditIcon, CheckIcon } from '../components/Icons';

const Profile = () => {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    
    // Initial state from localStorage or defaults
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : {
            nombre: 'David Rodríguez',
            cumpleanos: '1995-05-12',
            telefono: '+34 600 000 000',
            viajesReservados: 3,
            viajesCompletados: 12,
            miembroDesde: '2024'
        };
    });

    const handleSave = () => {
        setIsEditing(false);
        localStorage.setItem('user_profile', JSON.stringify(user));
    };

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
                        {user.nombre.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="text-center">
                        <h2 className="text-xl font-bold text-text-primary">{user.nombre}</h2>
                        <p className="text-xs text-text-muted font-bold uppercase tracking-widest mt-1">{t('memberSince')} {user.miembroDesde}</p>
                    </div>
                    <div className="w-full mt-4 space-y-3">
                        <div className="flex justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                            <span className="text-[10px] uppercase font-bold text-text-muted">{t('tripsReserved')}</span>
                            <span className="text-xs font-black text-teal-glow">{user.viajesReservados}</span>
                        </div>
                        <div className="flex justify-between p-3 bg-white/5 rounded-2xl border border-white/10">
                            <span className="text-[10px] uppercase font-bold text-text-muted">{t('tripsCompleted')}</span>
                            <span className="text-xs font-black text-primary-glow">{user.viajesCompletados}</span>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 glass p-10 rounded-[32px] space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h3 className="text-xl font-black flex items-center gap-3 uppercase tracking-tighter">
                            <UserIcon /> {t('name')}
                        </h3>
                        <button 
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                isEditing ? 'bg-teal text-white shadow-lg' : 'bg-white/10 hover:bg-white/20'
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
                                    value={user.nombre}
                                    onChange={(e) => setUser({...user, nombre: e.target.value})}
                                    disabled={!isEditing}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-2">{t('birthday')}</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"><CalendarIcon /></span>
                                <input 
                                    type="date"
                                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-border-card rounded-2xl focus:outline-hidden focus:border-teal/50 disabled:opacity-50 text-text-primary text-sm transition-all"
                                    value={user.cumpleanos}
                                    onChange={(e) => setUser({...user, cumpleanos: e.target.value})}
                                    disabled={!isEditing}
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
                                    value={user.telefono}
                                    onChange={(e) => setUser({...user, telefono: e.target.value})}
                                    disabled={!isEditing}
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
