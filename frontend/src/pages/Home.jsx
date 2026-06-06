import React from 'react';
import { Link } from 'react-router-dom';
import { useGetServicesQuery } from '../features/apiSlice';
import { toList } from '../utils/helpers';
import './Home.css';

const CATEGORY_LABELS = {
    flok: 'Flokë', makeup: 'Makeup', thonje: 'Thonje',
    qerpik: 'Qerpikë', facial: 'Facial', tjera: 'Të Tjera'
};

const CATEGORY_ICONS = {
    flok: '✂', makeup: '💄', thonje: '✦',
    qerpik: '✿', facial: '◎', tjera: '✺'
};

export default function Home() {
    const { data: servicesData } = useGetServicesQuery();

    const featured = toList(servicesData).slice(0, 6);

    return (
        <div className="home">
            {/* Hero */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-pattern"></div>
                </div>
                <div className="container hero-content">
                    <p className="hero-eyebrow">✦ Sallon Bukurie Luksoz ✦</p>
                    <h1 className="hero-title">
                        Zbuloni<br />
                        <em>Bukurinë</em><br />
                        Tuaj
                    </h1>
                    <p className="hero-sub">
                        Transformime ekskluzive për gruan moderne. Eksperiencë unike,
                        rezultate të jashtëzakonshme.
                    </p>
                    <div className="hero-actions">
                        <Link to="/appointments/new" className="btn btn-primary">Rezervo Tani</Link>
                        <Link to="/services" className="btn btn-outline">Shiko Shërbimet</Link>
                    </div>
                    <div className="hero-stats">
                        <div className="stat">
                            <span className="stat-num">500+</span>
                            <span className="stat-label">Klientë</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-num">8+</span>
                            <span className="stat-label">Vjet Eksperiencë</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="stat">
                            <span className="stat-num">15+</span>
                            <span className="stat-label">Shërbime</span>
                        </div>
                    </div>
                </div>
                <div className="hero-deco">
                    <div className="deco-circle deco-1"></div>
                    <div className="deco-circle deco-2"></div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories section">
                <div className="container">
                    <div className="section-header">
                        <p className="section-eyebrow">Shërbimet Tona</p>
                        <h2 className="section-title">Çfarë Ofrojmë</h2>
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

            {/* Featured Services */}
            {featured.length > 0 && (
                <section className="featured section">
                    <div className="container">
                        <div className="section-header">
                            <p className="section-eyebrow">Më të Kërkuarat</p>
                            <h2 className="section-title">Shërbimet e Zgjedhura</h2>
                        </div>
                        <div className="services-grid">
                            {featured.map((s) => (
                                <div key={s._id} className="service-card card">
                                    <div className="service-card-top">
                                        <span className="service-category-badge">{CATEGORY_LABELS[s.category] || s.category}</span>
                                        <span className="service-duration">⏱ {s.duration} min</span>
                                    </div>
                                    <h3 className="service-name">{s.name}</h3>
                                    <p className="service-desc">{s.description}</p>
                                    <div className="service-footer">
                                        <span className="service-price">{s.price} L</span>
                                        <Link to="/appointments/new" className="btn btn-rose btn-sm">Rezervo</Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center" style={{ marginTop: '2.5rem' }}>
                            <Link to="/services" className="btn btn-outline">Shiko të Gjitha</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Why Us */}
            <section className="why-us section">
                <div className="container">
                    <div className="why-grid">
                        <div className="why-text">
                            <p className="section-eyebrow">Pse Ne</p>
                            <h2 className="section-title">Eksperienca e<br /><em>Vërtetë e Luksit</em></h2>
                            <p className="why-desc">
                                Çdo klient merrte vëmendje të plotë nga ekipi ynë i specializuar.
                                Produktet premium, teknikat moderne dhe mjedisi i rehatshëm
                                bëjnë çdo vizitë të paharrueshme.
                            </p>
                            <ul className="why-list">
                                <li><span>✦</span> Produktet e linjave ndërkombëtare premium</li>
                                <li><span>✦</span> Specialiste me certifikata ndërkombëtare</li>
                                <li><span>✦</span> Konsultim falas para çdo shërbimi</li>
                                <li><span>✦</span> Ambiente sterile dhe luksoze</li>
                            </ul>
                            <Link to="/staff" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>Tako Ekipin</Link>
                        </div>
                        <div className="why-visual">
                            <div className="why-card why-card-1">
                                <div className="why-icon">★</div>
                                <strong>4.9/5</strong>
                                <small>Vlerësim mesatar</small>
                            </div>
                            <div className="why-card why-card-2">
                                <div className="why-icon">♡</div>
                                <strong>98%</strong>
                                <small>Klientë të kënaqur</small>
                            </div>
                            <div className="why-ornament"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta section">
                <div className="container">
                    <div className="cta-box">
                        <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Gati për Transformim?</p>
                        <h2 className="section-title" style={{ color: 'var(--white)' }}>Rezervoni<em> Sot</em></h2>
                        <p style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontWeight: 300 }}>
                            Vendet janë të limituara. Siguroni orarin tuaj tani.
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