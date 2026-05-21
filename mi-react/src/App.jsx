import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { TripProvider } from './context/TripContext';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Reservation from './pages/Reservation';
import Profile from './pages/Profile';
import MyReservations from './pages/MyReservations';
import Favorites from './pages/Favorites';
import Navbar from './components/Navbar';
import BackgroundOrbs from './components/BackgroundOrbs';
import './index.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const isAuthenticated = !!token;

  return (
    <LanguageProvider>
      <ThemeProvider>
        <TripProvider>
          <Router>
            <div className="relative min-h-screen selection:bg-teal/30 selection:text-teal-glow">
              <BackgroundOrbs />
              
              {isAuthenticated && <Navbar onSearch={setSearchTerm} />}
              
              <Routes>
                <Route 
                  path="/" 
                  element={isAuthenticated ? <Dashboard searchTerm={searchTerm} /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/login" 
                  element={!isAuthenticated ? <Login /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/register" 
                  element={!isAuthenticated ? <Register /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/reserva" 
                  element={isAuthenticated ? <Reservation /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/perfil" 
                  element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/reservas" 
                  element={isAuthenticated ? <MyReservations /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/favoritos" 
                  element={isAuthenticated ? <Favorites /> : <Navigate to="/login" />} 
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
          </Router>
        </TripProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
