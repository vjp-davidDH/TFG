import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundOrbs from '../components/BackgroundOrbs';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulación de login
        localStorage.setItem('token', 'demo-token');
        navigate('/');
    };

    return (
        <div className="login-page">
            <BackgroundOrbs />
            <div className="login-container">
                <div className="brand">
                    <span className="logo-icon">✈</span>
                    <h1 className="logo">TripCollab</h1>
                    <p className="tagline">Midnight Voyage Travel Planner</p>
                </div>

                <div className="login-box">
                    <h2>Bienvenido</h2>
                    <p className="subtitle">Accede a tu cuenta para continuar</p>
                    
                    <form onSubmit={handleLogin}>
                        <div className="input-group">
                            <span className="input-icon">✉</span>
                            <input 
                                type="email" 
                                placeholder="Correo electrónico" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </div>
                        <div className="input-group">
                            <span className="input-icon">🔒</span>
                            <input 
                                type="password" 
                                placeholder="Contraseña" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </div>

                        <div className="forgot-row">
                            <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
                        </div>

                        <button type="submit" className="btn-primary" style={{width: '100%'}}>
                            Iniciar Sesión <span className="btn-arrow">→</span>
                        </button>
                    </form>

                    <div className="divider">o continúa con</div>

                    <div className="social-row">
                        <button className="social-btn google-btn">
                            <img src="https://www.google.com/favicon.ico" alt="Google" width="16" /> Google
                        </button>
                    </div>

                    <p className="register-text">
                        ¿No tienes cuenta? <Link to="/register">Regístrate gratis</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
