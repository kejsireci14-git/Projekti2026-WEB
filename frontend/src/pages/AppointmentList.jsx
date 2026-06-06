import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAppointmentsQuery, useDeleteAppointmentMutation } from '../features/apiSlice';
import { toList } from '../utils/helpers';
import './AppointmentList.css';

const STATUS_MAP = {
    pending: 'pending', confirmed: 'confirmed',
    completed: 'completed', cancelled: 'cancelled'
};
const STATUS_LABELS = {
    pending: 'Në Pritje', confirmed: 'Konfirmuar',
    completed: 'Përfunduar', cancelled: 'Anuluar'
};

export default function AppointmentList() {
    const { data, isLoading } = useGetAppointmentsQuery();
    const [deleteAppointment] = useDeleteAppointmentMutation();

    const handleCancel = async (id) => {
        if (!window.confirm('Doni ta anuloni këtë rezervim?')) return;
        await deleteAppointment(id);
    };

    if (isLoading) return <div className="spinner" style={{ minHeight: '60vh' }}></div>;

    const appointments = toList(data);

    return (
        <div className="appts-page">
            <div className="appts-hero">
                <div className="container">
                    <p className="section-eyebrow">✦ Historiku ✦</p>
                    <h1>Rezervimet Tuaja</h1>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                <div className="appts-header">
                    <p>{appointments.length} rezervime</p>
                    <Link to="/appointments/new" className="btn btn-primary">+ Rezervim i Ri</Link>
                </div>

                {appointments.length === 0 ? (
                    <div className="empty-appts card">
                        <div className="empty-icon">✦</div>
                        <h3>Nuk keni rezervime</h3>
                        <p>Bëni rezervimin tuaj të parë sot!</p>
                        <Link to="/appointments/new" className="btn btn-rose" style={{ marginTop: '1.2rem' }}>Rezervo Tani</Link>
                    </div>
                ) : (
                    <div className="appts-list">
                        {appointments.map((appt) => (
                            <div key={appt._id} className="appt-card card fade-in">
                                <div className="appt-left">
                                    <div className="appt-date-box">
                                        <span className="appt-day">
                                            {new Date(appt.date).toLocaleDateString('sq-AL', { day: '2-digit' })}
                                        </span>
                                        <span className="appt-month">
                                            {new Date(appt.date).toLocaleDateString('sq-AL', { month: 'short' })}
                                        </span>
                                        <span className="appt-time">{appt.timeSlot}</span>
                                    </div>
                                </div>
                                <div className="appt-body">
                                    <div className="appt-header-row">
                                        <h3>{appt.service?.name || 'Shërbim'}</h3>
                                        <span className={`badge badge-${STATUS_MAP[appt.status]}`}>
                                            {STATUS_LABELS[appt.status] || appt.status}
                                        </span>
                                    </div>
                                    <div className="appt-meta">
                                        {appt.staff && <span>👩 {appt.staff.name}</span>}
                                        <span>⏱ {appt.service?.duration} min</span>
                                        <span>💰 {appt.totalPrice} LEK</span>
                                    </div>
                                    {appt.notes && <p className="appt-notes">📝 {appt.notes}</p>}
                                    {appt.status === 'pending' && (
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => handleCancel(appt._id)}
                                            style={{ marginTop: '0.75rem' }}>
                                            Anulo Rezervimin
                                        </button>
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