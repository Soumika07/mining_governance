import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge'
import { getComplaintById } from '../../services/adminApi'

function ComplaintDetails() {
  const { complaintId } = useParams()
  const [complaint, setComplaint] = useState(null)

  useEffect(() => {
    async function loadComplaint() {
      const data = await getComplaintById(complaintId)
      setComplaint(data)
    }

    loadComplaint()
  }, [complaintId])

  if (!complaint) {
    return <div className="page-shell">Loading complaint...</div>
  }

  return (
    <div className="page-shell detail-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Complaint details</p>
          <h1>{complaint.id}</h1>
        </div>
        <Link to="/admin/complaints" className="action-button ghost">
          Back to complaints
        </Link>
      </div>

      <div className="details-grid">
        <div className="panel-card detail-card">
          <div className="detail-topline">
            <h2>{complaint.title}</h2>
            <StatusBadge status={complaint.status} />
          </div>
          <p className="detail-description">{complaint.description}</p>

          <div className="detail-meta">
            <div>
              <label>Category</label>
              <strong>{complaint.category}</strong>
            </div>
            <div>
              <label>Priority</label>
              <strong>{complaint.priority}</strong>
            </div>
            <div>
              <label>Submitted by</label>
              <strong>{complaint.submittedBy}</strong>
            </div>
            <div>
              <label>Assigned to</label>
              <strong>{complaint.assignedTo}</strong>
            </div>
            <div>
              <label>Location</label>
              <strong>{complaint.location}</strong>
            </div>
            <div>
              <label>Created</label>
              <strong>{complaint.createdAt}</strong>
            </div>
          </div>
        </div>

        <div className="panel-card action-card">
          <h3>Quick actions</h3>
          <button type="button" className="action-button primary">Assign team</button>
          <button type="button" className="action-button ghost">Escalate</button>
          <button type="button" className="action-button ghost">Mark resolved</button>
        </div>
      </div>
    </div>
  )
}

export default ComplaintDetails
