// src/components/PrivateRoute.tsx
import React, { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  // בדיקה פשוטה אם יש טוקן ב-localStorage
  const token = localStorage.getItem('token');
  return token !== null;
};

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
