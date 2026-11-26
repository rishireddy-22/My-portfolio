import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  isAuthenticated as checkAuth,
  login as apiLogin,
  logout as apiLogout
} from '../services/adminApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(checkAuth());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAuthenticated(checkAuth());
  }, []);

  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const res = await apiLogin(username, password);
      setAuthenticated(true);
      return res;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    apiLogout();
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        loading,
        login: handleLogin,
        logout: handleLogout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
