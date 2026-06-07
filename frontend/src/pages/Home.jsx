import React from 'react';
import { Link } from 'react-router-dom';
import { useGetServicesQuery } from '../features/apiSlice';
import './Home.css';

const CATEGORY_LABELS = {
    flok: 'Floke', makeup: 'Makeup', thonje: 'Thonje',
    qerpik: 'Qerpike', facial: 'Facial', tjera: 'Te Tjera'
};

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
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M6 3c0 0 1 2 1 4s-2 3-2 5 2 4 5 4 5-2 5-4-2-3-2-5 1-4 1-4" />
            <path d="M12 11c0 0 2 1.5 2 4s-2 4-2 4" />
            <circle cx="18" cy="5" r="2" />
            <path d="M16 5c0 0-2 3-2 6" />
        </svg>
    ),
    makeup: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2 4.5V20a2 2 0 004 0v-8.5c1-1 2-2.5 2-4.5 0-3-2-5-3-5z" />
            <path d="M9 7h6" />
        </svg>
    ),
    thonje: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M8 3C6 3 5 5 5 7c0 3 2 5 2 9a2 2 0 004 0c0-4 2-6 2-9 0-2-1-4-3-4z" />
            <path d="M16 5c1 0 2 2 2 4 0 2-1 4-1 7a1.5 1.5 0 003 0c0-3-1-5-1-7 0-2-1-4-3-4z" />
        </svg>
    ),
    qerpik: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 5V3M17 7l1.5-1.5M19 12h2M17 17l1.5 1.5M12 19v2M7 17l-1.5 1.5M5 12H3M7 7L5.5 5.5" />
        </svg>
    ),
    facial: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9.5c0 0 .5-1 1.5-1s1.5 1 1.5 1" />
            <path d="M12 9.5c0 0 .5-1 1.5-1s1.5 1 1.5 1" />
            <path d="M9 15c0 0 1 2 3 2s3-2 3-2" />
            <path d="M3 12c0 0 2-1 3 0M18 12c1-1 3 0 3 0" />
        </svg>
    ),
    tjera: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="32" height="32">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
    )
};

const ServiceIcon = ({ category }) => (
    <div className="service-icon-wrap">{CATEGORY_ICONS[category] || CATEGORY_ICONS.tjera}</div>
);

export default function Home() {
    const { data: servicesData } = useGetServicesQuery();
    const featured = servicesData?.data?.slice(0, 6) || [];

    return (
        <div className="home">
            <section className="hero">
                <div className="hero-bg"></div>
                <div className="hero-photo">
                    <img src="/salon.png" alt="Glamour Studio" />
                </div>
                <div className="container hero-content">
                    <p className="hero-eyebrow">Sallon Bukurie Luksoz</p>
                    <h1 className="hero-title">
                        Zbuloni<br />
                        <em>Bukurine</em><br />
                        Tuaj
                    </h1>
                    <p className="hero-sub">
                        Transformime ekskluzive per gruan moderne. Eksperience unike,
                        rezultate te jashtezakonshme.
                    </p>
                    <div className="hero-actions">
                        <Link to="/appointments/new" className="btn btn-primary">Rezervo Tani</Link>
                        <Link to="/services" className="btn btn-outline">Shiko Sherbimet</Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-num">500+</span>
                            <span className="stat-label">Kliente</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-num">8+</span>
                            <span className="stat-label">Vjet Eksperience</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-num">15+</span>
                            <span className="stat-label">Sherbime</span>
                        </div>
                    </div>
                </div>
                <div className="hero-deco">
                    <div className="deco-circle deco-1"></div>
                    <div className="deco-circle deco-2"></div>
                </div>
            </section>

            <section className="categories section">
                <div className="container">
                    <div className="section-header">
                        <p className="section-eyebrow">Sherbimet Tona</p>
                        <h2 className="section-title">Cfare Ofrojme</h2>
                    </div>
                    <div className="categories-grid">
                        {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                            <Link key={key} to={`/services?category=${key}`} className="category-card">
                                <span className="category-icon">{CATEGORY_ICONS[key]}</span>
                                <span className="category-label">{label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {featured.length > 0 && (
                <section className="featured section">
                    <div className="container">
                        <div className="section-header">
                            <p className="section-eyebrow">Me te Kerkuarat</p>
                            <h2 className="section-title">Sherbimet e Zgjedhura</h2>
                        </div>
                        <div className="services-grid">
                            {featured.map((s) => (
                                <div key={s._id} className="service-card card">
                                    {SERVICE_PHOTOS[s.name] ? (
                                        <div className="service-card-photo">
                                            <img src={SERVICE_PHOTOS[s.name]} alt={s.name} />
                                        </div>
                                    ) : (
                                        <div className="service-card-icon-row">
                                            <ServiceIcon category={s.category} />
                                            <span className="service-duration">{s.duration} min</span>
                                        </div>
                                    )}
                                    <div className="service-card-body">
                                        <div className="service-card-meta">
                                            <span className="service-category-badge">{CATEGORY_LABELS[s.category] || s.category}</span>
                                            {SERVICE_PHOTOS[s.name] && <span className="service-duration">{s.duration} min</span>}
                                        </div>
                                        <h3 className="service-name">{s.name}</h3>
                                        <p className="service-desc">{s.description}</p>
                                        <div className="service-footer">
                                            <span className="service-price">{s.price} L</span>
                                            <Link to="/appointments/new" className="btn btn-rose btn-sm">Rezervo</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center" style={{ marginTop: '2.5rem' }}>
                            <Link to="/services" className="btn btn-outline">Shiko te Gjitha</Link>
                        </div>
                    </div>
                </section>
            )}

            <section className="why-us section">
                <div className="container">
                    <div className="why-grid">
                        <div className="why-text">
                            <p className="section-eyebrow">Pse Ne</p>
                            <h2 className="section-title">Eksperienca e<br /><em>Vertete e Luksit</em></h2>
                            <p className="why-desc">
                                Cdo klient merr vemendje te plote nga ekipi yne i specializuar.
                                Produktet premium, teknikat moderne dhe mjedisi i rehatshme
                                bejne cdo visite te paharrueshme.
                            </p>
                            <ul className="why-list">
                                <li>
                                    <span className="why-list-icon">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M2 8l4 4 8-8" /></svg>
                                    </span>
                                    Produktet e linjave nderkombetare premium
                                </li>
                                <li>
                                    <span className="why-list-icon">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M2 8l4 4 8-8" /></svg>
                                    </span>
                                    Specialiste me certifikata nderkombetare
                                </li>
                                <li>
                                    <span className="why-list-icon">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M2 8l4 4 8-8" /></svg>
                                    </span>
                                    Konsultim falas para cdo sherbimi
                                </li>
                                <li>
                                    <span className="why-list-icon">
                                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M2 8l4 4 8-8" /></svg>
                                    </span>
                                    Ambiente sterile dhe luksoze
                                </li>
                            </ul>
                            <Link to="/staff" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Tako Ekipin</Link>
                        </div>
                        <div className="why-visual">
                            <div className="why-card why-card-1">
                                <div className="why-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                                </div>
                                <strong>4.9/5</strong>
                                <small>Vleresim mesatar</small>
                            </div>
                            <div className="why-card why-card-2">
                                <div className="why-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                </div>
                                <strong>98%</strong>
                                <small>Kliente te kenaqur</small>
                            </div>
                            <div className="why-ornament"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="cta section">
                <div className="container">
                    <div className="cta-box">
                        <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Gati per Transformim?</p>
                        <h2 className="section-title" style={{ color: 'var(--white)' }}>Rezervoni<em> Sot</em></h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontWeight: 300 }}>
                            Vendet jane te limituara. Siguroni orarin tuaj tani.
                        </p>
                        <Link to="/appointments/new" className="btn btn-primary" style={{ background: 'var(--gold)', color: 'var(--charcoal)' }}>
                            Rezervo Takimin
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}