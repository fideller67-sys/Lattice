import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { Code2, LayoutGrid, LineChart, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SetupWorkspace() {
  const navigate = useNavigate();
  const { onboard } = useAuth();
  const [workspaceName, setWorkspaceName] = useState('');
  const [selectedRole, setSelectedRole] = useState('Product Manager');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLaunch = async (e) => {
    e.preventDefault();
    if (!workspaceName) return;

    // Map UI role to backend role
    const roleMap = {
      'Developer': 'developer',
      'Product Manager': 'pm',
      'Director': 'director'
    };
    
    setIsLoading(true);
    setError('');
    
    try {
      await onboard(roleMap[selectedRole], workspaceName);
      navigate('/setup-profile');
    } catch (err) {
      setError(err.message || 'Failed to setup workspace');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-white/10 pb-4">
          <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">ONBOARDING</div>
          <div className="bg-[#16161c] border border-white/5 rounded px-2 py-1 text-[10px] text-gray-400 font-bold">
            Step 2 of 2
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Set up your workspace</h1>
          <p className="text-gray-400 text-sm">Just two quick steps and you're ready to launch.</p>
        </div>

        <form onSubmit={handleLaunch} className="space-y-8">
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3">Workspace name</label>
            <input 
              type="text" 
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              placeholder="e.g. Acme Engineering"
              className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400 transition-colors"
              required
            />
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-[10px] font-bold tracking-widest text-white uppercase mb-1">Select your role</label>
              <p className="text-xs text-gray-500">This helps us personalize your experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('Developer')}
                className={`text-left p-5 rounded-xl border transition-all relative ${
                  selectedRole === 'Developer' 
                  ? 'bg-cyan-500/10 border-cyan-400' 
                  : 'bg-[#16161c] border-white/5 hover:border-white/20'
                }`}
              >
                {selectedRole === 'Developer' && (
                  <div className="absolute top-3 right-3 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
                <Code2 className={`w-6 h-6 mb-3 ${selectedRole === 'Developer' ? 'text-cyan-400' : 'text-gray-400'}`} />
                <div className="text-sm font-bold text-white mb-1">Developer</div>
                <div className="text-[10px] text-gray-500 leading-relaxed">Build and ship features fast</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('Product Manager')}
                className={`text-left p-5 rounded-xl border transition-all relative ${
                  selectedRole === 'Product Manager' 
                  ? 'bg-cyan-500/10 border-cyan-400' 
                  : 'bg-[#16161c] border-white/5 hover:border-white/20'
                }`}
              >
                {selectedRole === 'Product Manager' && (
                  <div className="absolute top-3 right-3 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
                <LayoutGrid className={`w-6 h-6 mb-3 ${selectedRole === 'Product Manager' ? 'text-cyan-400' : 'text-gray-400'}`} />
                <div className="text-sm font-bold text-white mb-1">Product Manager</div>
                <div className="text-[10px] text-gray-500 leading-relaxed">Plan, prioritize, and deliver</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('Director')}
                className={`text-left p-5 rounded-xl border transition-all relative ${
                  selectedRole === 'Director' 
                  ? 'bg-cyan-500/10 border-cyan-400' 
                  : 'bg-[#16161c] border-white/5 hover:border-white/20'
                }`}
              >
                {selectedRole === 'Director' && (
                  <div className="absolute top-3 right-3 w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </div>
                )}
                <LineChart className={`w-6 h-6 mb-3 ${selectedRole === 'Director' ? 'text-cyan-400' : 'text-gray-400'}`} />
                <div className="text-sm font-bold text-white mb-1">Director</div>
                <div className="text-[10px] text-gray-500 leading-relaxed">Oversee teams and strategy</div>
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-cyan-400 hover:bg-cyan-300 text-black font-bold py-3.5 rounded-lg text-sm transition-colors shadow-cyan-500/20 shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-black" /> : <>Launch Workspace <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
