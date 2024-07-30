// src/auth/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from './authSlice';
import axios from 'axios';

// Create the AuthContext
const AuthContext = createContext();

// Provide the AuthContext to the application
export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check for existing authentication token and fetch user data if available
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserState(response.data);
        dispatch(setUser(response.data));
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials);
    const { user, token } = response.data;
    localStorage.setItem('accessToken', token);
    setUserState(user);
    dispatch(setUser(user));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUserState(null);
    dispatch(clearUser());
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
