import React from 'react';
import './RequestDashboard.css';
import { Link } from 'react-router-dom';

const RequestDashboard = () => {
  return (
    <div className="admin-home">
      <div className="admin-home-header">
        <h1>Admin Dashboard</h1>
        <p>Manage Users, Requests, and Tests</p>
      </div>

      <div className="admin-home-button-shell">
        <div className="admin-home-button-container">
          <Link to="/create-user" className="admin-home-button">
            Create new User
          </Link>
          <Link to="/user-list" className="admin-home-button">
            Update/Delete a user
          </Link>
        </div>

        <div className="admin-home-button-container">
          <Link to="/create-request" className="admin-home-button">
            Create new Request
          </Link>
          <Link to="/request-list" className="admin-home-button">
            Update/Delete a request
          </Link>
        </div>

        <div className="admin-home-button-container">
          <Link to="/create-test" className="admin-home-button">
            Create new Test
          </Link>
          <Link to="/test-list" className="admin-home-button">
            Update/Delete a Test
          </Link>
        </div>
      </div>

      <footer className="footer">
        Brooklyn College Environmental Science Analytical Center
      </footer>
    </div>
  );
};

export default RequestDashboard;
