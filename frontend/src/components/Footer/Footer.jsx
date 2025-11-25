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
                <p>
                    <strong>CREDITS : </strong> 
                    <span class="hover-name">
                        <a href="https://mohamedazizomri.netlify.app" target="_blank" rel="noopener noreferrer">Mohamed Aziz Omri</a>
                    </span>
                </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <a href="https://www.linkedin.com/in/med-aziz-omri" target="_blank" rel="noopener noreferrer">
                        <img src={assets.linkedin_icon} alt="LinkedIn" />
                    </a>
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
                    <li>+216 55 555 555</li>
                    <li>contact@tastytounsi.tn</li>
                </ul>
            </div>
        </div>
        <p className="footer-copyright">
            Developed By <a class="hover-name" href="https://mohamedazizomri.netlify.app" target="_blank" rel="noopener noreferrer">Mohamed Aziz Omri</a> | Copyright 2025 © Tasty Tounsi - All Rights Reserved.
        </p>
    </div>
  )
}

export default Footer
