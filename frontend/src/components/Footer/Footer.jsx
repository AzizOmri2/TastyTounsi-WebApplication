import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <Link to='/' onClick={()=>setMenu("home")}>
                    <img src={assets.logo} alt="" />
                </Link>
                
                <p>Tasty Tounsi is a modern food delivery platform inspired by Tunisian flavors.<br/>
                    It connects users with local restaurants, offers fast delivery, and provides a smooth ordering experience with an intuitive and visually modern interface.
                </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>Tasty Tounsi</h2>
                <ul>
                    <Link to='/' onClick={()=>setMenu("home")}><li>Home</li></Link>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+216 25 742 236</li>
                    <li>contact@tastytounsi.tn</li>
                </ul>
            </div>
        </div>
        <p className="footer-copyright">
            Copyright 2025 © Tasty Tounsi - All Rights Reserved.
        </p>
    </div>
  )
}

export default Footer
