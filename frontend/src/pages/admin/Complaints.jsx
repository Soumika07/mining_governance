import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from '../../components/StatusBadge'
import { getComplaints } from '../../services/adminApi'

function Complaints() {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    async function loadComplaints() {
      const data = await getComplaints()
      setComplaints(data)
    }

    loadComplaints()
  }, [])

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Operations</p>
          <h1>Complaints</h1>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Assigned to</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>
                  <Link to={`/admin/complaints/${complaint.id}`} className="complaint-title">
                    {complaint.id}
                  </Link>
                </td>
                <td>{complaint.title}</td>
                <td>{complaint.category}</td>
                <td>
                  <StatusBadge status={complaint.status} />
                </td>
                <td>
                  <span className={`priority-pill ${complaint.priority.toLowerCase()}`}>
                    {complaint.priority}
                  </span>
                </td>
                <td>{complaint.assignedTo}</td>
                <td>
                  <Link to={`/admin/complaints/${complaint.id}`} className="table-action-button">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Complaints
