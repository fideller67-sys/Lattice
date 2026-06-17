import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertTriangle, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../../config/api';

export default function ProductDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  const completionRate = stats?.totalTasks > 0 ? Math.round((stats.doneTasks / stats.totalTasks) * 100) : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-baseline gap-4">
          <h1 className="text-2xl font-bold text-white">Product Management Hub</h1>
          <span className="text-sm font-medium text-blue-400">Target Deliverables: {stats?.velocity || 0}% Healthy</span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <Plus className="w-4 h-4" />
          New Epic
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-sm text-gray-400 font-medium mb-4">Feature Delivery Rate</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold text-white tracking-tight">{stats?.velocity || 0}%</div>
            <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold pb-1">
              <TrendingUp className="w-4 h-4" />
              On Track
            </div>
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-sm text-gray-400 font-medium mb-4">Open Product Blockers</div>
          <div className="flex items-end justify-between">
            <div className="text-4xl font-bold text-white tracking-tight">{stats?.highPriorityOpen || 0}</div>
            {stats?.highPriorityOpen > 0 ? (
              <div className="flex items-center gap-1.5 text-red-400 text-xs font-bold px-2 py-1 bg-red-500/10 border border-red-500/20 rounded-md mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Action needed
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Clear
              </div>
            )}
          </div>
        </div>

        <div className="bg-[#111116] border border-white/5 rounded-xl p-6 flex flex-col justify-between">
          <div className="text-sm text-gray-400 font-medium mb-4">Total Tasks Active</div>
          <div className="flex items-baseline justify-between">
            <div className="text-4xl font-bold text-white tracking-tight">{stats?.totalTasks || 0}</div>
            <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">{stats?.memberCount || 0} Assigned Devs</span>
          </div>
        </div>

      </div>

      <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4">Current Sprint Breakdown</h3>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats?.doneTasks || 0}</div>
            <div className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Done</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats?.reviewTasks || 0}</div>
            <div className="text-xs font-medium text-purple-400 uppercase tracking-widest">Review</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats?.inProgressTasks || 0}</div>
            <div className="text-xs font-medium text-yellow-400 uppercase tracking-widest">In Progress</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats?.todoTasks || 0}</div>
            <div className="text-xs font-medium text-blue-400 uppercase tracking-widest">To Do</div>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{stats?.backlogTasks || 0}</div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">Backlog</div>
          </div>
        </div>
      </div>
    </div>
  );
}
