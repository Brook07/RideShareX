import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// Configure axios defaults
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const getWalletOverrides = () => {
    try {
      return JSON.parse(localStorage.getItem('demoWalletOverrides')) || {};
    } catch (err) {
      console.error('Failed to parse demo wallet overrides', err);
      return {};
    }
  };

  const setWalletOverride = (userId, balance) => {
    const overrides = getWalletOverrides();
    overrides[userId] = balance;
    localStorage.setItem('demoWalletOverrides', JSON.stringify(overrides));
  };

  // Set axios authorization header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      const savedToken = localStorage.getItem('token');
      
      console.log("🔍 Loading user, token exists:", !!savedToken);
      
      if (savedToken) {
        try {
          axios.defaults.headers.common['Authorization'] = `Bearer ${savedToken}`;
          console.log("📡 Calling /api/auth/me...");
          const response = await axios.get('/api/auth/me');
          console.log("✅ User loaded successfully:", response.data.user);
          const overrides = getWalletOverrides();
          const overrideBalance = overrides[response.data.user._id];
          const userData = overrideBalance !== undefined
            ? { ...response.data.user, walletBalance: overrideBalance }
            : response.data.user;
          setUser(userData);
          setToken(savedToken);
        } catch (error) {
          console.error('❌ Failed to load user:', error.response?.status, error.response?.data);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = (userData, authToken) => {
    const overrides = getWalletOverrides();
    const overrideBalance = overrides[userData._id];
    const finalUser = overrideBalance !== undefined
      ? { ...userData, walletBalance: overrideBalance }
      : userData;
    setUser(finalUser);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const nextUser = { ...prev, ...updatedData };
      if (updatedData.walletBalance !== undefined && nextUser?._id) {
        setWalletOverride(nextUser._id, updatedData.walletBalance);
      }
      return nextUser;
    });
  };

  const value = {
    user,
    token,
    login,
    logout,
    updateUser,
    setWalletOverride,
    getWalletOverrides,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}