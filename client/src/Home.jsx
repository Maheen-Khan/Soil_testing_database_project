import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="button-container">
        <Link to="/request-sample" className="home-button">
          Request New Soil Test
        </Link>
        <Link to="/my-samples" className="home-button">
          My Soils
        </Link>
      </div>
      <footer className="footer">
        Brooklyn College Environmental Science Analytical Center
      </footer>
    </div>
  );
};

export default Home;
