import React from 'react';
import { Link } from 'react-router-dom';
import BoardMockup from '../components/BoardMockup';

export default function BoardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-6xl mb-8 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-sm" />
          </div>
          Lattice
        </Link>
        <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
          Sign Out
        </Link>
      </div>
      
      <div className="w-full max-w-6xl">
        <BoardMockup />
      </div>
    </div>
  );
}
