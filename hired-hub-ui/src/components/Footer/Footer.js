import React from 'react';
import "./Footer.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Condition</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/services">Our Services</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Condition</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>
              <i className="location-icon">📍</i>
              Km10, Nguyễn Trãi, Hà Đông, Hà Nội
            </li>
            <li>
              <i className="phone-icon">📞</i>
              +012 345 67890
            </li>
            <li>
              <i className="email-icon">✉️</i>
              info@example.com
            </li>
          </ul>
          <div className="social-links">
            <a href="#" className="social-link">𝕏</a>
            <a href="#" className="social-link">f</a>
            <a href="#" className="social-link">▶</a>
            <a href="#" className="social-link">in</a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email" 
              className="newsletter-input"
            />
            <button className="signup-button">SignUp</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {year} <a href="/">Your Site Name</a>. All Right Reserved. 
          Designed By <a href="#">HTML Codex</a>
        </p>
        <div className="footer-bottom-links">
          <a href="/">Home</a>
          <a href="/cookies">Cookies</a>
          <a href="/help">Help</a>
          <a href="/faqs">FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;