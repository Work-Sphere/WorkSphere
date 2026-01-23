import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Import the CSS module

function Navbar() {
  return (
    <header className={`p-3 bg-dark text-white fixed-top ${styles.navbarContainer}`}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          
          <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
            <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap">
              <use xlinkHref="#bootstrap"></use>
            </svg>
          </Link>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li><a href="./Home" className={`nav-link px-2 text-secondary ${styles.navLink}`}>Home</a></li>
            <li><a href="#" className={`nav-link px-2 text-white ${styles.navLink}`}>Features</a></li>
            <li><a href="#" className={`nav-link px-2 text-white ${styles.navLink}`}>Pricing</a></li>
            <li><a href="#" className={`nav-link px-2 text-white ${styles.navLink}`}>FAQs</a></li>
            <li><a href="#" className={`nav-link px-2 text-white ${styles.navLink}`}>About</a></li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input 
              type="search" 
              className={`form-control ${styles.searchBar}`} 
              placeholder="Search..." 
              aria-label="Search"
            />
          </form>

          <div className="text-end">
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
            <button type="button" className="btn btn-warning">Sign-up</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;