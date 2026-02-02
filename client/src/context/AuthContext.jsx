import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
        // 1. Check for token in URL (Google Login redirect)
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get('token');
        
        if (urlToken) {
            localStorage.setItem('token', urlToken);
            window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
        }

        // 2. Get token from storage
        const token = localStorage.getItem('token');
        if (!token) {
            setLoading(false);
            return;
        }

        // Set default header for all future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        try {
            const res = await api.get('/users/me'); 
            console.log("Session Verified:", res.data.data.user);
            setUser(res.data.data.user);
        } catch (error) {
            console.log("Session Check Failed:", error.response?.data?.message || error.message);
            localStorage.removeItem('token'); // Invalid token
            delete api.defaults.headers.common['Authorization'];
            setUser(null);
        } finally {
            setLoading(false);
        }
    }
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/users/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(res.data.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/users/register', { name, email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(res.data.data.user);
    return res.data;
  };

  const logout = async () => {
    try {
        await api.get('/users/logout');
    } catch (err) {
        console.error("Logout failed", err);
    }
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);