import { useNavigate } from 'react-router-dom'

function CitizenSidebar() {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'Dashboard', icon: '📊', path: '/citizen-dashboard' },
    { label: 'New Complaint', icon: '➕', path: '/citizen-new-complaint' },
    { label: 'My Complaints', icon: '📋', path: '/citizen-complaints' },
    { label: 'Notifications', icon: '🔔', path: '/citizen-notifications' },
    { label: 'Profile', icon: '👤', path: '/citizen-profile' },
  ]

  return (
    <aside className="citizen-sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">S</div>
        <div>
          <h3>GOV PORTAL</h3>
          <p>Citizen Portal</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.label}
            className="nav-item"
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="system-status">
          <div className="status-badge online">●</div>
          <span>Online</span>
        </div>
      </div>
    </aside>
  )
}

export default CitizenSidebar
