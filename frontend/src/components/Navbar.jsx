import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';
import './Navbar.css';

export default function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    console.log('NAVBAR USER:', user);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <div className="navbar-inner container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">✦</span>
                    <span>Glamour<em>Studio</em></span>
                </Link>

                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                    <span></span><span></span><span></span>
                </button>

                <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
                    <li><Link to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/services" className={isActive('/services') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Shërbimet</Link></li>
                    <li><Link to="/staff" className={isActive('/staff') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Ekipi</Link></li>

                    {isAuthenticated ? (
                        <>
                            <li><Link to="/appointments" className={isActive('/appointments') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Rezervimet</Link></li>
                            {user?.role === 'admin' && (
                                <li><Link to="/admin" className={isActive('/admin') ? 'active' : ''} onClick={() => setMenuOpen(false)}>Admin</Link></li>
                            )}
                            <li className="navbar-user">
                                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                                    <div className="avatar">
                                        {(user?.name?.[0] || user?.email?.[0] || '?').toUpperCase()}
                                    </div>
                                </Link>
                                <button className="btn btn-outline btn-sm" onClick={handleLogout}>Dil</button>
                            </li>
                        </>
                    ) : (
                        <li className="navbar-auth">
                            <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>Kyçu</Link>
                            <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Regjistrohu</Link>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
