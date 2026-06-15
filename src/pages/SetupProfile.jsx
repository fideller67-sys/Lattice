import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { User } from 'lucide-react';

export default function SetupProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');

  const handleContinue = (e) => {
    e.preventDefault();
    navigate('/invite-teammates');
  };

  return (
    <AuthLayout>
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Set up your profile</h1>
        <p className="text-gray-400 text-sm">Choose how you'll appear in Lattice.</p>
      </div>

      <form onSubmit={handleContinue} className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3">NAME & PICTURE</label>
          <div className="flex items-center gap-4 bg-[#16161c] border border-white/10 rounded-lg p-2">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
              <User className="w-5 h-5" />
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="flex-1 bg-transparent border-none text-sm text-white placeholder-gray-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3">TITLE</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Software Engineer"
            className="w-full bg-[#16161c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
            required
          />
        </div>

        <div className="flex items-center justify-between pt-4">
          <button 
            type="button" 
            onClick={() => navigate('/invite-teammates')}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>
          <button 
            type="submit" 
            className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-2.5 rounded-lg text-sm transition-colors"
          >
            Continue
          </button>
        </div>
      </form>

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 mt-16">
        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
      </div>
    </AuthLayout>
  );
}
