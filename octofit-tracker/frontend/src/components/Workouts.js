import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('Workouts API Endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Workouts - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const workoutsData = data.results || data;
        setWorkouts(Array.isArray(workoutsData) ? workoutsData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Workouts - Error fetching data:', error);
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
          <h4 className="alert-heading">Error Loading Workouts</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getDifficultyBadge = (difficulty) => {
    const badges = {
      'easy': 'bg-success',
      'medium': 'bg-warning text-dark',
      'hard': 'bg-danger',
      'beginner': 'bg-success',
      'intermediate': 'bg-warning text-dark',
      'advanced': 'bg-danger'
    };
    return badges[difficulty?.toLowerCase()] || 'bg-secondary';
  };

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2><i className="bi bi-heart-pulse"></i> Recommended Workouts</h2>
        <p className="mb-0">Personalized workout suggestions for your fitness goals</p>
      </div>

      {workouts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">💪</div>
          <h3>No workouts available</h3>
          <p>Check back later for personalized workout recommendations!</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <span className="badge bg-primary">Total Workouts: {workouts.length}</span>
          </div>
          
          <div className="row">
            {workouts.map((workout) => (
              <div key={workout.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{workout.name || workout.title}</h5>
                    
                    <div className="mb-3">
                      {workout.difficulty && (
                        <span className={`badge ${getDifficultyBadge(workout.difficulty)} me-2`}>
                          {workout.difficulty}
                        </span>
                      )}
                      {workout.category && (
                        <span className="badge bg-secondary">
                          {workout.category}
                        </span>
                      )}
                    </div>
                    
                    <p className="card-text">
                      {workout.description || 'No description available'}
                    </p>
                    
                    {workout.duration && (
                      <div className="mt-2">
                        <strong>Duration:</strong>{' '}
                        <span className="badge bg-info">{workout.duration} minutes</span>
                      </div>
                    )}
                  </div>
                  <div className="card-footer bg-transparent">
                    <button className="btn btn-primary btn-sm w-100">
                      Start Workout
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Workouts;
