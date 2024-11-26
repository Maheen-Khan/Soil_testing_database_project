import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  console.log(sessionStorage.getItem("loggedIn"));


  return (
    <div className='navbar'>
      <ul className='navbar-menu'>
        <li><Link to="/" className='nav-link'>Home</Link></li>
        <li><Link to="/request-sample" className='nav-link'>Request New Sample</Link></li>
        <li><Link to="/my-samples" className='nav-link'>My Soil Samples</Link></li>
        <li><Link to="/account" className='nav-link'>Account</Link></li>
      </ul>
      <div className="navbar-right">
        <div>
          {sessionStorage.getItem("name") ? ("Hello " + sessionStorage.getItem("name").slice(1,-1)) : ("")} 
          
        </div>
        <Link to="/account" className="user-link">
          <div className="user-icon">👤</div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
