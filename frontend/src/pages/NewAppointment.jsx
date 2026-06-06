import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetServicesQuery, useGetStaffQuery, useCreateAppointmentMutation } from '../features/apiSlice';
import { toList } from '../utils/helpers';
import './NewAppointment.css';

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

export default function NewAppointment() {
    const navigate = useNavigate();
    const { data: servicesData } = useGetServicesQuery();
    const { data: staffData } = useGetStaffQuery();
    const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

    const [form, setForm] = useState({
        serviceId: '', staffId: '', date: '', timeSlot: '', notes: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const services = toList(servicesData);
    const staff = toList(staffData);

    const selectedService = services.find(s => s._id === form.serviceId);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.serviceId || !form.staffId || !form.date || !form.timeSlot) {
            return setError('Ju lutem plotesoni te gjitha fushat e detyrueshme.');
        }
        try {
            await createAppointment(form).unwrap();
            setSuccess('Rezervimi u krye me sukses!');
            setTimeout(() => navigate('/appointments'), 2000);
        } catch (err) {
            setError(err.data?.message || 'Gabim gjate rezervimit.');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="appointment-page">
            <div className="appointment-hero">
                <div className="container">
                    <p className="section-eyebrow">Rezervo Takimin</p>
                    <h1>Beni Rezervimin</h1>
                </div>
            </div>

            <div className="container" style={{ padding: '3rem 2rem' }}>
                <div className="appointment-layout">
                    <div className="appointment-form-wrap card fade-in">
                        {error && <div className="alert alert-error">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <form onSubmit={handleSubmit} className="appointment-form">
                            <h2 className="form-section-title">1. Zgjidhni Sherbimin</h2>
                            <div className="form-group">
                                <label>Sherbimi *</label>
                                <select name="serviceId" value={form.serviceId} onChange={handleChange} required>
                                    <option value="">-- Zgjidhni sherbimin --</option>
                                    {services.map(s => (
                                        <option key={s._id} value={s._id}>
                                            {s.name} - {s.price} LEK ({s.duration} min)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <h2 className="form-section-title">2. Zgjidhni Specialisten</h2>
                            <div className="staff-select-grid">
                                {staff.map(m => (
                                    <label key={m._id} className={`staff-select-card ${form.staffId === m._id ? 'selected' : ''}`}>
                                        <input type="radio" name="staffId" value={m._id}
                                            checked={form.staffId === m._id}
                                            onChange={handleChange} />
                                        <div className="staff-select-avatar">{m.name[0]}</div>
                                        <div>
                                            <strong>{m.name}</strong>
                                            <small>{m.role}</small>
                                        </div>
                                    </label>
                                ))}
                            </div>

                            <h2 className="form-section-title">3. Data dhe Ora</h2>
                            <div className="auth-row">
                                <div className="form-group">
                                    <label>Data *</label>
                                    <input type="date" name="date" value={form.date}
                                        onChange={handleChange} min={today} required />
                                </div>
                                <div className="form-group">
                                    <label>Ora *</label>
                                    <select name="timeSlot" value={form.timeSlot} onChange={handleChange} required>
                                        <option value="">-- Zgjidhni oren --</option>
                                        {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Shenime (opsionale)</label>
                                <textarea name="notes" value={form.notes} onChange={handleChange}
                                    rows={3} placeholder="Ndonje kerkese speciale..." />
                            </div>

                            <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                                {isLoading ? 'Duke rezervuar...' : 'Konfirmo Rezervimin'}
                            </button>
                        </form>
                    </div>

                    <div className="booking-summary">
                        <div className="summary-card card">
                            <h3>Permbledhja</h3>
                            <div className="divider"><span>*</span></div>
                            {selectedService ? (
                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Sherbimi</span>
                                        <strong>{selectedService.name}</strong>
                                    </div>
                                    <div className="summary-row">
                                        <span>Kohezgjatja</span>
                                        <strong>{selectedService.duration} min</strong>
                                    </div>
                                    {form.date && (
                                        <div className="summary-row">
                                            <span>Data</span>
                                            <strong>{form.date}</strong>
                                        </div>
                                    )}
                                    {form.timeSlot && (
                                        <div className="summary-row">
                                            <span>Ora</span>
                                            <strong>{form.timeSlot}</strong>
                                        </div>
                                    )}
                                    <div className="summary-total">
                                        <span>Totali</span>
                                        <strong className="summary-price">{selectedService.price} LEK</strong>
                                    </div>
                                </div>
                            ) : (
                                <p className="summary-empty">Zgjidhni sherbimin per te pare detajet</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}