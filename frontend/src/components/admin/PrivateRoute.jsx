// PrivateRoutes.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import NoPermission from "../error/NoPermission";

export function PrivateRoutes({ roles, children }) {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    return <Navigate to="/login" />;
  }

  const hasRequiredRole = () => {
    if (!user) {
      // User not logged in, redirect to the login page
      return false;
    }

    // Check if the user's role matches any of the required roles
    return roles.includes(user.role);
  };

  return hasRequiredRole() ? <Outlet /> : <NoPermission />;
}
