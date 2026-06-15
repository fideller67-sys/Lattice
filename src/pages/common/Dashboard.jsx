import React, { useState, useEffect } from 'react';
import { ArrowUpRight, AlertTriangle, Plus, Loader2, CheckCircle2 } from 'lucide-react';
import api from '../../config/api';

export default function Dashboard() {
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

  return (
    <div className="p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Developer Command Center</h1>
          <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            All Core Services Online
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Velocity */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm font-medium mb-4">Sprint Velocity</div>
          <div className="flex items-end justify-between">
            <div className="text-5xl font-bold text-white tracking-tight">{stats?.velocity || 0}%</div>
            <div className="flex items-center gap-1 text-emerald-400 text-sm font-bold pb-1">
              <ArrowUpRight className="w-4 h-4" />
              Active
            </div>
          </div>
        </div>

        {/* High Priority Open */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm font-medium mb-4">Open Blockers</div>
          <div className="flex items-end justify-between">
            <div className="text-5xl font-bold text-white tracking-tight">{stats?.highPriorityOpen || 0}</div>
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

        {/* Total Tasks */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm font-medium mb-4">Total Tasks</div>
          <div className="flex items-end justify-between">
            <div className="text-5xl font-bold text-white tracking-tight">{stats?.totalTasks || 0}</div>
            <div className="text-gray-500 text-sm pb-1">
              {stats?.doneTasks || 0} done
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-[#111116] border border-white/5 rounded-2xl p-6">
          <div className="text-gray-400 text-sm font-medium mb-4">Team Members</div>
          <div className="flex items-end justify-between">
            <div className="text-5xl font-bold text-white tracking-tight">{stats?.memberCount || 0}</div>
            <div className="text-gray-500 text-sm pb-1">
              In workspace
            </div>
          </div>
        </div>
      </div>

      {/* Task Status Breakdown */}
      <div className="mb-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        Task Status Breakdown
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
        {[
          { label: 'Backlog', count: stats?.backlogTasks || 0, color: 'bg-gray-500' },
          { label: 'To Do', count: stats?.todoTasks || 0, color: 'bg-blue-500' },
          { label: 'In Progress', count: stats?.inProgressTasks || 0, color: 'bg-yellow-500' },
          { label: 'In Review', count: stats?.reviewTasks || 0, color: 'bg-purple-500' },
          { label: 'Done', count: stats?.doneTasks || 0, color: 'bg-emerald-500' },
        ].map((item, idx) => (
          <div key={idx} className="bg-[#111116] border border-white/5 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-xs text-gray-400 font-medium">{item.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{item.count}</div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {stats?.totalTasks > 0 && (
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="flex justify-between text-xs text-gray-400 mb-3 font-medium">
            <span>Sprint Progress</span>
            <span>{stats?.doneTasks || 0} of {stats?.totalTasks || 0} tasks completed</span>
          </div>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden flex">
            <div
              className="h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${stats?.totalTasks > 0 ? (stats.doneTasks / stats.totalTasks) * 100 : 0}%` }}
            />
            <div
              className="h-full bg-purple-500 transition-all duration-500"
              style={{ width: `${stats?.totalTasks > 0 ? (stats.reviewTasks / stats.totalTasks) * 100 : 0}%` }}
            />
            <div
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${stats?.totalTasks > 0 ? (stats.inProgressTasks / stats.totalTasks) * 100 : 0}%` }}
            />
          </div>
          <div className="flex gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Done</span>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-purple-500" /> Review</span>
            <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-yellow-500" /> In Progress</span>
          </div>
        </div>
      )}
    </div>
  );
}
