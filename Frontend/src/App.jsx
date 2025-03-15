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
      setUserRole(localStorage.getItem("userRole")); // Update state when userRole changes
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Header userRole={userRole} setUserRole={setUserRole} /> {/* ✅ Make sure setUserRole is passed */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage setUserRole={setUserRole} />} />
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/upload" element={<UploadPage />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
          <Route path="/review" element={<ReviewPage />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
