import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../assets/256.avif";

function Header({ userRole, setUserRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setUserRole(null);
    navigate("/");
  };

  return (
    <header>
      {/* Top banner */}
      <div className="top-banner">
        <img src={logo} alt="University Logo" />
        <h2>The University of Tampa</h2>
      </div>

      {/* Middle banner */}
      <div className="main-banner">
        <h1 className="cirt-title">
          CIRT <br />
          <span className="cirt-subtitle">
            Criminology Institute for Research and Training
          </span>
        </h1>
      </div>

      {/* Nav */}
      <nav className="nav-banner">
        <ul>
          <li><Link to="/">Home</Link></li>

          {/* Dropdown About */}
          <li className="dropdown">
            <span>About Us ▼</span>
            <ul className="dropdown-content">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </li>

          {/* Login */}
          {!userRole && <li><Link to="/login">Login</Link></li>}

          {/* Student */}
          {userRole === "student" && <li><Link to="/upload">Upload Paper</Link></li>}

          {/* Faculty */}
          {userRole === "faculty" && <li><Link to="/review">Review Submissions</Link></li>}

          {/* Logout */}
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
