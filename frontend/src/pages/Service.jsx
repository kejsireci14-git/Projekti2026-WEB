import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetServicesQuery, useDeleteServiceMutation } from '../features/apiSlice';
import './Services.css';

const CATEGORIES = [
    { value: '', label: 'Te Gjitha' },
    { value: 'flok', label: 'Floke' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'thonje', label: 'Thonje' },
    { value: 'qerpik', label: 'Qerpike' },
    { value: 'facial', label: 'Facial' },
    { value: 'tjera', label: 'Te Tjera' },
];

const SERVICE_PHOTOS = {
    "Prerje Flokësh": "/prerje_flokesh.png",
    "Ngjyrosje Flokësh": "/ngjyrosje_flokesh.jpg",
    "Balayage": "/balayage.jpg",
    "Keratin Treatment": "/keratin.jpg",
    "Makeup Dasmës": "/makeup_dasme.jpg",
    "Makeup Festiv": "/makeup_festiv.jpg",
    "Manikyr Klasik": "/manikyr_klasik.jpg",
    "Gel Manikyr": "/gel_manikyr.jpg",
    "Pedikyri": "/pedikyr.jpg",
    "Zgjatim Qerpikësh": "/zgjatim_qerpik.jpg",
    "Ngjyrosje Qerpikësh": "/ngjyrosje_qerpish.jpg",
    "Facial Classic": "/facial.avif",
};

const CATEGORY_ICONS = {
    flok: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
            <path d="M6 3c0 0 1 2 1 4s-2 3-2 5 2 4 5 4 5-2 5-4-2-3-2-5 1-4 1-4" />
            <path d="M12 11c0 0 2 1.5 2 4s-2 4-2 4" />
            <circle cx="18" cy="5" r="2" />
            <path d="M16 5c0 0-2 3-2 6" />
        </svg>
    ),
    makeup: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
            <path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2 4.5V20a2 2 0 004 0v-8.5c1-1 2-2.5 2-4.5 0-3-2-5-3-5z" />
            <path d="M9 7h6" />
        </svg>
    ),
    thonje: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
            <path d="M8 3C6 3 5 5 5 7c0 3 2 5 2 9a2 2 0 004 0c0-4 2-6 2-9 0-2-1-4-3-4z" />
            <path d="M16 5c1 0 2 2 2 4 0 2-1 4-1 7a1.5 1.5 0 003 0c0-3-1-5-1-7 0-2-1-4-3-4z" />
        </svg>
    ),
    qerpik: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    facial: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9.5c0 0 .5-1 1.5-1s1.5 1 1.5 1" />
            <path d="M12 9.5c0 0 .5-1 1.5-1s1.5 1 1.5 1" />
            <path d="M9 15c0 0 1 2 3 2s3-2 3-2" />
        </svg>
    ),
    tjera: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="24" height="24">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
    ),
};

export default function Service() {
    const [category, setCategory] = useState('');
    const { user } = useSelector((state) => state.auth);
    const { data, isLoading } = useGetServicesQuery(category || undefined);
    const [deleteService] = useDeleteServiceMutation();
    const [msg, setMsg] = useState('');

    const handleDelete = async (id) => {
        if (!window.confirm('Jeni i sigurt qe doni te fshini kete sherbim?')) return;
        try {
            await deleteService(id).unwrap();
            setMsg('Sherbimi u fshi me sukses!');
            setTimeout(() => setMsg(''), 3000);
        } catch (e) {
            setMsg(e.data?.message || 'Gabim gjate fshirjes.');
        }
    };

    return (
        <div className="services-page">
            <div className="services-hero">
                <div className="services-hero-bg"></div>
                <div className="container services-hero-content">
                    <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Eksperience Premium</p>
                    <h1>Sherbimet Tona</h1>
                    <p className="services-hero-sub">Cdo sherbim i projektuar me kujdes per bukurine tuaj</p>
                    <div className="services-hero-cats">
                        {CATEGORIES.filter(c => c.value).map(c => (
                            <button key={c.value}
                                className={`hero-cat-btn ${category === c.value ? 'active' : ''}`}
                                onClick={() => setCategory(c.value)}>
                                {c.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container services-container">
                {msg && <div className="alert alert-success">{msg}</div>}

                <div className="services-toolbar">
                    <div className="category-filters">
                        {CATEGORIES.map((c) => (
                            <button key={c.value}
                                className={`filter-btn ${category === c.value ? 'active' : ''}`}
                                onClick={() => setCategory(c.value)}>
                                {c.label}
                            </button>
                        ))}
                    </div>
                    {user?.role === 'admin' && (
                        <Link to="/admin" className="btn btn-rose btn-sm">+ Shto Sherbim</Link>
                    )}
                </div>

                {isLoading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className="services-list-grid">
                        {!data?.data?.length ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="48" height="48">
                                        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                                    </svg>
                                </div>
                                <p>Nuk u gjeten sherbime per kete kategori.</p>
                            </div>
                        ) : (
                            data.data.map((service) => (
                                <div key={service._id} className="service-item card">
                                    {SERVICE_PHOTOS[service.name] ? (
                                        <div className="service-item-photo">
                                            <img src={SERVICE_PHOTOS[service.name]} alt={service.name} />
                                        </div>
                                    ) : (
                                        <div className="service-item-no-photo">
                                            <div className="service-item-icon">
                                                {CATEGORY_ICONS[service.category] || CATEGORY_ICONS.tjera}
                                            </div>
                                        </div>
                                    )}
                                    <div className="service-item-content">
                                        <div className="service-item-badges">
                                            <span className="service-category-badge">{service.category}</span>
                                            <span className="service-duration-badge">{service.duration} min</span>
                                        </div>
                                        <h3>{service.name}</h3>
                                        <p className="service-item-desc">{service.description}</p>
                                        <div className="service-item-footer">
                                            <span className="service-price-big">
                                                {service.price} <small>LEK</small>
                                            </span>
                                            <div className="service-actions">
                                                <Link to="/appointments/new" className="btn btn-primary btn-sm">Rezervo</Link>
                                                {user?.role === 'admin' && (
                                                    <button className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(service._id)}>Fshi</button>
                                                )}
                                            </div>
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