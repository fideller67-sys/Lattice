import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    setIsLoading(true);
    setError('');
    try {
      await register(name, email, password);
      navigate('/verify-email');
    } catch (err) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0f] text-white font-sans selection:bg-blue-500/30">
      {/* Left Panel - Visuals */}
      <div className="hidden lg:flex flex-1 relative bg-[#111116] border-r border-white/5 items-center justify-center overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Geometric Grid Pattern */}
        <div className="relative z-10 grid grid-cols-3 gap-6 opacity-80">
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-6 h-6 rounded-full bg-blue-400 blur-[2px]" />
          </div>
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm transform translate-y-6">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4l-8 16h16z" /></svg>
          </div>
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4h16v16H4z" /></svg>
          </div>
          
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" /></svg>
          </div>
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm transform translate-y-6">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" strokeWidth="1.5" /></svg>
          </div>
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm relative">
            <div className="w-8 h-8 border-2 border-blue-500 rounded-sm" />
            <div className="absolute top-8 right-6 w-4 h-4 bg-blue-400" />
          </div>

          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-6 h-6 transform rotate-45 border-2 border-blue-500" />
          </div>
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm transform translate-y-6">
            <div className="w-6 h-6 rounded-full bg-blue-400 blur-[2px]" />
          </div>
          <div className="w-20 h-24 border border-white/10 rounded-xl flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-6 h-6 border-2 border-blue-600 rounded-md" />
          </div>
        </div>

        {/* Logo Bottom Left */}
        <div className="absolute bottom-8 left-8 flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <div className="w-2.5 h-2.5 bg-black rounded-sm" />
          </div>
          Lattice
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 bg-[#0a0a0f]">
        <div className="w-full max-w-md mx-auto">
          
          <div className="mb-10">
            <div className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-3">CREATE YOUR ACCOUNT</div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">Get started for free</h1>
            <p className="text-gray-400 text-sm">Join thousands of teams already using Lattice.</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4 mb-6">
            <div>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
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

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-400 hover:bg-blue-300 text-black font-semibold py-3 rounded-lg text-sm transition-colors mt-2 shadow-blue-500/20 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : 'Create Account'}
            </button>
          </form>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-xs text-gray-500 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button type="button" disabled className="flex items-center justify-center gap-2 bg-[#16161c] border border-white/5 hover:bg-white/5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors opacity-50 cursor-not-allowed">
              Continue with Google
            </button>
            <a href="http://localhost:5000/api/auth/github" className="flex items-center justify-center gap-2 bg-[#16161c] border border-white/5 hover:bg-white/5 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
              Continue with GitHub
            </a>
          </div>

          <div className="text-center text-sm text-gray-400">
            Already have an account? <Link to="/signin" className="text-blue-400 hover:text-blue-300 font-medium ml-1">Log in</Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
