function Settings() {
  return (
    <div className="page-shell">
      <div className="page-header">
        <div>
          <p className="eyebrow">Configuration</p>
          <h1>Settings</h1>
        </div>
      </div>

      <div className="chart-card">
        <div className="card-header">
          <h3>System settings</h3>
          <span>Admin controls</span>
        </div>

        <div className="status-chart">
          <div className="status-row">
            <div className="status-label">
              <span className="dot" style={{ background: '#3b82f6' }} />
              <span>Auto-escalation</span>
            </div>
            <div className="status-bar-wrap">
              <div className="status-bar" style={{ width: '82%', background: '#3b82f6' }} />
            </div>
            <strong>82%</strong>
          </div>

          <div className="status-row">
            <div className="status-label">
              <span className="dot" style={{ background: '#10b981' }} />
              <span>Alert threshold</span>
            </div>
            <div className="status-bar-wrap">
              <div className="status-bar" style={{ width: '70%', background: '#10b981' }} />
            </div>
            <strong>70%</strong>
          </div>

          <div className="status-row">
            <div className="status-label">
              <span className="dot" style={{ background: '#f59e0b' }} />
              <span>Workflow sync</span>
            </div>
            <div className="status-bar-wrap">
              <div className="status-bar" style={{ width: '94%', background: '#f59e0b' }} />
            </div>
            <strong>94%</strong>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
