import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CitizenSidebar from '../../components/CitizenSidebar'

function CitizenDashboard() {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const citizenName = localStorage.getItem('citizen-name') || 'User'

  useEffect(() => {
    // Load citizen's complaints
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    const currentCitizen = registeredUsers[0] // For demo purposes
    
    if (currentCitizen) {
      // Generate sample complaints for this citizen
      const citizenComplaints = [
        {
          id: 'CMP-2048',
          title: 'Road pothole near home',
          category: 'Road Safety',
          status: 'Pending',
          submittedAt: '2 hours ago',
        },
        {
          id: 'CMP-2043',
          title: 'Water supply issue',
          category: 'Water Supply',
          status: 'In Progress',
          submittedAt: '1 day ago',
        },
        {
          id: 'CMP-2039',
          title: 'Garbage collection delay',
          category: 'Sanitation',
          status: 'Resolved',
          submittedAt: '3 days ago',
        },
      ]
      setComplaints(citizenComplaints)
    }
  }, [])

  const totalComplaints = complaints.length
  const pendingComplaints = complaints.filter((c) => c.status === 'Pending').length
  const inProgressComplaints = complaints.filter((c) => c.status === 'In Progress').length
  const resolvedComplaints = complaints.filter((c) => c.status === 'Resolved').length

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#f59e0b'
      case 'In Progress':
        return '#3b82f6'
      case 'Resolved':
        return '#22c55e'
      default:
        return '#6b7280'
    }
  }

  return (
    <div className="citizen-app-shell">
      <CitizenSidebar />

      <main className="citizen-main-panel">
        <div className="citizen-navbar">
          <div className="citizen-greeting">
            <h1>Welcome, {citizenName} 👋</h1>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('citizen-auth')
              localStorage.removeItem('citizen-name')
              navigate('/login')
            }}
            className="logout-button"
          >
            Logout
          </button>
        </div>

        <div className="citizen-content">
          <div className="citizen-page-header">
            <div>
              <p className="eyebrow">Personal</p>
              <h2>My Complaints</h2>
            </div>
            <button
              className="action-button primary new-complaint-btn"
              onClick={() => navigate('/citizen-new-complaint')}
            >
              ➕ Register Complaint
            </button>
          </div>

          <div className="complaint-stats">
            <div className="stat-card">
              <div className="stat-label">Total</div>
              <div className="stat-value">{totalComplaints}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Pending</div>
              <div className="stat-value" style={{ color: '#f59e0b' }}>
                {pendingComplaints}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Progress</div>
              <div className="stat-value" style={{ color: '#3b82f6' }}>
                {inProgressComplaints}
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Resolved</div>
              <div className="stat-value" style={{ color: '#22c55e' }}>
                {resolvedComplaints}
              </div>
            </div>
          </div>

          <div className="citizen-complaints-section">
            <div className="section-header">
              <h3>Recent Complaints</h3>
              <button
                className="view-all-link"
                onClick={() => navigate('/citizen-complaints')}
              >
                View All →
              </button>
            </div>

            {complaints.length > 0 ? (
              <div className="complaints-list">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="complaint-item">
                    <div className="complaint-info">
                      <div className="complaint-id">{complaint.id}</div>
                      <div className="complaint-details">
                        <div className="complaint-title">{complaint.title}</div>
                        <div className="complaint-category">{complaint.category}</div>
                      </div>
                    </div>
                    <div className="complaint-meta">
                      <span
                        className="complaint-status"
                        style={{ color: getStatusColor(complaint.status) }}
                      >
                        {complaint.status}
                      </span>
                      <span className="complaint-time">{complaint.submittedAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-complaints">
                <p>No complaints yet. Register your first complaint!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CitizenDashboard
