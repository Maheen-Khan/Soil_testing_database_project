import React from 'react';
import './Home.css';
import { Link,useNavigate } from 'react-router-dom';
import { useAuthContext } from './AuthContext';
import { useEffect } from 'react';
const Home = () => {
  const nav = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.role === 'admin') {
      nav("/request-dashboard");
    }
  }, [user, nav]); 

  return (
    <div className="home">
      <div className="home-button-container">
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
