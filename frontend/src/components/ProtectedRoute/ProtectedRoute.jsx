import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, requiredRole }) => {
  const token = sessionStorage.getItem('token'); 

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken?.role;
    const expiryTime = decodedToken?.exp * 1000;

    if (Date.now() > expiryTime) {
      sessionStorage.removeItem('token');
      return <Navigate to="/login" />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/login" />;
    }
  } catch (error) {
    sessionStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
