import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="20" height="20">
                                <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                            </svg>
                            <span>Glamour<em>Studio</em></span>
                        </div>
                        <p className="footer-desc">
                            Sallon bukurie luksoz per gruan moderne.
                            Eksperience unike, rezultate te jashtezakonshme.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="social-btn" aria-label="Instagram">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                                    <circle cx="12" cy="12" r="4"/>
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                                </svg>
                            </a>
                            <a href="#" className="social-btn" aria-label="Facebook">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                                </svg>
                            </a>
                            <a href="#" className="social-btn" aria-label="TikTok">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                                    <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <div className="footer-col">
                        <h4>Navigim</h4>
                        <ul>
                            <li><Link to="/">Ballina</Link></li>
                            <li><Link to="/services">Sherbimet</Link></li>
                            <li><Link to="/staff">Ekipi</Link></li>
                            <li><Link to="/appointments/new">Rezervo</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Sherbimet</h4>
                        <ul>
                            <li><Link to="/services?category=flok">Floke</Link></li>
                            <li><Link to="/services?category=makeup">Makeup</Link></li>
                            <li><Link to="/services?category=thonje">Thonje</Link></li>
                            <li><Link to="/services?category=facial">Facial</Link></li>
                            <li><Link to="/services?category=qerpik">Qerpike</Link></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4>Kontakt</h4>
                        <ul className="footer-contact">
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                                    <circle cx="12" cy="10" r="3"/>
                                </svg>
                                Tirane, Shqiperi
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                                </svg>
                                +355 67 670 8440
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <path d="M22 6l-10 7L2 6"/>
                                </svg>
                                kejsireci14@gmail.com
                            </li>
                            <li>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
                                    <circle cx="12" cy="12" r="10"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                                E Hene - E Shtune: 09:00 - 18:00
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>&copy; {year} Glamour Studio. Te gjitha te drejtat e rezervuara.</p>
                    <p className="footer-made">Dizajnuar me
                        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{color: 'var(--rose)', margin: '0 4px'}}>
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        per bukurine shqiptare
                    </p>
                </div>
            </div>
        </footer>
    );
}