import { useEffect, useState } from 'react'
import CitizenSidebar from '../../components/CitizenSidebar'

const defaultProfile = {
  name: 'Ravi Kumar',
  email: 'ravi@gmail.com',
  mobile: '9876543210',
  address: 'Hyderabad',
}

function CitizenProfile() {
  const [profile, setProfile] = useState(defaultProfile)
  const [isEditing, setIsEditing] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [formData, setFormData] = useState(defaultProfile)

  useEffect(() => {
    const citizenName = localStorage.getItem('citizen-name') || defaultProfile.name
    const citizenEmail = localStorage.getItem('citizen-email') || defaultProfile.email
    const citizenMobile = localStorage.getItem('citizen-mobile') || defaultProfile.mobile
    const citizenAddress = localStorage.getItem('citizen-address') || defaultProfile.address

    const nextProfile = {
      name: citizenName,
      email: citizenEmail,
      mobile: citizenMobile,
      address: citizenAddress,
    }

    setProfile(nextProfile)
    setFormData(nextProfile)
  }, [])

  const handleSaveProfile = () => {
    setProfile(formData)
    localStorage.setItem('citizen-name', formData.name)
    localStorage.setItem('citizen-email', formData.email)
    localStorage.setItem('citizen-mobile', formData.mobile)
    localStorage.setItem('citizen-address', formData.address)
    setIsEditing(false)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="citizen-app-shell">
      <CitizenSidebar />

      <main className="citizen-main-panel">
        <div className="citizen-navbar">
          <div className="citizen-greeting">
            <h1>My Profile</h1>
          </div>
        </div>

        <div className="citizen-content">
          <div className="profile-card">
            {!isEditing ? (
              <>
                <div className="profile-header">
                  <div className="profile-avatar">{profile.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <h2>{profile.name}</h2>
                    <p>Citizen ID: {localStorage.getItem('citizen-id') || 'CIT-001'}</p>
                  </div>
                </div>

                <div className="profile-details">
                  <div className="profile-row">
                    <span className="profile-label">Name</span>
                    <strong>{profile.name}</strong>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Email</span>
                    <strong>{profile.email}</strong>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Mobile</span>
                    <strong>{profile.mobile}</strong>
                  </div>
                  <div className="profile-row">
                    <span className="profile-label">Address</span>
                    <strong>{profile.address}</strong>
                  </div>
                </div>
              </>
            ) : (
              <div className="profile-form">
                <label>
                  <span>Name</span>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                </label>
                <label>
                  <span>Mobile</span>
                  <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange} />
                </label>
                <label>
                  <span>Address</span>
                  <textarea name="address" value={formData.address} rows="3" onChange={handleInputChange} />
                </label>
                <div className="profile-actions">
                  <button className="action-button primary" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                  <button className="action-button ghost" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {!isEditing && (
              <div className="profile-actions">
                <button className="action-button primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
                <button className="action-button ghost" onClick={() => setShowPasswordForm((prev) => !prev)}>
                  Change Password
                </button>
              </div>
            )}

            {showPasswordForm && !isEditing && (
              <div className="password-form">
                <label>
                  <span>Current Password</span>
                  <input type="password" placeholder="Enter current password" />
                </label>
                <label>
                  <span>New Password</span>
                  <input type="password" placeholder="Enter new password" />
                </label>
                <label>
                  <span>Confirm Password</span>
                  <input type="password" placeholder="Re-enter new password" />
                </label>
                <div className="profile-actions">
                  <button className="action-button primary">Update Password</button>
                  <button className="action-button ghost" onClick={() => setShowPasswordForm(false)}>
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CitizenProfile
