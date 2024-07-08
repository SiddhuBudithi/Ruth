import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h1 className="logo-text">Shop<span>O</span></h1>
          <p>
            The home and elements needed to create beautiful products.
          </p>
          <div className="socials">
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faTwitter} />
            <FontAwesomeIcon icon={faInstagram} />
            {/* Assume you import faYoutube as shown above */}
            <FontAwesomeIcon icon={faYoutube} />
          </div>
        </div>
        <div className="footer-section">
          <h2>Company</h2>
          <ul>
            <li><Link to="/about-us">About us</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Store Locations</Link></li>
            <li><Link to="/blog">Our Blog</Link></li>
            <li><Link to="#">Reviews</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Shop</h2>
          <ul>
            <li><Link to="#">Game & Video</Link></li>
            <li><Link to="#">Phone & Tablets</Link></li>
            <li><Link to="#">Computers & Laptop</Link></li>
            <li><Link to="#">Sport Watches</Link></li>
            <li><Link to="#">Events</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Support</h2>
          <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="#">Shipping</Link></li>
            <li><Link to="#">Live chat</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        {/* Payment icons can be added here */}
        &copy; shopo.com | Designed by YourName
      </div>
    </footer>
  );
};

export default Footer;
