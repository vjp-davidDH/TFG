import React from 'react';
import Navbar from './Navbar';
import BackgroundOrbs from './BackgroundOrbs';
import LanguageToggle from './LanguageToggle';

const MainLayout = ({ children }) => {
    return (
        <div className="app-container">
            <BackgroundOrbs />
            <Navbar />
            <main className="dash-main">
                {children}
            </main>
            <LanguageToggle />
        </div>
    );
};

export default MainLayout;
