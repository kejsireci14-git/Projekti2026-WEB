import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetServicesQuery, useGetStaffQuery, useCreateAppointmentMutation } from '../features/apiSlice';
import './NewAppointment.css';

const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];

const AVATAR_COLORS = ['#C4846B', '#9B5E4A', '#C9A96E', '#7A6E68', '#8B9DA8', '#B8847A'];

// SVG icon components — no emojis
const Icons = {
    scissors: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
            <line x1="20" y1="4" x2="8.12" y2="15.88" />
            <line x1="14.47" y1="14.48" x2="20" y2="20" />
            <line x1="8.12" y1="8.12" x2="12" y2="12" />
        </svg>
    ),
    lipstick: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v4M8 6h8l1 4H7l1-4z" />
            <rect x="7" y="10" width="10" height="10" rx="1" />
            <path d="M10 10v3h4v-3" />
        </svg>
    ),
    nails: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3c0 0 1 1 1 4v10a2 2 0 0 0 4 0V7c0-3 1-4 1-4" />
            <path d="M7 7h10" />
        </svg>
    ),
    eye: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    leaf: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 8C8 10 5.9 16.17 3.82 19.17L2 21l1-1c1-1 3-3 7-4.5M17 8c1-1 2-3 2-5-4 0-8 2-11 5" />
            <path d="M17 8l-5 5" />
        </svg>
    ),
    sparkle: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6L12 17.2l-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
        </svg>
    ),
    check: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    diamond: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 22 9 18 21 6 21 2 9" />
        </svg>
    ),
    clock: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    calendar: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    ),
};

const CATEGORY_ICONS = {
    flok: Icons.scissors,
    makeup: Icons.lipstick,
    thonje: Icons.nails,
    qerpik: Icons.eye,
    facial: Icons.leaf,
    tjera: Icons.sparkle,
};

export default function NewAppointment() {
    const navigate = useNavigate();
    const { data: servicesData } = useGetServicesQuery();
    const { data: staffData } = useGetStaffQuery();
    const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ serviceId: '', staffId: '', date: '', timeSlot: '', notes: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const selectedService = servicesData?.data?.find(s => s._id === form.serviceId);
    const selectedStaff = staffData?.data?.find(s => s._id === form.staffId);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.serviceId) return setError('Ju lutem zgjidhni nje sherbim.');
        if (!form.staffId) return setError('Ju lutem zgjidhni nje specialiste.');
        if (!form.date) return setError('Ju lutem zgjidhni nje date.');
        if (!form.timeSlot) return setError('Ju lutem zgjidhni nje ore.');
        try {
            await createAppointment(form).unwrap();
            setSuccess('Rezervimi u krye me sukses!');
            setTimeout(() => navigate('/appointments'), 2000);
        } catch (err) {
            setError(err?.data?.message || 'Gabim gjate rezervimit.');
        }
    };

    const today = new Date().toISOString().split('T')[0];

    // Determine the furthest completed step for the indicator
    const getActiveStep = () => {
        if (form.timeSlot || form.date) return 3;
        if (form.staffId) return 3;
        if (form.serviceId) return 2;
        return 1;
    };
    const activeStep = getActiveStep();

    return (
        <div className="appointment-page">
            <div className="appointment-hero">
                <div className="hero-bg-pattern"></div>
                <div className="container appointment-hero-content">
                    <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Glamour Studio</p>
                    <h1>Rezervo Takimin</h1>
                    <p className="appt-hero-sub">Zgjidhni sherbimin, specialisten dhe kohen qe ju pershtatet</p>
                    <div className="steps-indicator">
                        <div className={`step-dot ${activeStep >= 1 ? 'active' : ''}`}>
                            <span>{activeStep > 1 ? <span className="step-check">{Icons.check}</span> : '1'}</span>
                            <small>Sherbimi</small>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step-dot ${activeStep >= 2 ? 'active' : ''}`}>
                            <span>{activeStep > 2 ? <span className="step-check">{Icons.check}</span> : '2'}</span>
                            <small>Specialistja</small>
                        </div>
                        <div className="step-line"></div>
                        <div className={`step-dot ${activeStep >= 3 ? 'active' : ''}`}>
                            <span>3</span>
                            <small>Data &amp; Ora</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container appt-container">
                <div className="appointment-layout">
                    <div className="appointment-form-wrap card fade-in">
                        {error && <div className="alert alert-error">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}

                        <form onSubmit={handleSubmit} className="appointment-form" noValidate>

                            {/* STEP 1 - SERVICE */}
                            <div className="form-step">
                                <div className="step-header">
                                    <div className="step-num">1</div>
                                    <h2>Zgjidhni Sherbimin</h2>
                                </div>
                                <div className="services-select-grid">
                                    {servicesData?.data?.map(s => (
                                        <label
                                            key={s._id}
                                            className={`service-select-card ${form.serviceId === s._id ? 'selected' : ''}`}
                                            aria-label={s.name}
                                        >
                                            <input
                                                type="radio"
                                                name="serviceId"
                                                value={s._id}
                                                checked={form.serviceId === s._id}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setStep(2);
                                                }}
                                                aria-label={s.name}
                                            />
                                            <span className="service-select-icon">
                                                {CATEGORY_ICONS[s.category] || Icons.sparkle}
                                            </span>
                                            <strong>{s.name}</strong>
                                            <span className="service-select-price">{s.price} LEK</span>
                                            <small className="service-select-duration">
                                                <span className="duration-icon">{Icons.clock}</span>
                                                {s.duration} min
                                            </small>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* STEP 2 - STAFF */}
                            <div className="form-step">
                                <div className="step-header">
                                    <div className="step-num">2</div>
                                    <h2>Zgjidhni Specialisten</h2>
                                </div>
                                <div className="staff-select-grid">
                                    {staffData?.data?.map((m, idx) => (
                                        <label
                                            key={m._id}
                                            className={`staff-select-card ${form.staffId === m._id ? 'selected' : ''}`}
                                            aria-label={m.name}
                                        >
                                            <input
                                                type="radio"
                                                name="staffId"
                                                value={m._id}
                                                checked={form.staffId === m._id}
                                                onChange={(e) => {
                                                    handleChange(e);
                                                    setStep(3);
                                                }}
                                                aria-label={m.name}
                                            />
                                            <div
                                                className="staff-select-avatar"
                                                style={{ background: AVATAR_COLORS[idx % AVATAR_COLORS.length] }}
                                                aria-hidden="true"
                                            >
                                                {m.name[0]}
                                            </div>
                                            <div className="staff-select-info">
                                                <strong>{m.name}</strong>
                                                <small>{m.role}</small>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* STEP 3 - DATE & TIME */}
                            <div className="form-step">
                                <div className="step-header">
                                    <div className="step-num">3</div>
                                    <h2>Data dhe Ora</h2>
                                </div>
                                <div className="datetime-grid">
                                    <div className="form-group">
                                        <label htmlFor="appt-date">Data *</label>
                                        <div className="date-input-wrap">
                                            <span className="date-icon">{Icons.calendar}</span>
                                            <input
                                                id="appt-date"
                                                type="date"
                                                name="date"
                                                value={form.date}
                                                onChange={handleChange}
                                                min={today}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Ora *</label>
                                        <div className="time-slots-grid">
                                            {TIME_SLOTS.map(t => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    className={`time-slot-btn ${form.timeSlot === t ? 'selected' : ''}`}
                                                    onClick={() => setForm(prev => ({ ...prev, timeSlot: t }))}
                                                    aria-pressed={form.timeSlot === t}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group" style={{ marginTop: '1rem' }}>
                                    <label htmlFor="appt-notes">Shenime (opsionale)</label>
                                    <textarea
                                        id="appt-notes"
                                        name="notes"
                                        value={form.notes}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Ndonje kerkese speciale..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-full btn-confirm"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Duke rezervuar...' : 'Konfirmo Rezervimin'}
                            </button>
                        </form>
                    </div>

                    {/* SUMMARY */}
                    <div className="booking-summary">
                        <div className="summary-card card">
                            <div className="summary-header">
                                <h3>Permbledhja</h3>
                                <div className="summary-icon">{Icons.diamond}</div>
                            </div>

                            {selectedService || selectedStaff ? (
                                <div className="summary-details">
                                    {selectedService && (
                                        <>
                                            <div className="summary-section-label">Sherbimi</div>
                                            <div className="summary-service-card">
                                                <span className="summary-service-icon">
                                                    {CATEGORY_ICONS[selectedService.category] || Icons.sparkle}
                                                </span>
                                                <div>
                                                    <strong>{selectedService.name}</strong>
                                                    <small>
                                                        <span className="summary-meta-icon">{Icons.clock}</span>
                                                        {selectedService.duration} min
                                                    </small>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    {selectedStaff && (
                                        <>
                                            <div className="summary-section-label">Specialistja</div>
                                            <div className="summary-staff-card">
                                                <div className="summary-staff-avatar">{selectedStaff.name[0]}</div>
                                                <div>
                                                    <strong>{selectedStaff.name}</strong>
                                                    <small>{selectedStaff.role}</small>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
                                    {selectedService && (
                                        <div className="summary-total">
                                            <span>Totali</span>
                                            <strong className="summary-price">{selectedService.price} LEK</strong>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="summary-empty-state">
                                    <div className="summary-empty-icon">{Icons.sparkle}</div>
                                    <p>Zgjidhni sherbimin per te pare detajet e rezervimit</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}