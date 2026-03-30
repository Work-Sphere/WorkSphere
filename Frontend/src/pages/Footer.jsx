import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="logo-text">Work<span>Sphere</span></h2>
          <p>
            WorkSphere is a platform connecting skilled freelancers with clients who need professional services. 
            From tech development to home maintenance, we provide a seamless way to get work done right.
          </p>
          <div className="contact">
            <span><i className="fas fa-phone"></i> &nbsp; +91 1234567890</span>
            <span><i className="fas fa-envelope"></i> &nbsp; support@worksphere.com</span>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section services-list">
          <h3>Our Services</h3>
          <ul>
            <li>Web Development</li>
            <li>Graphic Design</li>
            <li>AC Maintenance</li>
            <li>Electrical Works</li>
            <li>Plumbing Services</li>
          </ul>
        </div>

        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for latest updates.</p>
          <form>
            <input type="email" placeholder="Your email..." className="text-input contact-input" />
            <button type="submit" className="btn btn-big contact-btn">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} WorkSphere | Designed by Team CDAC
      </div>
    </footer>
  );
}

export default Footer;