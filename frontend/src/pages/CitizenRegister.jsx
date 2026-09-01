import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CitizenRegister() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    agreeToTerms: false,
  })
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError('Full name is required')
      return false
    }
    if (!formData.mobileNumber.trim()) {
      setError('Mobile number is required')
      return false
    }
    if (!/^\d{10}$/.test(formData.mobileNumber.trim())) {
      setError('Mobile number must be 10 digits')
      return false
    }
    if (!formData.email.trim()) {
      setError('Email is required')
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Please enter a valid email')
      return false
    }
    if (!formData.password) {
      setError('Password is required')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (!formData.address.trim()) {
      setError('Address/Location is required')
      return false
    }
    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    // Save registration data (in real app, would send to backend)
    const newUser = {
      id: `USR-${Math.floor(Math.random() * 10000)}`,
      name: formData.fullName,
      email: formData.email,
      mobile: formData.mobileNumber,
      password: formData.password,
      address: formData.address,
      role: 'Resident',
      status: 'Pending',
      complaints: 0,
      zone: 'TBD',
      lastActive: 'just now',
    }

    // Store in localStorage (for demo)
    const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]')
    existingUsers.push(newUser)
    localStorage.setItem('registeredUsers', JSON.stringify(existingUsers))

    // Show success and redirect to login
    alert('Registration successful! Please login with your credentials.')
    navigate('/login')
  }

  return (
    <div className="login-page unified-login">
      <div className="register-container">
        <div className="login-card citizen-register-card">
          <div className="citizen-header">
            <h2>GOV PORTAL</h2>
            <h3>Citizen Registration</h3>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <label>
              <span>Full Name *</span>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </label>

            <label>
              <span>Mobile Number *</span>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
            </label>

            <label>
              <span>Email *</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
              />
            </label>

            <label>
              <span>Password *</span>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 6 characters"
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

            <label>
              <span>Confirm Password *</span>
              <div className="password-input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? '👁️' : '👁️'}
                </button>
              </div>
            </label>

            <label>
              <span>Address / Location *</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your residential address"
                rows="3"
              />
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
              />
              <span>I agree to the Terms and Conditions *</span>
            </label>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" className="action-button primary citizen-login-button">
              REGISTER
            </button>

            <div className="back-to-login">
              <span>Already have an account?</span>
              <button
                type="button"
                className="register-link"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CitizenRegister
