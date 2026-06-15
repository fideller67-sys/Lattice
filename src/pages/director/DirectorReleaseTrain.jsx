import React, { useState, useEffect } from 'react';
import { Train, CheckCircle2, Clock, PlayCircle, MoreHorizontal, AlertCircle, Loader2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../config/api';

export default function DirectorReleaseTrain() {
  const [data, setData] = useState(null);
  const [localReleases, setLocalReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReleaseName, setNewReleaseName] = useState('');
  const [newReleaseDate, setNewReleaseDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/metric-dashboards/release-train');
        setData(res);
        setLocalReleases(res.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-5xl mx-auto flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const metrics = data?.metrics || [{}, {}, {}];

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newReleaseName) return;

    const newRelease = {
      id: `REL-${Math.floor(Math.random() * 900) + 100}`,
      name: newReleaseName,
      stage: 'Planning',
      tickets: 0,
      blockers: 0,
      status: 'UPCOMING',
      statusColor: 'text-purple-400 border-purple-400/20 bg-purple-400/10',
      lastUpdated: newReleaseDate || 'Scheduled'
    };

    setLocalReleases([newRelease, ...localReleases]);
    setIsModalOpen(false);
    setNewReleaseName('');
    setNewReleaseDate('');
    
    toast.success('Release scheduled successfully!', { icon: '🚀' });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-gray-500 font-light">#</span> Release Train
        </h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Schedule Release
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Train className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{metrics[0].label}</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">{metrics[0].value}</div>
          <div className="text-xs text-gray-400 mt-2 font-medium">{metrics[0].subtext}</div>
        </div>
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{metrics[1].label}</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">{metrics[1].value}</div>
          <div className="text-xs text-emerald-400 mt-2 font-medium">{metrics[1].subtext}</div>
        </div>
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{metrics[2].label}</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">{metrics[2].value}</div>
          <div className="text-xs text-red-400 mt-2 font-medium">{metrics[2].subtext}</div>
        </div>
      </div>

      {/* Releases Table */}
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Upcoming & Active Releases</h2>
          <button 
            onClick={() => toast('Timeline view is under construction', { icon: '🚧' })}
            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            View Timeline
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {localReleases.map((release) => (
            <div key={release.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <PlayCircle className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500">{release.id}</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{release.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span>Stage: <span className="text-gray-300">{release.stage}</span></span>
                    <span>•</span>
                    <span>{release.tickets} issues ({release.blockers} blockers)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${release.statusColor}`}>
                    {release.status}
                  </span>
                  <div className="text-[10px] font-medium text-gray-500 mt-1.5 flex items-center gap-1 justify-end">
                    <Clock className="w-3 h-3" />
                    {release.lastUpdated}
                  </div>
                </div>
                <button 
                  onClick={() => toast(`Editing ${release.id}`)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111116] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Schedule Release</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Release Name</label>
                <input 
                  type="text"
                  value={newReleaseName}
                  onChange={(e) => setNewReleaseName(e.target.value)}
                  placeholder="e.g. v2.4.0 Core Update"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Target Date (Optional)</label>
                <input 
                  type="date"
                  value={newReleaseDate}
                  onChange={(e) => setNewReleaseDate(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                  Schedule Release
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
