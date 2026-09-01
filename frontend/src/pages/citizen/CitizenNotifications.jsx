import { useMemo } from 'react'
import CitizenSidebar from '../../components/CitizenSidebar'

function CitizenNotifications() {
  const notifications = useMemo(() => {
    const storedComplaints = JSON.parse(localStorage.getItem('citizen-complaints') || '[]')

    const generated = [
      {
        id: 'CMP-2048',
        status: 'Pending',
        message: 'has been assigned to',
        detail: 'Roads Department.',
        time: '2 hours ago',
        tone: 'blue',
      },
      {
        id: 'CMP-2043',
        status: 'In Progress',
        message: 'is currently being reviewed.',
        detail: '',
        time: 'Yesterday',
        tone: 'yellow',
      },
      {
        id: 'CMP-2039',
        status: 'Resolved',
        message: 'has been resolved.',
        detail: '',
        time: '2 days ago',
        tone: 'green',
      },
    ]

    const storedNotifications = storedComplaints.map((complaint) => {
      if (complaint.status === 'Resolved') {
        return {
          id: complaint.id,
          status: complaint.status,
          message: 'has been resolved.',
          detail: '',
          time: 'Recently',
          tone: 'green',
        }
      }

      if (complaint.status === 'In Progress') {
        return {
          id: complaint.id,
          status: complaint.status,
          message: 'is currently being reviewed.',
          detail: '',
          time: 'Today',
          tone: 'yellow',
        }
      }

      return {
        id: complaint.id,
        status: complaint.status,
        message: 'has been assigned to',
        detail: `${complaint.category || 'Roads'} Department.`,
        time: 'Just now',
        tone: 'blue',
      }
    })

    return [...storedNotifications, ...generated].slice(0, 8)
  }, [])

  return (
    <div className="citizen-app-shell">
      <CitizenSidebar />

      <main className="citizen-main-panel">
        <div className="citizen-navbar">
          <div className="citizen-greeting">
            <h1>Notifications</h1>
          </div>
        </div>

        <div className="citizen-content">
          <div className="notifications-panel">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div key={`${notification.id}-${notification.time}`} className="notification-item">
                  <div className={`notification-dot ${notification.tone}`} />

                  <div className="notification-content">
                    <p className="notification-text">
                      <span className="notification-id">{notification.id}</span>{' '}
                      {notification.message}
                      {notification.detail ? (
                        <>
                          {' '}
                          <span className="notification-detail">{notification.detail}</span>
                        </>
                      ) : null}
                    </p>
                    <p className="notification-time">{notification.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-complaints-message">
                <p>No notifications yet.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CitizenNotifications
