import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Import styles

function Header() {
  return (
    <header>
      {/* Small top banner */}
      <div className="top-banner">
        <h2>The University of Tampa</h2>
      </div>

      {/* Large middle banner */}
      <div className="main-banner">
        <h1>Criminology Institute for Research and Training</h1>
      </div>

      {/* Navigation banner */}
      <nav className="nav-banner">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
