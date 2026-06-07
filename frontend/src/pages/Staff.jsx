import React from 'react';
import { useGetStaffQuery } from '../features/apiSlice';
import './Staff.css';

const STAFF_PHOTOS = {
    "Arta Hoxha": "/ekipi/arta_hoxha.avif",
    "Diona Martini": "/ekipi/diona_martini.jpg",
    "Elona Krasniqi": "/ekipi/elona_krasniqi.jpg",
    "Klea Shehu": "/ekipi/klea_shehu.avif",
    "Mirela Duka": "/ekipi/mirela_duka.jpg",
    "Sara Brahimi": "/ekipi/sara_brahimi.avif",
};

const AVATAR_COLORS = [
    ['#C4846B', '#9B5E4A'],
    ['#C9A96E', '#A07840'],
    ['#B8847A', '#8B5E5A'],
    ['#9BA8A0', '#6B7870'],
    ['#C4A882', '#9B8060'],
    ['#C4846B', '#9B5E4A'],
];

function BeautyAvatar({ colors, initial }) {
    const [c1, c2] = colors;
    return (
        <svg viewBox="0 0 120 120" width="120" height="120" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id={"bg" + initial} cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor={c1} />
                    <stop offset="100%" stopColor={c2} />
                </radialGradient>
                <radialGradient id={"face" + initial} cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#FDDBB4" />
                    <stop offset="100%" stopColor="#F0C090" />
                </radialGradient>
            </defs>
            <circle cx="60" cy="60" r="60" fill={"url(#bg" + initial + ")"} />
            <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <ellipse cx="60" cy="42" rx="24" ry="26" fill={c2} />
            <path d="M36 48 Q30 70 34 90 Q45 82 60 84 Q75 82 86 90 Q90 70 84 48" fill={c2} />
            <rect x="53" y="72" width="14" height="14" rx="4" fill="#FDDBB4" />
            <ellipse cx="60" cy="50" rx="20" ry="22" fill={"url(#face" + initial + ")"} />
            <ellipse cx="52" cy="46" rx="3.5" ry="2.5" fill="#4A3728" />
            <ellipse cx="68" cy="46" rx="3.5" ry="2.5" fill="#4A3728" />
            <circle cx="53" cy="45" r="1" fill="white" />
            <circle cx="69" cy="45" r="1" fill="white" />
            <path d="M48 41 Q52 39 56 41" stroke="#7A5C48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M64 41 Q68 39 72 41" stroke="#7A5C48" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M59 50 Q57 56 60 58 Q63 56 61 50" fill="none" stroke="#D4956A" strokeWidth="1" strokeLinecap="round" />
            <path d="M54 63 Q60 68 66 63" stroke="#C4725A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M40 38 Q45 25 60 22 Q75 25 80 38 Q72 32 60 31 Q48 32 40 38z" fill={c1} />
            <path d="M36 48 Q34 38 40 34 Q38 45 38 55" fill={c1} />
            <path d="M84 48 Q86 38 80 34 Q82 45 82 55" fill={c1} />
            <path d="M34 90 Q30 108 30 120 L90 120 Q90 108 86 90 Q75 84 60 84 Q45 84 34 90z" fill="white" opacity="0.9" />
            <path d="M52 84 L48 92 L60 96 L72 92 L68 84" fill={c1} opacity="0.6" />
            <path d="M52 84 Q60 90 68 84" stroke="white" strokeWidth="2" fill="none" />
        </svg>
    );
}

export default function Staff() {
    const { data, isLoading } = useGetStaffQuery();
    if (isLoading) return <div className="spinner" style={{ minHeight: '60vh' }}></div>;

    return (
        <div className="staff-page">
            <div className="staff-hero">
                <div className="container">
                    <p className="section-eyebrow">Profesionistet Tane</p>
                    <h1>Ekipi Yne</h1>
                    <p className="staff-hero-sub">Specialiste te certifikuara me pasion per bukurine</p>
                </div>
            </div>
            <div className="container" style={{ padding: '4rem 2rem' }}>
                {!data?.data?.length ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-mid)' }}>
                        <p>Nuk ka te dhena per stafin aktualisht.</p>
                    </div>
                ) : (
                    <div className="staff-grid">
                        {data.data.map((member, idx) => (
                            <div key={member._id} className="staff-card card">
                                <div className="staff-avatar-wrap">
                                    {STAFF_PHOTOS[member.name] ? (
                                        <img
                                            src={STAFF_PHOTOS[member.name]}
                                            alt={member.name}
                                            className="staff-avatar-img"
                                        />
                                    ) : (
                                        <BeautyAvatar
                                            colors={AVATAR_COLORS[idx % AVATAR_COLORS.length]}
                                            initial={member.name.charAt(0).toUpperCase()}
                                        />
                                    )}
                                </div>
                                <div className="staff-info">
                                    <h3>{member.name}</h3>
                                    <p className="staff-role">{member.role}</p>
                                    {member.bio && <p className="staff-bio">{member.bio}</p>}
                                    {member.specializations?.length > 0 && (
                                        <div className="staff-specs">
                                            {member.specializations.map((s, i) => (
                                                <span key={i} className="spec-tag">{s}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}