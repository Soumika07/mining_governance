import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ADMIN_EMAIL = 'admin@city.gov'
const ADMIN_PASSWORD = 'admin123'

const CITIZEN_USERS = [
  { email: 'citizen@example.com', password: 'citizen123', name: 'Aarav Sen' },
  { email: 'resident@city.com', password: 'password123', name: 'Meera Iyer' },
  { mobile: '9876543210', password: 'citizen123', name: 'Aarav Sen' },
]

function Login() {
  const navigate = useNavigate()
  const [loginType, setLoginType] = useState('admin')
  
  // Admin form state
  const [adminEmail, setAdminEmail] = useState(ADMIN_EMAIL)
  const [adminPassword, setAdminPassword] = useState(ADMIN_PASSWORD)
  const [adminError, setAdminError] = useState('')

  // Citizen form state
  const [citizenMobileEmail, setCitizenMobileEmail] = useState('')
  const [citizenPassword, setCitizenPassword] = useState('')
  const [citizenError, setCitizenError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleAdminSubmit = (event) => {
    event.preventDefault()
    setAdminError('')

    if (adminEmail.trim() === ADMIN_EMAIL && adminPassword === ADMIN_PASSWORD) {
      localStorage.setItem('admin-auth', 'true')
      navigate('/admin')
      return
    }

    setAdminError('Invalid admin credentials. Use admin@city.gov / admin123')
  }

  const handleCitizenSubmit = (event) => {
    event.preventDefault()
    setCitizenError('')

    const validUser = CITIZEN_USERS.find(
      (user) =>
        (user.email === citizenMobileEmail.trim() || user.mobile === citizenMobileEmail.trim()) &&
        user.password === citizenPassword
    )

    if (validUser) {
      localStorage.setItem('citizen-auth', 'true')
      localStorage.setItem('citizen-name', validUser.name)
      navigate('/citizen-dashboard')
      return
    }

    setCitizenError('Invalid mobile/email or password')
  }

  return (
    <div className="login-page unified-login">
      <div className="login-tabs">
        <button
          className={`login-tab ${loginType === 'admin' ? 'active' : ''}`}
          onClick={() => setLoginType('admin')}
        >
          Admin Login
        </button>
        <button
          className={`login-tab ${loginType === 'citizen' ? 'active' : ''}`}
          onClick={() => setLoginType('citizen')}
        >
          Citizen Login
        </button>
      </div>

      {loginType === 'admin' && (
        <div className="login-card">
          <div className="login-header">
            <div className="login-badge">S</div>
            <div>
              <p className="eyebrow">Government Portal</p>
              <h1>Admin Login</h1>
            </div>
          </div>

          <form onSubmit={handleAdminSubmit} className="login-form">
            <label>
              <span>Email</span>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@city.gov"
              />
            </label>

            <label>
              <span>Password</span>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="admin123"
              />
            </label>

            {adminError && <div className="login-error">{adminError}</div>}

            <button type="submit" className="action-button primary login-button">
              Sign in
            </button>
          </form>
        </div>
      )}

      {loginType === 'citizen' && (
        <div className="login-card citizen-login-card">
          <div className="citizen-header">
            <h2>GOV PORTAL</h2>
            <h3>Citizen Login</h3>
          </div>

          <form onSubmit={handleCitizenSubmit} className="citizen-login-form">
            <label>
              <span>Mobile / Email</span>
              <input
                type="text"
                value={citizenMobileEmail}
                onChange={(e) => setCitizenMobileEmail(e.target.value)}
                placeholder="Enter mobile number or email"
              />
            </label>

            <label>
              <span>Password</span>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={citizenPassword}
                  onChange={(e) => setCitizenPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️'}
                </button>
              </div>
            </label>

            {citizenError && <div className="login-error">{citizenError}</div>}

            <button type="submit" className="action-button primary login-button citizen-login-button">
              LOGIN
            </button>

            <button type="button" className="forgot-password-link">
              Forgot Password?
            </button>

            <div className="register-section">
              <span>Don't have an account?</span>
              <button
                type="button"
                className="register-link"
                onClick={() => navigate('/citizen-register')}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Login
