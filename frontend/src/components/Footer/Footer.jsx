import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo1} alt="" className='logo' />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad harum eligendi earum id quasi possimus optio voluptas maiores aspernatur qui.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 8232387818</li>
                    <li>contact@gamil.com</li>
                </ul>
            </div>
        </div>
        <hr />
      <p className="footer-copyright">Copyright © 2023,CampusBite.com-All rights reserved.</p>
    </div>
  )
}

export default Footer
