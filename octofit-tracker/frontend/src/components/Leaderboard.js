import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard API Endpoint:', apiUrl);
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Leaderboard - Fetched data:', data);
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = data.results || data;
        setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Leaderboard - Error fetching data:', error);
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
          <h4 className="alert-heading">Error Loading Leaderboard</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  const getRankBadge = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return index + 1;
  };

  return (
    <div className="container mt-4">
      <div className="page-header">
        <h2><i className="bi bi-trophy"></i> Leaderboard</h2>
        <p className="mb-0">Top performers and their achievements</p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🏆</div>
          <h3>No leaderboard data available</h3>
          <p>Complete activities to climb the ranks!</p>
        </div>
      ) : (
        <>
          <div className="mb-3">
            <span className="badge bg-primary">Total Competitors: {leaderboard.length}</span>
          </div>
          
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th style={{width: '80px'}}>Rank</th>
                  <th>User</th>
                  <th>Team</th>
                  <th>Total Points</th>
                  <th>Activities</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id || index} className={index < 3 ? 'table-active' : ''}>
                    <td>
                      <h4 className="mb-0">{getRankBadge(index)}</h4>
                    </td>
                    <td>
                      <strong>{entry.user_name || entry.user || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-secondary">
                        {entry.team_name || entry.team || 'No Team'}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success">
                        {entry.total_points || entry.points || 0} pts
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {entry.activity_count || entry.activities || 0}
                      </span>
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

export default Leaderboard;
