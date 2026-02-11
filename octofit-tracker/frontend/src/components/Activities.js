import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities API Endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Activities - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const activitiesData = data.results || data;
        setActivities(Array.isArray(activitiesData) ? activitiesData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Activities - Error fetching data:', error);
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
          <h4 className="alert-heading">Error Loading Activities</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2><i className="bi bi-activity"></i> Activities</h2>
        <p className="mb-0">Track and view all fitness activities</p>
      </div>

      {activities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📊</div>
          <h3>No activities found</h3>
          <p>Start logging your fitness activities to see them here.</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <span className="badge bg-primary">Total Activities: {activities.length}</span>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th>Activity Type</th>
                  <th>User</th>
                  <th>Duration (min)</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td>
                      <strong>{activity.name || activity.activity_type}</strong>
                    </td>
                    <td>{activity.user_name || activity.user || 'N/A'}</td>
                    <td>
                      <span className="badge bg-info">{activity.duration}</span>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">{activity.calories_burned}</span>
                    </td>
                    <td>{new Date(activity.date).toLocaleDateString()}</td>
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

export default Activities;
