import React from 'react';

export default function AuthLayout({ children }) {
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

      {/* Right Panel - Form / Content */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 md:px-24 bg-[#0a0a0f]">
        <div className="w-full max-w-md mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
