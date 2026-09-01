import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: '⌂' },
  { label: 'Complaints', path: '/admin/complaints', icon: '⚑' },
  { label: 'Users', path: '/admin/users', icon: '👤' },
  { label: 'Analytics', path: '/admin/analytics', icon: '◔' },
  { label: 'Settings', path: '/admin/settings', icon: '⚙' },
]

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <div className="brand-box">
        <div className="brand-mark">S</div>
        <div>
          <p className="brand-name">SmartCity</p>
          <small>Admin Console</small>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Sidebar navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="mini-card">
          <span>System</span>
          <strong>Healthy</strong>
        </div>
      </div>
    </aside>
  )
}

export default AdminSidebar
