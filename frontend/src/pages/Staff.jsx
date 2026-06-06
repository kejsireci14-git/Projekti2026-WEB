import React from 'react';
import { useGetStaffQuery } from '../features/apiSlice';
import { toList } from '../utils/helpers';
import './Staff.css';

const INITIALS_COLORS = ['#C4846B', '#9B5E4A', '#C9A96E', '#7A6E68', '#8B9DA8'];

export default function Staff() {
    const { data, isLoading } = useGetStaffQuery();

    const staff = toList(data);

    if (isLoading) return <div className="spinner" style={{ minHeight: '60vh' }}></div>;

    return (
        <div className="staff-page">
            <div className="staff-hero">
                <div className="container">
                    <p className="section-eyebrow">✦ Profesionistët Tanë ✦</p>
                    <h1>Ekipi ynë</h1>
                    <p className="staff-hero-sub">Specialiste të certifikuara me pasion për bukurinë</p>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 2rem' }}>
                {!staff.length ? (
                    <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--gray-mid)' }}>
                        <p>Nuk ka të dhëna për stafin aktualisht.</p>
                    </div>
                ) : (
                    <div className="staff-grid">
                        {staff.map((member, idx) => (
                            <div key={member._id} className="staff-card card">
                                <div className="staff-avatar" style={{ background: INITIALS_COLORS[idx % INITIALS_COLORS.length] }}>
                                    {member.photo ? (
                                        <img src={member.photo} alt={member.name} />
                                    ) : (
                                        <span>{member.name.charAt(0).toUpperCase()}</span>
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
                                    {member.workingDays?.length > 0 && (
                                        <p className="staff-days">
                                            📅 {member.workingDays.join(', ')}
                                        </p>
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