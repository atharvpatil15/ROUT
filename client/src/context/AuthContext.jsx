import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        try {
            const res = await api.get('/users/me'); 
            console.log("Session Verified:", res.data.data.user);
            setUser(res.data.data.user);
        } catch (error) {
            console.log("Session Check Failed:", error.response?.data?.message || error.message);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/users/login', { email, password });
    setUser(res.data.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/users/register', { name, email, password });
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
        await api.get('/users/logout');
    } catch (err) {
        console.error("Logout failed", err);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);