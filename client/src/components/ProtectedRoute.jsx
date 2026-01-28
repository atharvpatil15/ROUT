import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // A minimal loading spinner for the route check
    return (
        <div className="h-screen w-full flex items-center justify-center bg-rout-paper">
            <div className="w-8 h-8 border-2 border-rout-matcha/20 border-t-rout-matcha rounded-full animate-spin"></div>
        </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
