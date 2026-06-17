import React from 'react';

export default function BoardMockup() {
  return (
    <div className="relative w-full max-w-6xl mx-auto z-10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 via-blue-500/40 to-blue-700/40 blur-[100px] animate-pulse rounded-[40px] z-0 pointer-events-none" style={{ animationDuration: '4s' }} />
      
      <div className="relative z-10 bg-[#16161c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px] text-left">
        
        <div className="flex items-center px-4 py-2.5 border-b border-white/5 bg-[#1a1a22]">
          <div className="flex gap-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="bg-white/5 rounded-md px-4 py-1 text-xs text-gray-500 flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.1.9-2 2-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" /></svg>
              app.lattice.design/projects/velocity
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#16161c]">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-white">Sprint 24 · Lattice</span>
            <span className="text-xs text-gray-500">Oct 14 - Oct 28</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#16161c]" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-[#16161c]" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 border-2 border-[#16161c]" />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1">
              + New Issue
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-48 border-r border-white/5 py-4 flex flex-col gap-4 bg-[#16161c] text-left">
            <div className="px-4">
              <div className="px-2 py-1.5 rounded bg-white/5 text-sm font-medium flex items-center gap-2 text-white">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" /></svg>
                Board
              </div>
            </div>

            <div className="px-4">
              <div className="text-[10px] font-semibold text-gray-600 mb-2 px-2 uppercase tracking-wider">Projects</div>
              <div className="space-y-0.5">
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-white bg-white/5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Atlas Platform
                </div>
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Mobile App
                </div>
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  Design System
                </div>
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-gray-500">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Infra & DevOps
                </div>
              </div>
            </div>

            <div className="px-4">
              <div className="text-[10px] font-semibold text-gray-600 mb-2 px-2 uppercase tracking-wider">Views</div>
              <div className="space-y-0.5">
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                  Inbox
                </div>
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Sprints
                </div>
                <div className="px-2 py-1.5 rounded text-xs font-medium flex items-center gap-2 text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                  Pull Requests
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4 grid grid-cols-4 gap-4 bg-[#0f0f13] overflow-y-auto">
            
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <div className="w-2 h-2 rounded-full bg-gray-500" />
                Backlog
                <span className="text-gray-600 ml-auto">4</span>
              </div>
              
              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-241</span>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-red-500/10 text-red-400">High</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-3 leading-relaxed">Refactor auth middleware to support SSO providers</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-[#1c1c24]" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 border border-[#1c1c24]" />
                  </div>
                  <span className="text-[10px] text-gray-600">4 ✓</span>
                </div>
              </div>

              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-244</span>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400">Med</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-3 leading-relaxed">Add rate limiting to public API endpoints</p>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 border border-[#1c1c24]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                In Progress
                <span className="text-gray-600 ml-auto">2</span>
              </div>
              
              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-238</span>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-400">Urgent</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-2 leading-relaxed">Fix race condition in webhook delivery worker</p>
                <div className="w-full h-1 bg-white/5 rounded-full mb-3">
                  <div className="h-full w-3/5 bg-blue-500 rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 border border-[#1c1c24]" />
                  <span className="text-[10px] text-gray-600">3 / 5</span>
                </div>
              </div>

              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-229</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-3 leading-relaxed">Redesign sprint planning view with drag handles</p>
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 border border-[#1c1c24]" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                In Review
                <span className="text-gray-600 ml-auto">1</span>
              </div>
              
              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-230</span>
                </div>
                <p className="text-xs font-medium text-gray-200 mb-3 leading-relaxed">Migrate legacy notification preferences UI</p>
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-1.5">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-fuchsia-500 to-pink-500 border border-[#1c1c24]" />
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-500 to-blue-500 border border-[#1c1c24]" />
                  </div>
                  <span className="text-[10px] text-gray-600">5 ✓</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                Done
                <span className="text-gray-600 ml-auto">12</span>
              </div>
              
              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-228</span>
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-xs font-medium text-gray-500 line-through leading-relaxed">Audit log export to CSV</p>
              </div>

              <div className="bg-[#1c1c24] border border-white/5 p-3 rounded-lg opacity-60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-gray-600">ATL-226</span>
                  <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <p className="text-xs font-medium text-gray-500 line-through leading-relaxed">Slack thread sync v2</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
