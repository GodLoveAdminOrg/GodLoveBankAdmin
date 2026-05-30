import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Gate for authenticated admin routes.
// Login stores the access token in localStorage as "token".
// If it's missing, bounce the user to /login.
export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
