import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css"; // Import styles
import logo from "../assets/256.avif"; // Keep the logo from your partner's version

function Header({ userRole, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole"); // Remove user role from storage
    setUserRole(null); // Update state to re-render header
    navigate("/"); // Redirect to homepage
  };

  return (
    <header>
      {/* Small top banner with Logo & University Name */}
      <div className="top-banner">
        <img src={logo} alt="University Logo" />
        <h2>The University of Tampa</h2>
      </div>

      {/* Large middle banner (CIRT + Subtitle) */}
      <div className="main-banner">
        <h1 className="cirt-title">
          CIRT <br />
          <span className="cirt-subtitle">
            Criminology Institute for Research and Training
          </span>
        </h1>
      </div>

      {/* Navigation banner */}
      <nav className="nav-banner">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {!userRole && <li><Link to="/login">Login</Link></li>}
          
          {/* Only show Upload if logged in as a Student */}
          {userRole === "student" && <li><Link to="/upload">Upload Paper</Link></li>}

          {/* Only show Review if logged in as Faculty */}
          {userRole === "faculty" && <li><Link to="/review">Review Submissions</Link></li>}
          
          {/* Show Logout button if user is logged in */}
          {userRole && (
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
