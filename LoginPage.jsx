import React, { useState } from "react";
import "./LoginPage.css"; // Import styles

function LoginPage() {
  const [userType, setUserType] = useState("student"); // Default to student login

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

      {/* Student Login Form */}
      {userType === "student" && (
        <div className="login-form">
          <h3>Student Login</h3>
          <input type="text" placeholder="Student ID" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </div>
      )}

      {/* Faculty Login Form */}
      {userType === "faculty" && (
        <div className="login-form">
          <h3>Faculty Login</h3>
          <input type="text" placeholder="Faculty ID" />
          <input type="password" placeholder="Password" />
          <button>Login</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
