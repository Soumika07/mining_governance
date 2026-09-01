import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_EMAIL = 'admin@city.gov'
const ADMIN_PASSWORD = 'admin123'

function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState(ADMIN_EMAIL)
  const [password, setPassword] = useState(ADMIN_PASSWORD)
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true')
      navigate('/admin')
      return
    }

    setError('Invalid admin credentials. Use admin@city.gov / admin123')
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="login-badge">S</div>
          <div>
            <p className="eyebrow">Government Portal</p>
            <h1>Admin Login</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@city.gov"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="admin123"
            />
          </label>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="action-button primary login-button">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
