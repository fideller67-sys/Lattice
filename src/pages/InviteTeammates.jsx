import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';

export default function InviteTeammates() {
  const navigate = useNavigate();
  const [invitations, setInvitations] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/connect-github');
  };

  return (
    <AuthLayout>
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Invite teammates</h1>
        <p className="text-gray-400 text-sm">Get your team on Lattice to start working.</p>
      </div>

      <form onSubmit={handleContinue} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase">INVITATIONS</label>
            <button type="button" className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">
              COPY INVITE LINK
            </button>
          </div>
          <textarea 
            value={invitations}
            onChange={(e) => setInvitations(e.target.value)}
            placeholder="sarah@company.com, mike@company.com, priya@company.com..."
            className="w-full h-32 bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button 
            type="button" 
            onClick={() => navigate('/connect-github')}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>
          <button 
            type="submit" 
            className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Send Invitations
          </button>
        </div>
      </form>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-16">
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      </div>
    </AuthLayout>
  );
}
