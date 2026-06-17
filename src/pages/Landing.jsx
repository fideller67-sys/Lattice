import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCcw, Command, GitMerge, GanttChart, ChevronRight } from 'lucide-react';
import BoardMockup from '../components/BoardMockup';

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-purple-500/30 font-sans">
      
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm" />
            </div>
            Lattice
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-400 font-medium">
            <a href="#" className="hover:text-white transition-colors">Product</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">Solutions</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/signin" className="text-gray-400 hover:text-white transition-colors hidden sm:block">Sign In</Link>
          <Link to="/signup" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors">
            Start Free Trial
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-6 flex flex-col items-center text-center relative">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Now in private beta - Join 2,400+ teams
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mb-6">
          The issue tracker built for
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500"> high-velocity software teams</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Streamline sprints, unblock teams, and ship faster with a platform built for modern engineering workflows.
        </p>

        <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-4 relative z-10" onSubmit={(e) => { e.preventDefault(); window.location.href = '/signup'; }}>
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="flex-1 w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
            required
          />
          <button 
            type="submit" 
            className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            Join Beta
            <ChevronRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-xs text-gray-500 mb-20">
          No credit card required - Free for teams up to 5
        </p>

        <div className="mt-10 w-full max-w-6xl">
          <BoardMockup />
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-widest text-purple-400 mb-4 uppercase">Why Teams Switch</div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mx-auto">
              Everything your engineering team needs, in one fast workspace
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <RefreshCcw className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Real-time Multi-user Sync</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Every edit, comment, and status change appears instantly for your whole team — no refresh, no conflicts.
              </p>
            </div>

            <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Command className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Keyboard-first Command Palette</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Create issues, jump between projects, and trigger workflows without ever touching your mouse.
              </p>
            </div>

            <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GitMerge className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Advanced Git Integrations</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Auto-link branches, PRs, and commits to issues across GitHub, GitLab, and Bitbucket with deep two-way sync.
              </p>
            </div>

            <div className="bg-[#111116] border border-white/5 rounded-2xl p-6 hover:border-purple-500/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GanttChart className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-lg font-semibold mb-3 text-gray-200">Relational Epic Timelines</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Visualize dependencies across epics and roadmaps with timeline views that adapt to your sprint cadence.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 text-center text-gray-500 text-sm">
        <p>&copy; 2026 Lattice. All rights reserved.</p>
      </footer>
    </div>
  );
}
