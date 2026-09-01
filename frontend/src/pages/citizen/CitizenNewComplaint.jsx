import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CitizenSidebar from '../../components/CitizenSidebar'

const COMPLAINT_CATEGORIES = [
  'Roads',
  'Water',
  'Waste Management',
  'Electricity',
  'Sanitation',
  'Street Lights',
  'Other',
]

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical']

function CitizenNewComplaint() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [complaintId, setComplaintId] = useState('')
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
    priority: 'Low',
    photo: null,
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    setFormData((prev) => ({
      ...prev,
      photo: file,
    }))
  }

  const validateForm = () => {
    if (!formData.category.trim()) {
      setError('Please select a complaint category')
      return false
    }
    if (!formData.title.trim()) {
      setError('Please enter a complaint title')
      return false
    }
    if (!formData.description.trim()) {
      setError('Please enter a description')
      return false
    }
    if (!formData.location.trim()) {
      setError('Please enter the location')
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

    // Generate complaint ID
    const newComplaintId = `CMP-${Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0')}`

    // Save complaint (in real app, would send to backend)
    const complaint = {
      id: newComplaintId,
      ...formData,
      submittedBy: localStorage.getItem('citizen-name') || 'Citizen',
      submittedAt: new Date().toISOString(),
      status: 'Pending',
    }

    // Store in localStorage
    const complaints = JSON.parse(localStorage.getItem('citizen-complaints') || '[]')
    complaints.push(complaint)
    localStorage.setItem('citizen-complaints', JSON.stringify(complaints))

    // Show success
    setComplaintId(newComplaintId)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="citizen-app-shell">
        <CitizenSidebar />

        <main className="citizen-main-panel">
          <div className="citizen-navbar">
            <div className="citizen-greeting">
              <h1>Complaint Registration</h1>
            </div>
          </div>

          <div className="citizen-content">
            <div className="success-container">
              <div className="success-card">
                <div className="success-icon">✅</div>
                <h2>Complaint Submitted Successfully</h2>

                <div className="complaint-id-display">
                  <p className="id-label">Complaint ID:</p>
                  <p className="id-value">{complaintId}</p>
                </div>

                <p className="success-message">
                  You can use this ID to track your complaint status.
                </p>

                <div className="success-actions">
                  <button
                    className="action-button primary"
                    onClick={() => navigate('/citizen-complaints')}
                  >
                    Track Complaint
                  </button>
                  <button
                    className="action-button ghost"
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({
                        category: '',
                        title: '',
                        description: '',
                        location: '',
                        priority: 'Low',
                        photo: null,
                      })
                    }}
                  >
                    Register Another
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="citizen-app-shell">
      <CitizenSidebar />

      <main className="citizen-main-panel">
        <div className="citizen-navbar">
          <div className="citizen-greeting">
            <h1>Register New Complaint</h1>
          </div>
        </div>

        <div className="citizen-content">
          <div className="complaint-form-container">
            <form onSubmit={handleSubmit} className="complaint-form">
              <div className="form-group">
                <label htmlFor="category">
                  <span>Complaint Category *</span>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {COMPLAINT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="title">
                  <span>Complaint Title *</span>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Brief title of your complaint"
                  />
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  <span>Description *</span>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide detailed description of the issue"
                    rows="4"
                  />
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="location">
                  <span>Location *</span>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Street address, landmark, or zone"
                  />
                </label>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">
                    <span>Priority</span>
                    <select
                      id="priority"
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                    >
                      {PRIORITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="form-group">
                  <label htmlFor="photo">
                    <span>Upload Photo / Evidence</span>
                    <input
                      id="photo"
                      type="file"
                      name="photo"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="file-input"
                    />
                  </label>
                </div>
              </div>

              {formData.photo && (
                <div className="file-info">
                  <p>📎 {formData.photo.name}</p>
                </div>
              )}

              {error && <div className="form-error">{error}</div>}

              <button type="submit" className="action-button primary submit-button">
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default CitizenNewComplaint
