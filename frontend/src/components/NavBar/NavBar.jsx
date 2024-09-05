import React, { useState } from 'react'
import './NavBar.css'
import {assets} from '../../assets/assets';

const NavBar = () => {

const [menu,setMenu] = useState('home');


  return (
    <div className='navbar'>
      <img src={assets.logo1} alt="Logo" className="logo" />
      <ul className="navbar-menu">
        <li onClick={()=> setMenu("home")} className={menu==="home"?"active":""}>Home</li>
        <li onClick={()=> setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li> 
        <li onClick={()=> setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>Mobile App</li>
        <li onClick={()=> setMenu("contact-us")} className={menu==="contact-us"?"active":""}>Contact Us</li>
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