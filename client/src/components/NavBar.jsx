import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';
import './NavBar.css';
import { removeData } from '../SessionHandler';
import { useEffect } from 'react';



const NavBar = () => {
  const {user,dispatch} = useAuthContext()
  const nav = useNavigate()

  const logOut = () => {
    // remove user from storage
    removeData("user")
  
    // dispatch logout action
    dispatch({ type: "LOGOUT" })

    nav("/login")
    
  }



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
          {user ? 
            <button onClick={() => logOut()} className="nav-link">
                Logout
            </button>
            :
            <div></div>
                  
                }

        </div>
        <div>
          {user && user.name ? ("Hello " + user.name) : ("")} 
          
        </div>
        <Link to="/account" className="user-link">
          <div className="user-icon">👤</div>
        </Link>
      </div>
    </div>
  );
};


export default NavBar;
