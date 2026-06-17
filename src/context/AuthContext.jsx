import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await api.post('/auth/login', { email, password });
    
    localStorage.setItem('token', data.token);
    const userData = { _id: data._id, name: data.name, email: data.email, role: data.role, workspaceName: data.workspaceName };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return data;
  };

  const verifyOtp = async (email, otp) => {
    const data = await api.post('/auth/verify-otp', { email, otp });
    
    localStorage.setItem('token', data.token);
    const userData = { _id: data._id, name: data.name, email: data.email, role: data.role, workspaceName: data.workspaceName };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setUnverifiedEmail('');
    
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.post('/auth/register', { name, email, password });
    setUnverifiedEmail(email); // Store email for OTP verification
    return data;
  };

  const onboard = async (role, workspaceName) => {
    const data = await api.put('/auth/onboarding', { role, workspaceName });
    
    localStorage.setItem('token', data.token);
    const userData = { _id: data._id, name: data.name, email: data.email, role: data.role, workspaceName: data.workspaceName };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const completeGithubLogin = async (token) => {
    localStorage.setItem('token', token);
    const data = await api.get('/auth/me');
    const userData = { _id: data._id, name: data.name, email: data.email, role: data.role, workspaceName: data.workspaceName };
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const value = {
    user,
    unverifiedEmail,
    login,
    verifyOtp,
    register,
    onboard,
    logout,
    completeGithubLogin,
    loading
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
