import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import MainLayout from './components/MainLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Booking from './pages/Booking';

function App() {
  const isAuthenticated = !!localStorage.getItem('token') || true; // Demo mode always true

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/" element={
            isAuthenticated ? <MainLayout><Dashboard /></MainLayout> : <Navigate to="/login" />
          } />
          <Route path="/profile" element={
            isAuthenticated ? <MainLayout><Profile /></MainLayout> : <Navigate to="/login" />
          } />
          <Route path="/booking" element={
            isAuthenticated ? <MainLayout><Booking /></MainLayout> : <Navigate to="/login" />
          } />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
