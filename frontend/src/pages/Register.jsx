import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../features/apiSlice';
import { setCredentials } from '../features/authSlice';
import './Auth.css';

export default function Register() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [register, { isLoading }] = useRegisterMutation();

    useEffect(() => {
        if (isAuthenticated) navigate('/');
    }, [isAuthenticated]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return setError('Fjalëkalimet nuk përputhen.');
        }
        if (form.password.length < 6) {
            return setError('Fjalëkalimi duhet të ketë të paktën 6 karaktere.');
        }
        try {
            const { confirmPassword, ...data } = form;
            const result = await register(data).unwrap();
            dispatch(setCredentials({ user: result.user, token: result.token }));
            navigate('/');
        } catch (err) {
            setError(err.data?.message || 'Regjistrimi dështoi. Provoni sërish.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-ornament"></div>
            <div className="auth-box auth-box-wide card fade-in">
                <div className="auth-header">
                    <div className="auth-logo">✦</div>
                    <h1>Bashkohuni me ne</h1>
                    <p>Krijoni llogarinë tuaj falas</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-row">
                        <div className="form-group">
                            <label>Emri i Plotë</label>
                            <input type="text" name="name" placeholder="Emri Mbiemri"
                                value={form.name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Telefoni</label>
                            <input type="tel" name="phone" placeholder="+355 6X XXX XXXX"
                                value={form.phone} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="emri@email.com"
                            value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="auth-row">
                        <div className="form-group">
                            <label>Fjalëkalimi</label>
                            <input type="password" name="password" placeholder="Min 6 karaktere"
                                value={form.password} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Konfirmo Fjalëkalimin</label>
                            <input type="password" name="confirmPassword" placeholder="Përsërit fjalëkalimin"
                                value={form.confirmPassword} onChange={handleChange} required />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                        {isLoading ? 'Duke u regjistruar...' : 'Krijo Llogarinë'}
                    </button>
                </form>

                <div className="divider"><span>✦</span></div>

                <p className="auth-switch">
                    Keni llogari? <Link to="/login">Kyçuni këtu</Link>
                </p>
            </div>
        </div>
    );
}
