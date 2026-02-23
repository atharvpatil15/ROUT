"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.replace('/');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-tl-paper">
            <div className="w-8 h-8 border-2 border-tl-matcha/20 border-t-tl-matcha rounded-full animate-spin"></div>
        </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return children;
};

export default AdminRoute;
