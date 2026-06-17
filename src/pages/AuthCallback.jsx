import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const { completeGithubLogin } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    const handleCallback = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get('token');
      const needsOnboarding = searchParams.get('needsOnboarding');
      const role = searchParams.get('role');

      if (!token) {
        setError('Authentication failed. No token received.');
        setTimeout(() => navigate('/signin'), 3000);
        return;
      }

      try {
        await completeGithubLogin(token);
        
        if (needsOnboarding === 'true') {
          navigate('/setup-workspace');
        } else {
          const routeRole = role === 'admin' ? 'director' : (role || 'developer');
          navigate(`/${routeRole}/dashboard`);
        }
      } catch (err) {
        setError('Failed to fetch user profile.');
        setTimeout(() => navigate('/signin'), 3000);
      }
    };

    handleCallback();
  }, [location.search, completeGithubLogin, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
      {error ? (
        <div className="text-center text-red-400">
          <p className="mb-2">{error}</p>
          <p className="text-sm">Redirecting to login...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-cyan-400">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <h2 className="text-xl font-medium text-white">Completing authentication...</h2>
        </div>
      )}
    </div>
  );
}
