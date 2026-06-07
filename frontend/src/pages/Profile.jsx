import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateProfileMutation } from '../features/apiSlice';
import { updateUser, logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import './Profile.css';

export default function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '' });
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await updateProfile(form).unwrap();
            dispatch(updateUser(result.user));
            setMsg('Profili u përditësua me sukses!');
            setTimeout(() => setMsg(''), 3000);
        } catch (err) {
            setError(err.data?.message || 'Gabim gjatë përditësimit.');
        }
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <div className="auth-page">
            <div className="auth-ornament"></div>
            <div className="auth-box auth-box-wide card fade-in">
                <div className="auth-header">
                    <div className="profile-avatar-lg">{user?.name?.[0]?.toUpperCase()}</div>
                    <h1>{user?.name}</h1>
                    <p className="profile-role">{user?.role === 'admin' ? 'Administrator' : 'Klient'}</p>
                </div>

                {msg && <div className="alert alert-success">{msg}</div>}
                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>Emri</label>
                        <input type="text" value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label>Telefoni</label>
                        <input type="tel" value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                        {isLoading ? 'Duke ruajtur...' : 'Ruaj Ndryshimet'}
                    </button>
                </form>

                <div className="divider"><span>✦</span></div>
                <button className="btn btn-outline btn-full" onClick={handleLogout}>Dil nga Llogaria</button>
            </div>
        </div>
    );
}
