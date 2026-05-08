import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user')) || { nombre: "Juan David" };
    const initials = user.nombre.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-inner">
                <Link to="/" className="nav-brand">
                    <span className="nav-logo-icon">✈</span>
                    <span className="nav-logo-text">{t('nav-logo-text')}</span>
                </Link>

                <div className="nav-center"></div>

                <div className="nav-right">
                    <div className="user-dropdown-container" ref={dropdownRef}>
                        <button className="nav-avatar" onClick={() => setIsOpen(!isOpen)}>
                            <span>{initials}</span>
                        </button>
                        
                        {isOpen && (
                            <div className="user-dropdown">
                                <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
                                    {t('dropdown-perfil')}
                                </Link>
                                <Link to="/" className="dropdown-item" onClick={() => setIsOpen(false)}>
                                    {t('dropdown-planes')}
                                </Link>
                                <button className="dropdown-item" onClick={() => setIsOpen(false)}>
                                    {t('dropdown-favs')}
                                </button>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item logout-item" onClick={handleLogout}>
                                    {t('dropdown-logout')}
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
