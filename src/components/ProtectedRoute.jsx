import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0a0a0f] items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  
  let isAuthorized = false;
  
  if (allowedRoles.includes(user.role)) {
    isAuthorized = true;
  } else if (user.role === 'admin' || user.role === 'director') {
    isAuthorized = true; // Admins and directors can access all roles
  } else if (user.role === 'pm' && allowedRoles.includes('developer')) {
    isAuthorized = true; // PM can access developer
  }

  if (!isAuthorized) {
    const defaultRoute = user.role === 'director' || user.role === 'admin' 
      ? '/director/dashboard' 
      : user.role === 'pm' 
        ? '/pm/dashboard' 
        : '/developer/dashboard';
        
    return <Navigate to={defaultRoute} replace />;
  }

  return <Outlet />;
}
