function StatCard({ title, value, change, trend, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <span className={`stat-trend ${trend === 'down' ? 'negative' : 'positive'}`}>
          {change}
        </span>
      </div>
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  )
}

export default StatCard
