import { useEffect, useState } from 'react'
import { getComplaints, getDashboardStats } from '../../services/adminApi'

const statusChart = [
  { label: 'Pending', value: 36, color: '#f59e0b' },
  { label: 'In Progress', value: 24, color: '#3b82f6' },
  { label: 'Resolved', value: 28, color: '#10b981' },
  { label: 'Rejected', value: 12, color: '#ef4444' },
]

const departmentChart = [
  { label: 'Water', value: 28 },
  { label: 'Roads', value: 22 },
  { label: 'Sanitation', value: 18 },
  { label: 'Lighting', value: 16 },
  { label: 'Environment', value: 10 },
  { label: 'Others', value: 6 },
]

function AdminDashboard() {
  const [stats, setStats] = useState([])
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    async function loadData() {
      const [statsData, complaintsData] = await Promise.all([
        getDashboardStats(),
        getComplaints(),
      ])

      setStats(statsData)
      setComplaints(complaintsData.slice(0, 6))
    }

    loadData()
  }, [])

  return (
    <div className="page-shell dashboard-page">
      <div className="summary-grid">
        {stats.map((stat) => (
          <div key={stat.title} className="summary-card">
            <div className="summary-top">
              <span className="summary-icon">{stat.icon}</span>
              <span className={`summary-trend ${stat.trend}`}>{stat.change}</span>
            </div>
            <h3>{stat.value}</h3>
            <p>{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <div className="card-header">
            <h3>Complaint Status</h3>
            <span>Updated now</span>
          </div>

          <div className="status-chart">
            {statusChart.map((item) => (
              <div key={item.label} className="status-row">
                <div className="status-label">
                  <span className="dot" style={{ background: item.color }} />
                  <span>{item.label}</span>
                </div>
                <div className="status-bar-wrap">
                  <div className="status-bar" style={{ width: `${item.value}%`, background: item.color }} />
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card">
          <div className="card-header">
            <h3>Complaints by Department</h3>
            <span>Current month</span>
          </div>

          <div className="department-chart">
            {departmentChart.map((item) => (
              <div key={item.label} className="department-row">
                <span>{item.label}</span>
                <div className="department-bar-wrap">
                  <div className="department-bar" style={{ width: `${item.value}%` }} />
                </div>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="table-card complaint-list-card">
        <div className="card-header table-header">
          <h3>Recent Complaints</h3>
          <button type="button" className="text-button">View all</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.category}</td>
                <td>{complaint.location}</td>
                <td>
                  <span className={`status-badge status-${complaint.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {complaint.status}
                  </span>
                </td>
                <td>
                  <span className={`priority-pill ${complaint.priority.toLowerCase()}`}>{complaint.priority}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
