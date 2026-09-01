function StatusBadge({ status }) {
  const normalized = status.toLowerCase().replace(/\s+/g, '-')

  return <span className={`status-badge status-${normalized}`}>{status}</span>
}

export default StatusBadge
