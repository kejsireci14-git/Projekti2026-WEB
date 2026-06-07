import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    useGetAppointmentsQuery, useGetServicesQuery, useGetStaffQuery,
    useUpdateAppointmentMutation, useCreateServiceMutation, useCreateStaffMutation,
    useDeleteServiceMutation, useDeleteStaffMutation
} from '../features/apiSlice';
import './Admin.css';

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];
const STATUS_LABELS = { pending: 'Në Pritje', confirmed: 'Konfirmuar', completed: 'Përfunduar', cancelled: 'Anuluar' };

const INIT_SERVICE = { name: '', description: '', category: 'flok', price: '', duration: 60 };
const INIT_STAFF = { name: '', role: '', bio: '', specializations: '' };

export default function Admin() {
    const [tab, setTab] = useState('appointments');
    const [msg, setMsg] = useState('');

    const { data: apptData, isLoading: loadAppts } = useGetAppointmentsQuery();
    const { data: svcData, isLoading: loadSvcs } = useGetServicesQuery();
    const { data: staffData, isLoading: loadStaff } = useGetStaffQuery();

    const [updateAppt] = useUpdateAppointmentMutation();
    const [createSvc] = useCreateServiceMutation();
    const [deleteSvc] = useDeleteServiceMutation();
    const [createStaff] = useCreateStaffMutation();
    const [deleteStaff] = useDeleteStaffMutation();

    const [svcForm, setSvcForm] = useState(INIT_SERVICE);
    const [staffForm, setStaffForm] = useState(INIT_STAFF);

    const flash = (message) => { setMsg(message); setTimeout(() => setMsg(''), 3500); };

    const handleStatusChange = async (id, status) => {
        try { await updateAppt({ id, status }).unwrap(); flash('Statusi u ndryshua!'); }
        catch (e) { flash('Gabim: ' + (e.data?.message || 'Provoni sërish.')); }
    };

    const handleCreateService = async (e) => {
        e.preventDefault();
        try {
            await createSvc({ ...svcForm, price: Number(svcForm.price), duration: Number(svcForm.duration) }).unwrap();
            setSvcForm(INIT_SERVICE);
            flash('Shërbimi u shtua!');
        } catch (e) { flash('Gabim: ' + (e.data?.message || 'Provoni sërish.')); }
    };

    const handleDeleteSvc = async (id) => {
        if (!confirm('Fshini shërbimin?')) return;
        try { await deleteSvc(id).unwrap(); flash('Shërbimi u fshi!'); }
        catch (e) { flash('Gabim gjatë fshirjes.'); }
    };

    const handleCreateStaff = async (e) => {
        e.preventDefault();
        try {
            const specs = staffForm.specializations.split(',').map(s => s.trim()).filter(Boolean);
            await createStaff({ ...staffForm, specializations: specs }).unwrap();
            setStaffForm(INIT_STAFF);
            flash('Punonjësja u shtua!');
        } catch (e) { flash('Gabim: ' + (e.data?.message || 'Provoni sërish.')); }
    };

    const handleDeleteStaff = async (id) => {
        if (!confirm('Fshini punonjësen?')) return;
        try { await deleteStaff(id).unwrap(); flash('Punonjësja u fshi!'); }
        catch (e) { flash('Gabim gjatë fshirjes.'); }
    };

    return (
        <div className="admin-page">
            <div className="admin-hero">
                <div className="container">
                    <p className="section-eyebrow">✦ Paneli i Administratorit ✦</p>
                    <h1>Admin Dashboard</h1>
                </div>
            </div>

            <div className="container" style={{ padding: '2.5rem 2rem' }}>
                {msg && <div className="alert alert-success">{msg}</div>}

                {/* Stats */}
                <div className="admin-stats">
                    <div className="stat-box card">
                        <span className="stat-box-num">{apptData?.data?.length || 0}</span>
                        <span className="stat-box-label">Rezervime</span>
                    </div>
                    <div className="stat-box card">
                        <span className="stat-box-num">{svcData?.data?.length || 0}</span>
                        <span className="stat-box-label">Shërbime</span>
                    </div>
                    <div className="stat-box card">
                        <span className="stat-box-num">{staffData?.data?.length || 0}</span>
                        <span className="stat-box-label">Staf</span>
                    </div>
                    <div className="stat-box card">
                        <span className="stat-box-num">
                            {apptData?.data?.filter(a => a.status === 'pending').length || 0}
                        </span>
                        <span className="stat-box-label">Në Pritje</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="admin-tabs">
                    {['appointments', 'services', 'staff'].map(t => (
                        <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                            {t === 'appointments' ? 'Rezervimet' : t === 'services' ? 'Shërbimet' : 'Stafi'}
                        </button>
                    ))}
                </div>

                {/* Appointments Tab */}
                {tab === 'appointments' && (
                    <div className="admin-section fade-in">
                        {loadAppts ? <div className="spinner"></div> : (
                            <div className="admin-table-wrap card">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Klienti</th>
                                            <th>Shërbimi</th>
                                            <th>Stafi</th>
                                            <th>Data / Ora</th>
                                            <th>Çmimi</th>
                                            <th>Statusi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {apptData?.data?.map(a => (
                                            <tr key={a._id}>
                                                <td>
                                                    <div className="table-name">{a.client?.name}</div>
                                                    <small>{a.client?.phone}</small>
                                                </td>
                                                <td>{a.service?.name}</td>
                                                <td>{a.staff?.name}</td>
                                                <td>
                                                    <div>{new Date(a.date).toLocaleDateString('sq-AL')}</div>
                                                    <small>{a.timeSlot}</small>
                                                </td>
                                                <td>{a.totalPrice} L</td>
                                                <td>
                                                    <select
                                                        className="status-select"
                                                        value={a.status}
                                                        onChange={(e) => handleStatusChange(a._id, e.target.value)}
                                                    >
                                                        {STATUS_OPTIONS.map(s => (
                                                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Services Tab */}
                {tab === 'services' && (
                    <div className="admin-section fade-in">
                        <div className="admin-two-col">
                            <div className="card admin-form-card">
                                <h3>Shto Shërbim të Ri</h3>
                                <form onSubmit={handleCreateService} className="admin-form">
                                    <div className="form-group">
                                        <label>Emri</label>
                                        <input value={svcForm.name} onChange={e => setSvcForm({ ...svcForm, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Përshkrimi</label>
                                        <textarea rows={3} value={svcForm.description} onChange={e => setSvcForm({ ...svcForm, description: e.target.value })} required />
                                    </div>
                                    <div className="auth-row">
                                        <div className="form-group">
                                            <label>Kategoria</label>
                                            <select value={svcForm.category} onChange={e => setSvcForm({ ...svcForm, category: e.target.value })}>
                                                {['flok', 'makeup', 'thonje', 'qerpik', 'facial', 'tjera'].map(c => (
                                                    <option key={c} value={c}>{c}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Çmimi (LEK)</label>
                                            <input type="number" value={svcForm.price} onChange={e => setSvcForm({ ...svcForm, price: e.target.value })} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Kohëzgjatja (minuta)</label>
                                        <input type="number" value={svcForm.duration} onChange={e => setSvcForm({ ...svcForm, duration: e.target.value })} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Shto Shërbimin</button>
                                </form>
                            </div>
                            <div className="admin-list">
                                {loadSvcs ? <div className="spinner"></div> : svcData?.data?.map(s => (
                                    <div key={s._id} className="admin-list-item card">
                                        <div>
                                            <strong>{s.name}</strong>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-mid)' }}>{s.category} · {s.price} L · {s.duration} min</p>
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSvc(s._id)}>Fshi</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Staff Tab */}
                {tab === 'staff' && (
                    <div className="admin-section fade-in">
                        <div className="admin-two-col">
                            <div className="card admin-form-card">
                                <h3>Shto Punonjëse të Re</h3>
                                <form onSubmit={handleCreateStaff} className="admin-form">
                                    <div className="form-group">
                                        <label>Emri i Plotë</label>
                                        <input value={staffForm.name} onChange={e => setStaffForm({ ...staffForm, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Roli / Titulli</label>
                                        <input value={staffForm.role} onChange={e => setStaffForm({ ...staffForm, role: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Bio</label>
                                        <textarea rows={3} value={staffForm.bio} onChange={e => setStaffForm({ ...staffForm, bio: e.target.value })} />
                                    </div>
                                    <div className="form-group">
                                        <label>Specializimet (me presje)</label>
                                        <input value={staffForm.specializations}
                                            onChange={e => setStaffForm({ ...staffForm, specializations: e.target.value })}
                                            placeholder="Makeup, Balayage, Keratin" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Shto Punonjësen</button>
                                </form>
                            </div>
                            <div className="admin-list">
                                {loadStaff ? <div className="spinner"></div> : staffData?.data?.map(m => (
                                    <div key={m._id} className="admin-list-item card">
                                        <div>
                                            <strong>{m.name}</strong>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--gray-mid)' }}>{m.role}</p>
                                        </div>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteStaff(m._id)}>Fshi</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}