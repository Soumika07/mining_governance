function AdminNavbar() {
  return (
    <header className="admin-navbar">
      <div className="portal-title-wrap">
        <h2>Government Admin Portal</h2>
      </div>

      <div className="navbar-actions">
        <button type="button" className="action-button ghost">Export</button>
        <button type="button" className="action-button primary">+ New report</button>
        <div className="profile-pill">
          <div className="profile-avatar">A</div>
          <div>
            <strong>Admin</strong>
            <small>System admin</small>
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
