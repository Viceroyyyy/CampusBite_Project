import React from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets';

const NavBar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo1} alt="Logo" className="logo" />
      <ul className="navbar-menu">
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile App</li>
        <li>Contact Us</li>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search-icon"/>
        <img src={assets.dark_mode} alt="dark-mode" id="dark-mode" fill="#49557e"/>
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="basket-icon" />
          <div className="dot"></div>
        </div>
        <button>Sign In</button>
      </div>
    </div>
  )
}
export default NavBar