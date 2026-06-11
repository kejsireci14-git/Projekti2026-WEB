import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../features/apiSlice';
import { setCredentials } from '../features/authSlice';
import './Auth.css';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [login, { isLoading }] = useLoginMutation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
        if (isAuthenticated) navigate(from, { replace: true });
    }, [isAuthenticated]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const result = await login(form).unwrap();
            const { token, ...user } = result;
            dispatch(setCredentials({ user, token }));
            navigate(from, { replace: true });
        } catch (err) {
            setError(err.data?.message || 'Kyçja dështoi. Provoni sërish.');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-ornament"></div>
            <div className="auth-box card fade-in">
                <div className="auth-header">
                    <div className="auth-logo">✦</div>
                    <h1>Mirë u kthyet</h1>
                    <p>Kyçuni në llogarinë tuaj</p>
                </div>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="emri@email.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Fjalëkalimi</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                        {isLoading ? 'Duke u kyçur...' : 'Kyçu'}
                    </button>
                </form>

                <div className="divider"><span>✦</span></div>

                <p className="auth-switch">
                    Nuk keni llogari? <Link to="/register">Regjistrohu falas</Link>
                </p>
            </div>
        </div>
    );
}