// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// function Navbar() {
//   return (
//     <nav className="home-navbar">
//       {/* LOGO */}
//       <div className="logo">WorkSphere</div>

//       {/* SEARCH BAR */}
//       <div className="search-box">
//         <input
//           type="text"
//           placeholder="Search services (Developer, Plumber, Electrician...)"
//         />
//       </div>

//       {/* NAV LINKS */}
//       <div className="nav-links">
//         <Link to="/login" className="nav-login">Login</Link>
//         <Link to="/register" className="nav-signup">Sign Up</Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="home-navbar">
      {/* LOGO */}
      <div className="logo">WorkSphere</div>

      {/* NAVIGATION LINKS */}
      <div className="nav-menu">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>
        <Link to="/services" className="nav-link">Services</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
      </div>

      {/* SEARCH BAR */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search services (Developer, Plumber, Electrician...)"
        />
      </div>

      {/* NAV LINKS */}
      <div className="nav-links">
        <Link to="/login" className="nav-login">Login</Link>
        <Link to="/register" className="nav-signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;