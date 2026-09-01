import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

function ComplaintTable({ complaints = [] }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Recent complaints</h3>
        <Link to="/admin/complaints" className="text-link">View all</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Complaint</th>
            <th>Category</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>
                <Link to={`/admin/complaints/${complaint.id}`} className="complaint-title">
                  {complaint.id}
                </Link>
                <div className="subtle">{complaint.title}</div>
              </td>
              <td>{complaint.category}</td>
              <td>
                <StatusBadge status={complaint.status} />
              </td>
              <td>
                <span className={`priority-pill ${complaint.priority.toLowerCase()}`}>
                  {complaint.priority}
                </span>
              </td>
              <td>{complaint.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ComplaintTable
