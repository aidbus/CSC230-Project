import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage"; 
import ReviewPage from "./pages/ReviewPage";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("userRole")); 
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Header userRole={userRole} setUserRole={setUserRole} /> {/* Ensure Header gets userRole */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
        <Route path="/register" element={<Register />} />

        {/* Protect Upload Page (Only for "student" role) */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/upload" element={<UploadPage />} />
        </Route>

        {/* Protect Review Page (Only for "faculty" role) */}
        <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
          <Route path="/review" element={<ReviewPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

