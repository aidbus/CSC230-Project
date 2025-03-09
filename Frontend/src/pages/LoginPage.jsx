import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Import styles
import axios from "axios";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "../firebase/firebase"; // Ensure Firebase is initialized properly

function LoginPage({ setUserRole }) {
  const [userType, setUserType] = useState("student");
  const [credentials, setCredentials] = useState({ id: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!credentials.id || !credentials.password) {
      alert("Please enter both your ID and password.");
      return;
    }

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.id,
        credentials.password
      );
      const user = userCredential.user;

      // Get Firebase Token
      const token = await getIdToken(user);
      localStorage.setItem("token", token);

      // Send token to backend for role verification
      const response = await axios.post("http://localhost:8080/auth/login", {
        token: token,
      });
      
      const role = response.data.role; // Assume backend returns user role
      localStorage.setItem("userRole", role);
      setUserRole(role);

      alert("Login Successful!");
      navigate("/");
    } catch (error) {
      alert("Invalid login");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      
      {/* Selection Buttons */}
      <div className="user-selection">
        <label>
          <input 
            type="radio" 
            name="userType" 
            value="student" 
            checked={userType === "student"} 
            onChange={() => setUserType("student")} 
          />
          Student
        </label>

        <label>
          <input 
            type="radio" 
            name="userType" 
            value="faculty" 
            checked={userType === "faculty"} 
            onChange={() => setUserType("faculty")} 
          />
          Faculty
        </label>
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h3>{userType === "student" ? "Student Login" : "Faculty Login"}</h3>
        <input 
          type="text" 
          placeholder="Email" 
          onChange={e => setCredentials({ ...credentials, id: e.target.value })} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={e => setCredentials({ ...credentials, password: e.target.value })} 
        />
        <button 
          onClick={handleLogin} 
          disabled={!credentials.id || !credentials.password}
          style={{
            opacity: (!credentials.id || !credentials.password) ? 0.5 : 1,
            cursor: (!credentials.id || !credentials.password) ? "not-allowed" : "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
