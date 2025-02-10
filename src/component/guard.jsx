import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthChecker from "../utils/service/AuthChecker";

export const RestrictedRoute = ({ element: Component }) => {
  const location = useLocation();

  return AuthChecker.isAuthenticated() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const AdminRoute = ({ element: Component }) => {
  const location = useLocation();

  return AuthChecker.isAdmin() ? (
    Component
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export const GuestRoute = ({ element }) => {
  return AuthChecker.isAuthenticated() ? (
    <Navigate to="/home" replace />
  ) : (
    element
  );
};
