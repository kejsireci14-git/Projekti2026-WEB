import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetServicesQuery, useDeleteServiceMutation } from '../features/apiSlice';
import { toList } from '../utils/helpers';
import './Services.css';

const CATEGORIES = [
    { value: '', label: 'Të Gjitha' },
    { value: 'flok', label: 'Flokë' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'thonje', label: 'Thonje' },
    { value: 'qerpik', label: 'Qerpikë' },
    { value: 'facial', label: 'Facial' },
    { value: 'tjera', label: 'Të Tjera' },
];

export default function Service() {
    const [category, setCategory] = useState('');
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetServicesQuery(category || undefined);
    const [deleteService] = useDeleteServiceMutation();
    const [msg, setMsg] = useState('');

    const handleDelete = async (id) => {
        if (!window.confirm('Jeni i sigurt që doni të fshini këtë shërbim?')) return;
        try {
            await deleteService(id).unwrap();
            setMsg('Shërbimi u fshi me sukses!');
            setTimeout(() => setMsg(''), 3000);
        } catch (e) {
            setMsg(e.data?.message || 'Gabim gjatë fshirjes.');
        }
    };

    const services = toList(data);

    return (
        <div className="services-page">
            <div className="services-hero">
                <div className="container">
                    <p className="section-eyebrow">✦ Eksperiencë Premium ✦</p>
                    <h1>Shërbimet Tona</h1>
                    <p className="services-hero-sub">Çdo shërbim i projektuar me kujdes për bukurinë tuaj</p>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                {msg && <div className="alert alert-success">{msg}</div>}

                <div className="category-filters">
                    {CATEGORIES.map((c) => (
                        <button key={c.value}
                            className={`filter-btn ${category === c.value ? 'active' : ''}`}
                            onClick={() => setCategory(c.value)}>
                            {c.label}
                        </button>
                    ))}
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="btn btn-rose btn-sm" style={{ marginLeft: 'auto' }}>
                            + Shto Shërbim
                        </Link>
                    )}
                </div>

                {isLoading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="services-list-grid">
                        {!services.length ? (
                            <div className="empty-state">
                                <p>Nuk u gjetën shërbime për këtë kategori.</p>
                            </div>
                        ) : (
                            services.map((service) => (
                                <div key={service._id} className="service-item card">
                                    <div className="service-item-header">
                                        <div>
                                            <span className="service-category-badge">{service.category}</span>
                                            <h3>{service.name}</h3>
                                        </div>
                                        <div className="service-meta">
                                            <span>⏱ {service.duration} min</span>
                                        </div>
                                    </div>
                                    <p className="service-item-desc">{service.description}</p>
                                    <div className="service-item-footer">
                                        <span className="service-price-big">{service.price} <small>LEK</small></span>
                                        <div className="service-actions">
                                            <Link to="/appointments/new" className="btn btn-primary btn-sm">Rezervo</Link>
                                            {user?.role === 'admin' && (
                                                <button className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(service._id)}>Fshi</button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}