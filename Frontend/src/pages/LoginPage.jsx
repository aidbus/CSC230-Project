import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Make sure email and password are not empty
      if (!email || !password) {
        setError('Email and password are required');
        return;
      }
      
      // Add proper validation for email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Make the request to the correct backend URL
      const response = await axios.post(
        'http://localhost:4000/auth/login', // Correct backend endpoint
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle successful login
      const { token, user } = response.data;
      
      // Store token in localStorage or a secure cookie
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirect to dashboard or home page
      navigate('/dashboard');
      
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different error scenarios
      if (err.response) {
        // The server responded with an error status
        if (err.response.status === 400) {
          setError('Invalid credentials. Please check your email and password.');
        } else if (err.response.status === 429) {
          setError('Too many login attempts. Please try again later.');
        } else {
          setError(err.response.data.message || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something else caused the error
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
