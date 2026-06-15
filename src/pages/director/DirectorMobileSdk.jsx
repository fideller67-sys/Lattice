import React, { useState } from 'react';
import { Smartphone, Eye, AlertTriangle, Shield, ExternalLink } from 'lucide-react';

export default function DirectorMobileSdk() {
  const [viewToggle, setViewToggle] = useState('Days');

  const riskItems = [
    {
      id: 'MIS-001',
      title: 'Verify App Store distribution compliance framework guidelines',
      status: 'Surfaced',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'MIS-002',
      title: 'Assess cross-product library reuse metrics to reduce engineering repetition waste',
      status: 'In Review',
      statusColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    },
    {
      id: 'MIS-003',
      title: 'Validate push notification delivery SLA across iOS and Android targets',
      status: 'Triggered',
      statusColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
    {
      id: 'MIS-004',
      title: 'Review native SDK versioning and backend compatibility audit trail',
      status: 'Surfaced',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>Projects</span> <span className="text-gray-600">/</span> <span>Channel Expansion</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Mobile Ecosystem Market Readiness Capital Portfolio</h1>
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

      {/* Portfolio Track Banner */}
      <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-5 mb-8 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-0.5">
          <Shield className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">
            Portfolio Track: Mobile Ecosystem Growth Patterns
          </h2>
          <p className="text-xs text-gray-400">
            Native asset distribution, cross-platform SDK compliance, and app store market expansion tracking
          </p>
        </div>
      </div>

      {/* Mobile Platform Risk Checklist */}
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Mobile Platform Risk Checklist</h2>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">4 Items</span>
        </div>

        <div className="divide-y divide-white/5">
          {riskItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="text-gray-500">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">{item.id}</span>
                <span className="text-sm font-bold text-white">{item.title}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.statusColor}`}>
                  {item.status}
                </span>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
