import React from 'react'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className='navbar'>
        <ul className='navbar-menu'>
            <li>Home</li>
            <li>Request New Sample</li>
            <li>My Soil Samples</li>
        </ul>
        <div className="navbar-right">
            my account
        </div>
    </div>
  )
}

export default NavBar