import React, { useState } from 'react';
import { AlertTriangle, Eye, Shield, TrendingUp } from 'lucide-react';

export default function DirectorBillingV2() {
  const [viewToggle, setViewToggle] = useState('Days');
  const [periodToggle, setPeriodToggle] = useState('Monthly');

  const portfolioRiskItems = [
    {
      id: 'BSL-001',
      title: 'Audit global tax compliance engine partner connection latency',
      subtitle: 'Quarterly risk line item',
      priority: 'High Risk',
      priorityColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      status: 'Critical',
      statusColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
    {
      id: 'BSL-002',
      title: 'Review transaction fee optimization framework contracts',
      subtitle: 'Quarterly risk line item',
      priority: 'Medium Risk',
      priorityColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
      status: 'Critical',
      statusColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
    {
      id: 'BSL-003',
      title: 'Assess operational failover safeguards for payment processing nodes',
      subtitle: 'Quarterly risk line item',
      priority: 'High Risk',
      priorityColor: 'bg-red-500/10 text-red-400 border-red-500/20',
      status: 'Critical',
      statusColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
  ];

  const businessRiskItems = [
    {
      title: 'Audit global tax compliance engine partner connection latency',
      subtitle: 'Revenue Oversight / Billing v2',
      status: 'At Risk',
      statusColor: 'bg-red-500/10 text-red-400 border-red-500/20',
    },
    {
      title: 'Review transaction fee optimization framework contracts',
      subtitle: 'Finance / Infrastructure',
      status: 'On Track',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      title: 'Assess operational failover safeguards for payment processing nodes',
      subtitle: 'Platform Reliability / Payments',
      status: 'In Progress',
      statusColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    },
  ];

  const billingColumns = [
    {
      title: 'Billing Infrastructure Stability',
      icon: '🔴',
      items: [
        'Audit global tax compliance engine partner connection latency',
        'Review transaction fee optimization framework contracts',
        'Assess operational failover safeguards for payment processing nodes',
      ]
    },
    {
      title: 'Revenue Risk Controls',
      icon: '🟡',
      items: [
        'Validate invoice reconciliation exception handling thresholds',
        'Confirm subscription proration logic across regional billing rules',
        'Review chargebacks dispute workflow and escalation routing',
      ]
    },
    {
      title: 'Monetization Readiness',
      icon: '🟢',
      items: [
        'Assess pricing for mixed dependencies for enterprise accounts',
        'Verify analytics attribution integrity for switch cohorts',
        'Align finance sign-off windows with release train milestones',
      ]
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>Projects</span> <span className="text-gray-600">/</span> <span>Revenue Oversight</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Global Billing Transformation Allocation Audits</h1>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-[#111116] border border-white/5 rounded-lg p-1 w-fit">
            {['Monthly', 'Quarterly', 'Annual'].map(option => (
              <button
                key={option}
                onClick={() => setPeriodToggle(option)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  periodToggle === option
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Portfolio Track Banner */}
      <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-5 mb-8 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-1">
            Portfolio Track: Transactional Layer Deployment Risk
          </h2>
          <p className="text-xs text-gray-400">
            Financial infrastructure risk surface across 14 global payment regions
          </p>
        </div>
      </div>

      {/* Three Column Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {billingColumns.map((col, idx) => (
          <div key={idx} className="bg-[#111116] border border-white/5 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <span>{col.icon}</span>
              <h3 className="text-sm font-bold text-white">{col.title}</h3>
            </div>
            <div className="space-y-3">
              {col.items.map((item, i) => (
                <div key={i} className="text-xs text-gray-400 leading-relaxed pl-3 border-l-2 border-white/5 hover:border-white/20 transition-colors">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Director-Level Risk Assessment Items */}
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden mb-8">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Director-Level Risk Assessment Items</h2>
        </div>

        <div className="divide-y divide-white/5">
          {portfolioRiskItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="text-red-400">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-0.5 rounded">{item.id}</span>
                <span className="text-sm font-bold text-white">{item.title}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.priorityColor}`}>
                  {item.priority}
                </span>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-xs font-medium hover:bg-white/10 transition-colors">
                  <Eye className="w-3 h-3" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Business Risk Items */}
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Business Risk Items</h2>
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">3 Open Items</span>
        </div>

        <div className="divide-y divide-white/5">
          {businessRiskItems.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                <div>
                  <div className="text-sm font-bold text-white">{item.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{item.subtitle}</div>
                </div>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${item.statusColor}`}>
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
