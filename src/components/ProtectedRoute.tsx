// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  return isLoggedIn ? <>{children}</> : <Navigate to="/admin" replace />;
};

export default ProtectedRoute;
