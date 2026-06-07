import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAppointmentsQuery, useDeleteAppointmentMutation } from '../features/apiSlice';
import './AppointmentList.css';

const STATUS_LABELS = {
    pending: 'Ne Pritje',
    confirmed: 'Konfirmuar',
    completed: 'Perfunduar',
    cancelled: 'Anuluar'
};

const StatusIcon = ({ status }) => {
    if (status === 'pending') return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
        </svg>
    );
    if (status === 'confirmed') return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
            <path d="M5 12l5 5L19 7" />
        </svg>
    );
    if (status === 'completed') return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
        </svg>
    );
    if (status === 'cancelled') return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12">
            <path d="M18 6L6 18M6 6l12 12" />
        </svg>
    );
    return null;
};

const ServiceIcon = ({ category }) => {
    const icons = {
        flok: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M6 3c0 0 1 2 1 4s-2 3-2 5 2 4 5 4 5-2 5-4-2-3-2-5 1-4 1-4" /><path d="M12 11c0 0 2 1.5 2 4s-2 4-2 4" /><circle cx="18" cy="5" r="2" /><path d="M16 5c0 0-2 3-2 6" /></svg>,
        makeup: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 2C9 2 7 4 7 7c0 2 1 3.5 2 4.5V20a2 2 0 004 0v-8.5c1-1 2-2.5 2-4.5 0-3-2-5-3-5z" /><path d="M9 7h6" /></svg>,
        thonje: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M8 3C6 3 5 5 5 7c0 3 2 5 2 9a2 2 0 004 0c0-4 2-6 2-9 0-2-1-4-3-4z" /><path d="M16 5c1 0 2 2 2 4 0 2-1 4-1 7a1.5 1.5 0 003 0c0-3-1-5-1-7 0-2-1-4-3-4z" /></svg>,
        qerpik: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>,
        facial: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><circle cx="12" cy="12" r="9" /><path d="M9 9.5c0 0 .5-1 1.5-1s1.5 1 1.5 1" /><path d="M12 9.5c0 0 .5-1 1.5-1s1.5 1 1.5 1" /><path d="M9 15c0 0 1 2 3 2s3-2 3-2" /></svg>,
        tjera: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="22" height="22"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>,
    };
    return icons[category] || icons.tjera;
};

export default function AppointmentList() {
    const { data, isLoading } = useGetAppointmentsQuery();
    const [deleteAppointment] = useDeleteAppointmentMutation();

    const handleCancel = async (id) => {
        if (!window.confirm('Doni ta anuloni kete rezervim?')) return;
        await deleteAppointment(id);
    };

    if (isLoading) return <div className="spinner" style={{ minHeight: '60vh' }}></div>;

    const appointments = data?.data || [];
    const pending = appointments.filter(a => a.status === 'pending').length;
    const confirmed = appointments.filter(a => a.status === 'confirmed').length;
    const completed = appointments.filter(a => a.status === 'completed').length;

    return (
        <div className="appts-page">
            <div className="appts-hero">
                <div className="appts-hero-bg"></div>
                <div className="container appts-hero-content">
                    <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Glamour Studio</p>
                    <h1>Rezervimet Tuaja</h1>
                    <p className="appts-hero-sub">Menaxhoni takimet dhe historikun tuaj</p>
                    <div className="appts-stats">
                        <div className="appt-stat">
                            <span className="appt-stat-num">{appointments.length}</span>
                            <span className="appt-stat-label">Gjithsej</span>
                        </div>
                        <div className="appt-stat-divider"></div>
                        <div className="appt-stat">
                            <span className="appt-stat-num">{pending}</span>
                            <span className="appt-stat-label">Ne Pritje</span>
                        </div>
                        <div className="appt-stat-divider"></div>
                        <div className="appt-stat">
                            <span className="appt-stat-num">{confirmed}</span>
                            <span className="appt-stat-label">Konfirmuar</span>
                        </div>
                        <div className="appt-stat-divider"></div>
                        <div className="appt-stat">
                            <span className="appt-stat-num">{completed}</span>
                            <span className="appt-stat-label">Perfunduar</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container appts-container">
                <div className="appts-toolbar">
                    <p className="appts-count">{appointments.length} rezervime gjithsej</p>
                    <Link to="/appointments/new" className="btn btn-primary">+ Rezervim i Ri</Link>
                </div>

                {appointments.length === 0 ? (
                    <div className="empty-appts card">
                        <div className="empty-appt-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" width="64" height="64">
                                <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
                                <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
                            </svg>
                        </div>
                        <h3>Nuk keni rezervime</h3>
                        <p>Beni rezervimin tuaj te pare sot dhe perjetoni luks!</p>
                        <Link to="/appointments/new" className="btn btn-rose" style={{ marginTop: '1.5rem' }}>
                            Rezervo Tani
                        </Link>
                    </div>
                ) : (
                    <div className="appts-list">
                        {appointments.map((appt) => {
                            const date = new Date(appt.date);
                            const day = date.toLocaleDateString('en-GB', { day: '2-digit' });
                            const month = date.toLocaleDateString('en-GB', { month: 'short' });
                            const weekday = date.toLocaleDateString('en-GB', { weekday: 'short' });

                            return (
                                <div key={appt._id} className={`appt-card card fade-in appt-${appt.status}`}>
                                    <div className="appt-date-col">
                                        <div className="appt-date-box">
                                            <span className="appt-weekday">{weekday}</span>
                                            <span className="appt-day">{day}</span>
                                            <span className="appt-month">{month}</span>
                                        </div>
                                        <span className="appt-time-badge">{appt.timeSlot}</span>
                                    </div>

                                    <div className="appt-service-col">
                                        <div className="appt-service-icon">
                                            <ServiceIcon category={appt.service?.category} />
                                        </div>
                                        <div>
                                            <h3 className="appt-service-name">{appt.service?.name || 'Sherbim'}</h3>
                                            <p className="appt-duration">{appt.service?.duration} min</p>
                                        </div>
                                    </div>

                                    <div className="appt-staff-col">
                                        {appt.staff && (
                                            <>
                                                <div className="appt-staff-avatar">{appt.staff.name[0]}</div>
                                                <div>
                                                    <p className="appt-staff-name">{appt.staff.name}</p>
                                                    <p className="appt-staff-role">{appt.staff.role}</p>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div className="appt-price-col">
                                        <span className="appt-price">{appt.totalPrice}</span>
                                        <span className="appt-price-currency">LEK</span>
                                    </div>

                                    <div className="appt-status-col">
                                        <span className={`appt-status-badge status-${appt.status}`}>
                                            <StatusIcon status={appt.status} />
                                            {STATUS_LABELS[appt.status]}
                                        </span>
                                        {(appt.status === 'pending' || appt.status === 'confirmed') && (
                                            <button className="appt-cancel-btn" onClick={() => handleCancel(appt._id)}>
                                                Anulo
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}