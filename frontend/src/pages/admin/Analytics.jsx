function Analytics() {
  const summary = [
    { label: 'Total Complaints', value: '1,250' },
    { label: 'Resolution Rate', value: '74%' },
    { label: 'Avg Resolution Time', value: '3.2 days' },
  ]

  const statusData = [
    { label: 'Resolved', value: 740, color: '#22c55e', width: '74%' },
    { label: 'Pending', value: 320, color: '#f59e0b', width: '32%' },
    { label: 'In Progress', value: 180, color: '#60a5fa', width: '18%' },
    { label: 'Rejected', value: 10, color: '#f87171', width: '1%' },
  ]

  const categoryData = [
    { label: 'Roads', value: 46, color: '#4f46e5' },
    { label: 'Water', value: 32, color: '#06b6d4' },
    { label: 'Waste', value: 24, color: '#10b981' },
    { label: 'Electricity', value: 18, color: '#f59e0b' },
  ]

  return (
    <div className="page-shell analytics-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Insights</p>
          <h1>Analytics</h1>
        </div>
      </div>

      <div className="analytics-summary">
        {summary.map((item) => (
          <div key={item.label} className="summary-box">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>

      <div className="analytics-grid-two">
        <div className="analytics-panel">
          <h3>Complaints by Status</h3>
          <div className="analytics-box">
            {statusData.map((item) => (
              <div key={item.label} className="bar-entry">
                <div className="bar-meta">
                  <span className="bar-color" style={{ background: item.color }} />
                  <span>{item.label}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: item.width, background: item.color }} />
                </div>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics-panel">
          <h3>Complaints by Category</h3>
          <div className="analytics-box">
            {categoryData.map((item) => (
              <div key={item.label} className="category-entry">
                <div className="category-name">{item.label}</div>
                <div className="category-track">
                  <div className="category-fill" style={{ width: `${item.value}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
