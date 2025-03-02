import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("userRole"); // Get stored role

  console.log("Stored Role:", userRole); // Debugging log
  console.log("Allowed Roles:", allowedRoles);

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log("Access denied. Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  console.log("Access granted.");
  return <Outlet />;
};

export default ProtectedRoute;
