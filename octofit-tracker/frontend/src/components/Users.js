import React, { useState, useEffect } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users API Endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Users - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const usersData = data.results || data;
        setUsers(Array.isArray(usersData) ? usersData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Users - Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="loading-spinner">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Users</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2><i className="bi bi-person"></i> Users</h2>
        <p className="mb-0">Community members and their profiles</p>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👤</div>
          <h3>No users found</h3>
          <p>No user data available at the moment.</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <span className="badge bg-primary">Total Users: {users.length}</span>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Team</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <strong>{user.name || user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-info">{user.username || 'N/A'}</span>
                    </td>
                    <td>{user.email || 'N/A'}</td>
                    <td>
                      {user.team_name ? (
                        <span className="badge bg-secondary">{user.team_name}</span>
                      ) : (
                        <span className="text-muted">No team</span>
                      )}
                    </td>
                    <td>
                      {new Date(user.date_joined || user.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
