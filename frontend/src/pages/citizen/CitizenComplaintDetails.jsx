import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CitizenSidebar from '../../components/CitizenSidebar'

function CitizenComplaintDetails() {
  const navigate = useNavigate()
  const { complaintId } = useParams()
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load sample complaints
    const sampleComplaints = [
      {
        id: 'CMP-2048',
        title: 'Road pothole near home',
        category: 'Roads',
        date: '28 Aug 2024',
        status: 'Pending',
        description:
          'There is a large pothole on Main Street near my residence that has been causing damage to vehicles. It needs immediate repair.',
        location: 'Main Street, Sector 12',
        priority: 'High',
        submittedBy: 'Aarav Sen',
        submittedAt: '2024-08-28 10:30 AM',
        lastUpdated: '2024-08-28 10:30 AM',
      },
      {
        id: 'CMP-2043',
        title: 'Water supply issue',
        category: 'Water',
        date: '27 Aug 2024',
        status: 'In Progress',
        description:
          'The water supply has been disrupted in our area for the past 3 days. There is no water flow in the morning hours.',
        location: 'Ward 4B',
        priority: 'High',
        submittedBy: 'Aarav Sen',
        submittedAt: '2024-08-27 09:15 AM',
        lastUpdated: '2024-08-29 02:00 PM',
        assignedTo: 'Vikram Nair',
      },
      {
        id: 'CMP-2039',
        title: 'Garbage collection delay',
        category: 'Waste Management',
        date: '20 Aug 2024',
        status: 'Resolved',
        description:
          'Waste collection was delayed for over a week. The streets were filled with garbage bags.',
        location: 'Central Zone',
        priority: 'Medium',
        submittedBy: 'Aarav Sen',
        submittedAt: '2024-08-20 11:00 AM',
        lastUpdated: '2024-08-26 04:30 PM',
        assignedTo: 'Sonia Das',
        resolvedAt: '2024-08-26 04:30 PM',
      },
    ]

    // Check registered complaints
    const registeredComplaints = JSON.parse(localStorage.getItem('citizen-complaints') || '[]')
    const allComplaints = [...registeredComplaints, ...sampleComplaints]

    const found = allComplaints.find((c) => c.id === complaintId)
    setComplaint(found || null)
    setLoading(false)
  }, [complaintId])

  if (loading) {
    return (
      <div className="citizen-app-shell">
        <CitizenSidebar />
        <main className="citizen-main-panel">
          <div className="citizen-navbar">
            <div className="citizen-greeting">
              <h1>Loading...</h1>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!complaint) {
    return (
      <div className="citizen-app-shell">
        <CitizenSidebar />
        <main className="citizen-main-panel">
          <div className="citizen-navbar">
            <div className="citizen-greeting">
              <h1>Complaint Not Found</h1>
            </div>
          </div>
          <div className="citizen-content">
            <button className="action-button ghost" onClick={() => navigate('/citizen-complaints')}>
              ← Back to Complaints
            </button>
          </div>
        </main>
      </div>
    )
  }

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
            <h1>Complaint Details</h1>
          </div>
        </div>

        <div className="citizen-content">
          <button className="back-button" onClick={() => navigate('/citizen-complaints')}>
            ← Back to Complaints
          </button>

          <div className="detail-container">
            <div className="detail-header">
              <div>
                <h2>{complaint.title}</h2>
                <p className="detail-id">{complaint.id}</p>
              </div>
              <span
                className="detail-status-badge"
                style={{ color: getStatusColor(complaint.status) }}
              >
                {complaint.status}
              </span>
            </div>

            <div className="detail-grid">
              <div className="detail-section">
                <h3>Complaint Information</h3>
                <div className="detail-row">
                  <label>Category:</label>
                  <span>{complaint.category}</span>
                </div>
                <div className="detail-row">
                  <label>Priority:</label>
                  <span>{complaint.priority}</span>
                </div>
                <div className="detail-row">
                  <label>Location:</label>
                  <span>{complaint.location}</span>
                </div>
                <div className="detail-row">
                  <label>Submitted By:</label>
                  <span>{complaint.submittedBy}</span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Timeline</h3>
                <div className="detail-row">
                  <label>Submitted:</label>
                  <span>{complaint.submittedAt}</span>
                </div>
                <div className="detail-row">
                  <label>Last Updated:</label>
                  <span>{complaint.lastUpdated}</span>
                </div>
                {complaint.assignedTo && (
                  <div className="detail-row">
                    <label>Assigned To:</label>
                    <span>{complaint.assignedTo}</span>
                  </div>
                )}
                {complaint.resolvedAt && (
                  <div className="detail-row">
                    <label>Resolved:</label>
                    <span>{complaint.resolvedAt}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="detail-description">
              <h3>Description</h3>
              <p>{complaint.description}</p>
            </div>

            <div className="detail-actions">
              <button className="action-button primary" onClick={() => navigate('/citizen-complaints')}>
                Back to List
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CitizenComplaintDetails
