import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Service from './pages/Service'
import Staff from './pages/Staff'
import NewAppointment from './pages/NewAppointment'
import AppointmentList from './pages/AppointmentList'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import './styles/index.css'

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/services" element={<Service />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/appointments" element={
                    <ProtectedRoute>
                        <AppointmentList />
                    </ProtectedRoute>
                } />
                <Route path="/appointments/new" element={
                    <ProtectedRoute>
                        <NewAppointment />
                    </ProtectedRoute>
                } />
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly>
                        <Admin />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
            </Routes>
        </>
    )
}

export default App