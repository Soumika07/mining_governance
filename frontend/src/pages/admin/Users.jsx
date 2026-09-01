import { useEffect, useState } from 'react'
import StatusBadge from '../../components/StatusBadge'
import { getUsers } from '../../services/adminApi'

function Users() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('All Roles')
  const [statusFilter, setStatusFilter] = useState('All Status')
  const [zoneFilter, setZoneFilter] = useState('All Zones/Wards')
  const [checkedUsers, setCheckedUsers] = useState(new Set())

  useEffect(() => {
    async function loadUsers() {
      const data = await getUsers()
      setUsers(data)
    }

    loadUsers()
  }, [])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.zone.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter
    const matchesZone = zoneFilter === 'All Zones/Wards' || user.zone === zoneFilter

    return matchesSearch && matchesRole && matchesStatus && matchesZone
  })

  const totalUsers = users.length
  const activeOfficers = users.filter((u) => u.status === 'Active' && u.role !== 'Resident').length
  const pendingVerifications = users.filter((u) => u.status === 'Pending').length

  const uniqueRoles = ['All Roles', ...new Set(users.map((u) => u.role))]
  const uniqueStatuses = ['All Status', ...new Set(users.map((u) => u.status))]
  const uniqueZones = ['All Zones/Wards', ...new Set(users.map((u) => u.zone))]

  const toggleCheck = (userId) => {
    const newChecked = new Set(checkedUsers)
    if (newChecked.has(userId)) {
      newChecked.delete(userId)
    } else {
      newChecked.add(userId)
    }
    setCheckedUsers(newChecked)
  }

  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">People</p>
          <h1>Users</h1>
        </div>
      </div>

      <div className="users-summary-grid">
        <div className="summary-card">
          <p className="summary-label">Total Users</p>
          <strong className="summary-value">{totalUsers.toLocaleString()}</strong>
          <span className="summary-detail">+34 new this week</span>
        </div>
        <div className="summary-card">
          <p className="summary-label">Active Officers</p>
          <strong className="summary-value">{activeOfficers}</strong>
          <span className="summary-detail">Field Engineers (2), Officers (3)</span>
        </div>
        <div className="summary-card">
          <p className="summary-label">Pending Verifications</p>
          <strong className="summary-value" style={{ color: '#f59e0b' }}>
            {pendingVerifications}
          </strong>
          <span className="summary-pill">Needs attention</span>
        </div>
      </div>

      <div className="users-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, ID, zone, role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {uniqueRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select value={zoneFilter} onChange={(e) => setZoneFilter(e.target.value)}>
            {uniqueZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th style={{ width: '24px' }}>
                <input type="checkbox" />
              </th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Complaints</th>
              <th>Zone/Ward</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={checkedUsers.has(user.id)}
                    onChange={() => toggleCheck(user.id)}
                  />
                </td>
                <td>
                  <div className="user-cell">
                    <span className="user-avatar">{user.name.charAt(0)}</span>
                    <div>
                      <strong>{user.name}</strong>
                      <div className="subtle">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.role}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td>{user.complaints}</td>
                <td>{user.zone}</td>
                <td>
                  <div className="table-actions">
                    <button className="icon-button" title="View">
                      👁️
                    </button>
                    <button className="icon-button" title="Edit">
                      ✏️
                    </button>
                    <button className="icon-button" title="More">
                      ⋮
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="table-footer">
          <span>Showing 1-5 of {filteredUsers.length} users</span>
          <div className="pagination">
            <button>← Prev</button>
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
