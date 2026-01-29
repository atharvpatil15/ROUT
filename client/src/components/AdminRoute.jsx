import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-rout-paper">
            <div className="w-8 h-8 border-2 border-rout-matcha/20 border-t-rout-matcha rounded-full animate-spin"></div>
        </div>
    );
  }

  // Check if user is logged in AND is an admin
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
