import { Navigate, Route, Routes } from 'react-router-dom'
import AdminNavbar from './components/AdminNavbar'
import AdminSidebar from './components/AdminSidebar'
import AdminDashboard from './pages/admin/AdminDashboard'
import Login from './pages/Login'
import CitizenRegister from './pages/CitizenRegister'
import CitizenDashboard from './pages/citizen/CitizenDashboard'
import CitizenNewComplaint from './pages/citizen/CitizenNewComplaint'
import CitizenComplaints from './pages/citizen/CitizenComplaints'
import CitizenComplaintDetails from './pages/citizen/CitizenComplaintDetails'
import CitizenNotifications from './pages/citizen/CitizenNotifications'
import CitizenProfile from './pages/citizen/CitizenProfile'
import Analytics from './pages/admin/Analytics'
import ComplaintDetails from './pages/admin/ComplaintDetails'
import Complaints from './pages/admin/Complaints'
import Settings from './pages/admin/Settings'
import Users from './pages/admin/Users'
import './App.css'

const isAdminAuthenticated = () => localStorage.getItem('admin-auth') === 'true'
const isCitizenAuthenticated = () => localStorage.getItem('citizen-auth') === 'true'

function ProtectedLayout() {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-shell">
      <AdminSidebar />

      <main className="main-panel">
        <AdminNavbar />

        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/complaints" element={<Complaints />} />
          <Route path="/admin/complaints/:complaintId" element={<ComplaintDetails />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/citizen-register" element={<CitizenRegister />} />
      <Route
        path="/"
        element={
          <Navigate
            to={isAdminAuthenticated() ? '/admin' : isCitizenAuthenticated() ? '/citizen-dashboard' : '/login'}
            replace
          />
        }
      />
      <Route
        path="/citizen-dashboard"
        element={
          isCitizenAuthenticated() ? (
            <CitizenDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/citizen-new-complaint"
        element={
          isCitizenAuthenticated() ? (
            <CitizenNewComplaint />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/citizen-complaints"
        element={
          isCitizenAuthenticated() ? (
            <CitizenComplaints />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/citizen-complaint/:complaintId"
        element={
          isCitizenAuthenticated() ? (
            <CitizenComplaintDetails />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/citizen-notifications"
        element={
          isCitizenAuthenticated() ? (
            <CitizenNotifications />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/citizen-profile"
        element={
          isCitizenAuthenticated() ? (
            <CitizenProfile />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/*" element={<ProtectedLayout />} />
    </Routes>
  )
}

export default App
