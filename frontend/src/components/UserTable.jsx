function UserTable({ users = [] }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Users</h3>
        <button type="button" className="text-button">Manage</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Complaints</th>
            <th>Last active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div className="user-cell">
                  <span className="user-avatar">{user.name.charAt(0)}</span>
                  <div>
                    <strong>{user.name}</strong>
                    <div className="subtle">{user.id}</div>
                  </div>
                </div>
              </td>
              <td>{user.role}</td>
              <td>
                <StatusBadge status={user.status} />
              </td>
              <td>{user.complaints}</td>
              <td>{user.lastActive}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
