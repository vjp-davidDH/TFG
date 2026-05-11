import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { MailIcon, LockIcon, SunIcon, MoonIcon, PlaneIcon, GoogleIcon } from '../components/Icons';
import apiClient from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { t, toggleLanguage, lang } = useLanguage();
    const { theme, toggleTheme } = useTheme();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await apiClient.auth.login(email, password);
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.usuario));
            navigate('/');
        } catch (error) {
            alert('Error de login: ' + error.message);
        }
    };

    const handleGoogleLogin = () => {
        // Simulate Google Auth
        localStorage.setItem('token', 'google-token');
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
            {/* Toggles corner */}
            <div className="absolute top-6 right-6 flex gap-3 z-10">
                <button 
                    onClick={toggleLanguage}
                    className="w-10 h-10 rounded-xl bg-bg-card border border-border-card flex items-center justify-center text-xs font-bold hover:bg-white/10 transition-all text-text-primary"
                >
                    {lang.toUpperCase()}
                </button>
                <button 
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-xl bg-bg-card border border-border-card flex items-center justify-center hover:bg-white/10 transition-all text-text-primary"
                >
                    {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                </button>
            </div>

            <div className="glass w-full max-w-md p-10 rounded-[40px] shadow-3xl animate-in fade-in zoom-in-95 duration-500 relative z-10">
                <header className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-br from-teal to-primary shadow-lg shadow-teal/20 mb-6 animate-plane-slow">
                        <span className="text-white scale-125">
                            <PlaneIcon />
                        </span>
                    </div>
                    <h1 className="text-3xl font-black bg-linear-to-r from-teal-glow to-primary-glow bg-clip-text text-transparent uppercase tracking-tight">TripCollab</h1>
                    <p className="text-text-muted mt-2 font-bold uppercase text-[10px] tracking-widest">{t('loginSubtitle')}</p>
                </header>

                <div className="space-y-4">
                    <button 
                        onClick={handleGoogleLogin}
                        className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all group"
                    >
                        <GoogleIcon />
                        <span className="text-sm font-bold text-text-primary group-hover:text-teal-glow transition-colors">{t('loginWithGoogle')}</span>
                    </button>

                    <div className="flex items-center gap-4 my-6">
                        <div className="h-px bg-white/5 flex-1"></div>
                        <span className="text-[10px] font-black uppercase text-text-muted tracking-widest">o</span>
                        <div className="h-px bg-white/5 flex-1"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-4">{t('email')}</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted"><MailIcon /></span>
                                <input 
                                    type="email" 
                                    className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-hidden focus:border-teal/50 transition-all text-sm text-text-primary placeholder:text-text-muted"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-4">{t('password')}</label>
                            <div className="relative">
                                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted"><LockIcon /></span>
                                <input 
                                    type="password" 
                                    className="w-full pl-14 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-hidden focus:border-teal/50 transition-all text-sm text-text-primary placeholder:text-text-muted"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full py-4 bg-linear-to-r from-teal to-primary rounded-2xl text-white font-black shadow-xl shadow-teal/30 hover:scale-[1.01] transition-all uppercase tracking-widest mt-4">
                            {t('loginBtn')} →
                        </button>
                    </form>
                </div>

                <footer className="mt-8 text-center">
                    <p className="text-sm text-text-muted">
                        {t('noAccount')} <Link to="/register" className="text-teal-glow font-bold hover:underline">{t('registerNow')}</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Login;
