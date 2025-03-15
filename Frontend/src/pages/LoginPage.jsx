import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Ensure toast styling is applied
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    // State for both login and signup
    const [isSignUp, setIsSignUp] = useState(false); // Switch between login and signup form
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
        role: "student", // Default role for signup
    });

    const { email, password, role } = inputValue;

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setInputValue({
            ...inputValue,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const endpoint = isSignUp ? "http://localhost:4000/register" : "http://localhost:4000/login";
        try {
            const response = await axios.post(
                endpoint,
                { email, password, ...(isSignUp ? { role } : {}) },
                { withCredentials: true }
            );

            const { data } = response;
            const { success, message, role: userRole } = data;

            if (success) {
                if (isSignUp) {
                    toast.success(message, { position: "bottom-left" });
                    setTimeout(() => navigate("/login"), 1000); // Redirect to login after sign-up
                } else {
                    localStorage.setItem("userRole", userRole);
                    toast.success(message, { position: "bottom-left" });
                    setTimeout(() => navigate("/"), 1000); // Redirect to home after login
                }
            } else {
                toast.error(message, { position: "bottom-left" });
            }
        } catch (error) {
            console.error(error);
            toast.error(`${isSignUp ? "Sign-up" : "Login"} failed, please try again`, { position: "bottom-left" });
        }

        setInputValue({
            email: "",
            password: "",
            role: "student",
        });
    };

    return (
        <div className="auth-container">
            <h2>{isSignUp ? "Sign Up" : "Login"}</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleOnChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                {/* Role Dropdown for Sign Up */}
                {isSignUp && (
                    <div>
                        <label htmlFor="role">Role</label>
                        <select
                            name="role"
                            value={role}
                            onChange={handleOnChange}
                            required
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                )}

                <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
                <span>
                    {isSignUp ? (
                        <>Already have an account? <Link to="#" onClick={() => setIsSignUp(false)}>Login</Link></>
                    ) : (
                        <>New? Create an account <Link to="#" onClick={() => setIsSignUp(true)}>Register</Link></>
                    )}
                </span>
            </form>
            <ToastContainer />
        </div>
    );
};

export default LoginPage;
