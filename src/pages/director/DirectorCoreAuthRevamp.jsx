import React, { useState } from 'react';
import { Users, DollarSign, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function DirectorCoreAuthRevamp() {
  const [viewToggle, setViewToggle] = useState('Days');

  const milestones = [
    {
      id: 'AUTH-401',
      title: 'External Cryptographic Systems Vendor Hand-off Validation',
      priority: 'High',
      priorityColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      status: 'Awaiting Sign-off',
      statusColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    },
    {
      id: 'AUTH-402',
      title: 'Corporate Legal Identity Data Retention Approval Sign-off',
      priority: 'Medium',
      priorityColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      status: 'In Legal Review',
      statusColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'AUTH-403',
      title: 'Multi-Factor Auth Protocol Certification Review',
      priority: 'High',
      priorityColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      status: 'Scheduled',
      statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
    {
      id: 'AUTH-404',
      title: 'Zero-Trust Network Access Policy Board Ratification',
      priority: 'Medium',
      priorityColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      status: 'Completed',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>Projects</span> <span className="text-gray-600">/</span> <span>Strategic Oversight</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Identity Security Capital Investment Audit</h1>
        </div>

        {/* Toggle Days/Weeks */}
        <div className="flex items-center bg-[#111116] border border-white/5 rounded-lg p-1 w-fit">
          {['Days', 'Weeks'].map(option => (
            <button
              key={option}
              onClick={() => setViewToggle(option)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                viewToggle === option
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500">
            <Users className="w-3.5 h-3.5" />
            Assigned Headcount
          </div>
          <div className="text-xl font-bold text-white">16 Full-Time Engineers</div>
        </div>
        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500">
            <DollarSign className="w-3.5 h-3.5" />
            Estimated Epic Capital Expenditure
          </div>
          <div className="text-xl font-bold text-white">$125K / Month</div>
        </div>
        <div className="bg-[#111116] border border-white/5 rounded-xl p-5 hover:border-white/10 transition-colors">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            Timeline Tracking Status
          </div>
          <div className="text-xl font-bold text-emerald-400">Ahead of Schedule</div>
        </div>
      </div>

      {/* Organizational Milestone Dependencies */}
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white mb-1">Organizational Milestone Dependencies</h2>
          <p className="text-xs text-gray-500">Cross-team roadmap items for identity security capital investment governance</p>
        </div>

        <div className="flex items-center justify-end px-6 py-3 border-b border-white/5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">4 Milestones</span>
        </div>

        <div className="divide-y divide-white/5">
          {milestones.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="text-gray-500">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">{item.id}</span>
                <span className="text-sm font-bold text-white">{item.title}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.priorityColor}`}>
                  {item.priority}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.statusColor}`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
