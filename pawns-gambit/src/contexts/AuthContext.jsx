import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const initAuth = async () => {
      if (authService.isAuthenticated()) {
        const storedUser = authService.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
          setIsAuthenticated(true);
          
          // Optionally verify token is still valid
          try {
            const currentUser = await authService.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // Token is invalid, logout
            handleLogout();
          }
        }
      }
      setLoading(false);
    };

    initAuth();

    // Listen for auth errors
    const handleAuthError = () => {
      handleLogout();
    };

    // Listen for logout events
    const handleLogoutEvent = () => {
      setUser(null);
      setIsAuthenticated(false);
    };

    window.addEventListener('auth-error', handleAuthError);
    window.addEventListener('auth-logout', handleLogoutEvent);

    return () => {
      window.removeEventListener('auth-error', handleAuthError);
      window.removeEventListener('auth-logout', handleLogoutEvent);
    };
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const { user: loggedInUser } = await authService.login(credentials);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      return { success: true, user: loggedInUser };
    } catch (error) {
      const message = error.response?.data?.error?.message || 'Login failed';
      return { success: false, error: message };
    }
  };

  const handleRegister = async (userData) => {
    try {
      const { user: newUser } = await authService.register(userData);
      setUser(newUser);
      setIsAuthenticated(true);
      return { success: true, user: newUser };
    } catch (error) {
      const message = error.response?.data?.error?.message || 'Registration failed';
      return { success: false, error: message };
    }
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await authService.getCurrentUser();
      setUser(updatedUser);
      return { success: true, user: updatedUser };
    } catch (error) {
      return { success: false, error: 'Failed to update user' };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    updateUser: handleUpdateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

