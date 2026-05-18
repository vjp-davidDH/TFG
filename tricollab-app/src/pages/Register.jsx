import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import BackgroundOrbs from '../components/BackgroundOrbs';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'demo-token');
        localStorage.setItem('user', JSON.stringify({ nombre: name }));
        navigate('/');
    };

    return (
        <div className="login-page">
            <BackgroundOrbs />
            <div className="login-container">
                <div className="brand">
                    <span className="logo-icon">✈</span>
                    <h1 className="logo">TripCollab</h1>
                </div>

                <div className="login-box">
                    <h2>Únete a nosotros</h2>
                    <p className="subtitle">Crea tu cuenta gratis hoy mismo</p>
                    
                    <form onSubmit={handleRegister}>
                        <div className="input-group">
                            <span className="input-icon">👤</span>
                            <input 
                                type="text" 
                                placeholder="Nombre completo" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required 
                            />
                        </div>
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

                        <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '20px'}}>
                            Crear cuenta <span className="btn-arrow">→</span>
                        </button>
                    </form>

                    <p className="register-text" style={{marginTop: '20px'}}>
                        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
