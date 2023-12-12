// PrivateRoutes.jsx
import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import NoPermission from "../error/NoPermission";

export function PrivateRoutes({ roles, children }) {
  const contextValue = useContext(UserContext);
  const { user, setUser } = contextValue;
  console.log(user, "user");
  if (!contextValue) {
    // UserContext is undefined, handle accordingly (e.g., redirect to login)
    return <Navigate to="/login" />;
  }

  console.log("User Role:", user ? user.role : "Not logged in");

  console.log("Required Roles:", roles);

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
