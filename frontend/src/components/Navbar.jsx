import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { 
    SearchIcon, SunIcon, MoonIcon, UserIcon, 
    TicketIcon, StarIcon, LogoutIcon, PlaneIcon 
} from './Icons';

const Navbar = ({ onSearch }) => {
    const { t, toggleLanguage, lang } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-bg-deep border-b border-border-card shadow-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-5">
                <Link to="/" className="flex items-center gap-2.5 shrink-0 hover:opacity-80 transition-opacity">
                    <span className="text-teal drop-shadow-[0_0_10px_rgba(20,255,200,0.8)]" aria-hidden="true">
                        <PlaneIcon />
                    </span>
                    <span className="text-xl font-extrabold tracking-tight bg-linear-to-r from-teal to-primary bg-clip-text text-transparent uppercase">
                        TripCollab
                    </span>
                </Link>

                <div className="flex-1 flex justify-center">
                    <div className="relative w-full max-w-md">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted" aria-hidden="true"><SearchIcon /></span>
                        <input 
                            type="search" 
                            placeholder={t('searchPlaceholder')}
                            className="w-full pl-10 pr-4 py-2 bg-input-bg border border-input-border rounded-xl text-sm focus:outline-hidden focus:border-teal/50 transition-all text-text-primary placeholder:text-text-muted"
                            onChange={(e) => onSearch(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                    <button 
                        onClick={toggleLanguage}
                        className="w-10 h-10 rounded-xl bg-bg-card border border-border-card flex items-center justify-center text-xs font-bold hover:bg-white/10 transition-all text-text-primary"
                        title="Change Language"
                    >
                        {lang.toUpperCase()}
                    </button>

                    <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-xl bg-bg-card border border-border-card flex items-center justify-center hover:bg-white/10 transition-all text-text-primary"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
                    </button>

                    <div className="relative" ref={dropdownRef}>
                        <button 
                            className="w-10 h-10 rounded-full bg-linear-to-br from-teal to-primary border-2 border-teal/40 flex items-center justify-center text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            JD
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-bg-deep border border-border-card shadow-2xl rounded-2xl overflow-hidden py-2 animate-in fade-in zoom-in-95 duration-200">
                                <Link to="/perfil" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors text-text-primary">
                                    <UserIcon /> {t('viewProfile')}
                                </Link>
                                <Link to="/reservas" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors text-text-primary">
                                    <TicketIcon /> {t('myReservations')}
                                </Link>
                                <Link to="/favoritos" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors text-text-primary">
                                    <StarIcon /> {t('myFavorites')}
                                </Link>
                                <div className="h-px bg-white/5 my-1 mx-2"></div>
                                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                                    <LogoutIcon /> {t('logout')}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
