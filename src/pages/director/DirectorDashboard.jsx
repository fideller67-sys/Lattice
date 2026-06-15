import React, { useState, useEffect } from 'react';
import { Download, TrendingUp, Loader2 } from 'lucide-react';
import api from '../../config/api';

export default function DirectorDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats:', err);
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
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white tracking-tight">Engineering Organization Oversight</h1>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-bold tracking-wide">
            Delivery Index: {stats?.velocity || 0}% Healthy
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
          <Download className="w-4 h-4" />
          Export Org Report
        </button>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        
        {/* Headcount Card */}
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="text-xs text-gray-500 font-medium mb-4">Total Engineering Headcount</div>
          <div className="text-3xl font-bold text-white tracking-tight mb-2">{stats?.memberCount || 0} Active Members</div>
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            In your workspace
          </div>
        </div>

        {/* Delivery Index Card */}
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="text-xs text-gray-500 font-medium mb-4">Cross-Project Delivery Index</div>
          <div className="text-3xl font-bold text-white tracking-tight mb-2">{stats?.velocity || 0}%</div>
          <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {stats?.doneTasks || 0} tasks completed
          </div>
        </div>

        {/* Tasks Overview */}
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="text-xs text-gray-500 font-medium mb-4">Task Distribution</div>
          <div className="text-3xl font-bold text-white tracking-tight mb-2">{stats?.totalTasks || 0} Total</div>
          <div className="text-xs text-gray-400 font-medium flex items-center gap-1">
            {stats?.highPriorityOpen || 0} high priority open
          </div>
        </div>

      </div>

      {/* Task Status Visual */}
      <div className="bg-[#111116] border border-white/5 rounded-xl p-6 mb-6">
        <div className="flex justify-between text-xs text-gray-400 mb-3 font-medium">
          <span>Overall Sprint Progress</span>
          <span>{completionRate}% complete</span>
        </div>
        <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden flex">
          {stats?.totalTasks > 0 && (
            <>
              <div className="h-full bg-emerald-500 transition-all duration-700" style={{ width: `${(stats.doneTasks / stats.totalTasks) * 100}%` }} />
              <div className="h-full bg-purple-500 transition-all duration-700" style={{ width: `${(stats.reviewTasks / stats.totalTasks) * 100}%` }} />
              <div className="h-full bg-yellow-500 transition-all duration-700" style={{ width: `${(stats.inProgressTasks / stats.totalTasks) * 100}%` }} />
              <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(stats.todoTasks / stats.totalTasks) * 100}%` }} />
            </>
          )}
        </div>
        <div className="flex gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Done ({stats?.doneTasks || 0})</span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-purple-500" /> Review ({stats?.reviewTasks || 0})</span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-yellow-500" /> In Progress ({stats?.inProgressTasks || 0})</span>
          <span className="flex items-center gap-1.5 text-[10px] text-gray-500"><div className="w-2 h-2 rounded-full bg-blue-500" /> To Do ({stats?.todoTasks || 0})</span>
        </div>
      </div>
    </div>
  );
}
