import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
    const { lang, toggleLang } = useLanguage();

    return (
        <button className="lang-toggle" onClick={toggleLang}>
            <span>{lang.toUpperCase()}</span>
            <span className="lang-flag">{lang === 'es' ? '🇪🇸' : '🇺🇸'}</span>
        </button>
    );
};

export default LanguageToggle;
