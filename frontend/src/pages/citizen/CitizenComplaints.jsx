import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CitizenSidebar from '../../components/CitizenSidebar'

function CitizenComplaints() {
  const navigate = useNavigate()
  const [complaints, setComplaints] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [filteredComplaints, setFilteredComplaints] = useState([])

  useEffect(() => {
    // Load sample and registered complaints
    const sampleComplaints = [
      {
        id: 'CMP-2048',
        title: 'Road pothole near home',
        category: 'Roads',
        date: '28 Aug',
        status: 'Pending',
      },
      {
        id: 'CMP-2043',
        title: 'Water supply issue',
        category: 'Water',
        date: '27 Aug',
        status: 'In Progress',
      },
      {
        id: 'CMP-2039',
        title: 'Garbage collection delay',
        category: 'Waste Management',
        date: '20 Aug',
        status: 'Resolved',
      },
    ]

    // Add any registered complaints from localStorage
    const registeredComplaints = JSON.parse(localStorage.getItem('citizen-complaints') || '[]')
    const allComplaints = [...registeredComplaints, ...sampleComplaints]

    setComplaints(allComplaints)
  }, [])

  useEffect(() => {
    let filtered = complaints

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (complaint) =>
          complaint.id.toLowerCase().includes(search) ||
          complaint.title.toLowerCase().includes(search)
      )
    }

    // Apply status filter
    if (statusFilter !== 'All Status') {
      filtered = filtered.filter((complaint) => complaint.status === statusFilter)
    }

    setFilteredComplaints(filtered)
  }, [searchTerm, statusFilter, complaints])

  const uniqueStatuses = ['All Status', 'Pending', 'In Progress', 'Resolved']

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
            <h1>My Complaints</h1>
          </div>
        </div>

        <div className="citizen-content">
          <div className="complaints-controls">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by ID or complaint..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-container">
              <label>Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="complaints-table-container">
            {filteredComplaints.length > 0 ? (
              <table className="complaints-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Category</th>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((complaint) => (
                    <tr
                      key={complaint.id}
                      onClick={() => navigate(`/citizen-complaint/${complaint.id}`)}
                      className="complaint-row"
                    >
                      <td className="id-cell">
                        <strong>{complaint.id}</strong>
                      </td>
                      <td className="category-cell">{complaint.category}</td>
                      <td className="title-cell">{complaint.title}</td>
                      <td className="date-cell">{complaint.date}</td>
                      <td className="status-cell">
                        <span
                          className="status-badge"
                          style={{ color: getStatusColor(complaint.status) }}
                        >
                          {complaint.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="no-complaints-message">
                <p>No complaints found</p>
              </div>
            )}
          </div>

          {filteredComplaints.length > 0 && (
            <div className="complaints-footer">
              <span>Showing {filteredComplaints.length} complaint(s)</span>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CitizenComplaints
