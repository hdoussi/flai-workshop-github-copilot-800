import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import components
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <div className="container mt-4">
      {/* Hero Section */}
      <div className="jumbotron p-5 rounded mb-4">
        <h1 className="display-4">🏃 Welcome to OctoFit Tracker!</h1>
        <p className="lead">
          Track your fitness activities, compete with teams, and achieve your fitness goals together.
        </p>
        <hr className="my-4" style={{borderColor: 'rgba(255,255,255,0.3)'}} />
        <p>
          Join a community of fitness enthusiasts, log your workouts, climb the leaderboard, 
          and get personalized workout recommendations.
        </p>
        <Link to="/activities" className="btn btn-primary btn-lg me-2">
          Get Started
        </Link>
        <Link to="/workouts" className="btn btn-outline-light btn-lg">
          View Workouts
        </Link>
      </div>

      {/* Feature Cards */}
      <div className="row mb-4">
        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📊</div>
              <h5 className="card-title">Track Activities</h5>
              <p className="card-text">
                Log your daily workouts and monitor your progress with detailed activity tracking.
              </p>
              <Link to="/activities" className="btn btn-primary">
                View Activities
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏆</div>
              <h5 className="card-title">Compete</h5>
              <p className="card-text">
                Join teams, compete with friends, and climb the leaderboard to become champion.
              </p>
              <Link to="/leaderboard" className="btn btn-primary">
                View Leaderboard
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-3">
          <div className="card text-center">
            <div className="card-body">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>💪</div>
              <h5 className="card-title">Get Recommendations</h5>
              <p className="card-text">
                Receive personalized workout suggestions tailored to your fitness level and goals.
              </p>
              <Link to="/workouts" className="btn btn-primary">
                Browse Workouts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Quick Links</h5>
              <div className="row text-center">
                <div className="col-md-3 col-6 mb-2">
                  <Link to="/teams" className="btn btn-outline-primary w-100">
                    👥 Teams
                  </Link>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <Link to="/users" className="btn btn-outline-primary w-100">
                    👤 Users
                  </Link>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <Link to="/leaderboard" className="btn btn-outline-primary w-100">
                    🏆 Rankings
                  </Link>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <Link to="/activities" className="btn btn-outline-primary w-100">
                    📈 Activity Log
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/logo.png" alt="OctoFit Logo" className="navbar-logo" />
              OctoFit Tracker
            </Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">🏠 Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">📊 Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">🏆 Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">👥 Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">👤 Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">💪 Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <div className="min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <div className="container">
            <p className="mb-0">© 2026 OctoFit Tracker - Your Fitness Companion</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
