import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsLoading(true);
    setError('');
    try {
      const data = await login(email, password);
      const userRole = data.role === 'admin' ? 'director' : (data.role || 'developer');
      navigate(`/${userRole}/dashboard`);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-blue-500/30">
      
      {/* Left Panel - Visuals & Quote */}
      <div className="hidden lg:flex flex-1 relative bg-[#06060a] border-r border-white/5 flex-col justify-between p-12 overflow-hidden">
        {/* Deep blue gradient glow */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          Lattice
        </div>

        <div className="relative z-10 max-w-lg mb-8">
          <div className="text-blue-500 mb-6">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 11L8 15H5L7 11V7H10V11ZM19 11L17 15H14L16 11V7H19V11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-3xl font-medium leading-relaxed mb-8">
            "This platform cut our sprint planning time in half — it's the only tool our entire org actually uses."
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold">
              SK
            </div>
            <div>
              <div className="font-medium">Sarah K.</div>
              <div className="text-gray-500 text-sm">VP Engineering at Vercel</div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="relative z-10 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Right Panel - Forms */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 lg:px-32 relative bg-[#0a0a0f]">
        
        <div className="w-full max-w-md mx-auto">
          <div className="bg-[#111116] border border-white/5 rounded-2xl p-8 sm:p-10 shadow-2xl">
            <div className="mb-8">
              <p className="text-gray-400 text-sm mb-2">Welcome back</p>
              <h1 className="text-2xl font-bold tracking-tight">Sign in to your workspace</h1>
            </div>

            <form onSubmit={handleContinue} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com" 
                  className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Password</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors font-mono"
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="flex justify-end pt-1">
                  <a href="#" className="text-xs text-gray-500 hover:text-gray-300">Forgot password?</a>
                </div>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg text-sm transition-colors mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continue'}
              </button>
            </form>


            
            <div className="mt-8 text-center text-sm text-gray-500">
              Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-400 font-medium ml-1">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
