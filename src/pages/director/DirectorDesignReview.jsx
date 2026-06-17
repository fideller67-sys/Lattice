import React, { useState, useEffect } from 'react';
import { PenTool, CheckCircle2, Clock, AlertTriangle, MoreHorizontal, Image, Loader2, X, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../config/api';

export default function DirectorDesignReview() {
  const [data, setData] = useState(null);
  const [localReviews, setLocalReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDesignName, setNewDesignName] = useState('');
  const [newDesignLink, setNewDesignLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/metric-dashboards/design-review');
        setData(res);
        setLocalReviews(res.items || []);
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

  const handleSubmitDesign = (e) => {
    e.preventDefault();
    if (!newDesignName) return;

    const newReview = {
      id: `DR-${Math.floor(Math.random() * 900) + 100}`,
      name: newDesignName,
      stage: 'Initial Review',
      designer: 'You',
      comments: 0,
      status: 'PENDING',
      statusColor: 'text-yellow-400 border-yellow-400/20 bg-yellow-400/10',
      health: 'Unread'
    };

    setLocalReviews([newReview, ...localReviews]);
    setIsModalOpen(false);
    setNewDesignName('');
    setNewDesignLink('');
    
    toast.success('Design submitted for review!', { icon: '🎨' });
  };

  const handleViewDesignSystem = () => {
    toast.loading('Loading Lattice Design System...', { duration: 1500 });
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-gray-500 font-light">#</span> Design Review
        </h1>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Submit New Design
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#111116] border border-white/5 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <PenTool className="w-4 h-4 text-emerald-400" />
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
            <Clock className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{metrics[2].label}</span>
          </div>
          <div className="text-3xl font-bold text-white tracking-tight">{metrics[2].value}</div>
          <div className="text-xs text-purple-400 mt-2 font-medium">{metrics[2].subtext}</div>
        </div>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Pending Design Reviews</h2>
          <button 
            onClick={handleViewDesignSystem}
            className="text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            View Design System
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {localReviews.map((rev) => (
            <div key={rev.id} className="p-5 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 shrink-0">
                  <Image className="w-5 h-5 text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-gray-500">{rev.id}</span>
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{rev.name}</h3>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span>Stage: <span className="text-gray-300">{rev.stage}</span></span>
                    <span>•</span>
                    <span>{rev.designer} ({rev.comments} comments)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${rev.statusColor}`}>
                    {rev.status}
                  </span>
                  <div className="text-[10px] font-medium text-gray-500 mt-1.5 flex items-center gap-1 justify-end">
                    Status: {rev.health}
                  </div>
                </div>
                <button 
                  onClick={() => toast(`Opening Figma for ${rev.id}`)}
                  className="p-2 hover:bg-white/10 rounded-lg text-gray-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111116] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Submit New Design</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmitDesign} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Design Component or Feature</label>
                <input 
                  type="text"
                  value={newDesignName}
                  onChange={(e) => setNewDesignName(e.target.value)}
                  placeholder="e.g. Navigation Redesign V2"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:blue-500 transition-colors"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2">Figma Link</label>
                <input 
                  type="url"
                  value={newDesignLink}
                  onChange={(e) => setNewDesignLink(e.target.value)}
                  placeholder="https://figma.com/file/..."
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
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
