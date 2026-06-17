import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Inbox, CheckSquare, Hash, MoreVertical, UserPlus, GitPullRequest, Settings, FileText, Plus, X, LogOut, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function DirectorSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [channels, setChannels] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetchSidebarData();
  }, []);

  const fetchSidebarData = async () => {
    try {
      const [channelsRes, projectsRes] = await Promise.all([
        api.get('/channels').catch(() => []),
        api.get('/projects').catch(() => [])
      ]);
      setChannels(channelsRes.length ? channelsRes : [{ name: 'general', _id: '1' }]);
      setProjects(projectsRes.length ? projectsRes : [{ name: 'Onboarding', slug: 'onboarding', color: 'blue' }]);
    } catch (err) {
      console.error('Failed to load sidebar data');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    try {
      const newChannel = await api.post('/channels', { name: newItemName.toLowerCase().replace(/\s+/g, '-') });
      setChannels(prev => [...prev, newChannel]);
      setShowChannelModal(false);
      setNewItemName('');
      navigate(`/director/channel/${newChannel.name}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const slug = newItemName.toLowerCase().replace(/\s+/g, '-');
    try {
      const newProject = await api.post('/projects', { name: newItemName, slug, color: 'emerald' });
      setProjects(prev => [...prev, newProject]);
      setShowProjectModal(false);
      setNewItemName('');
      navigate(`/director/project/${slug}`);
    } catch (err) {
      console.error(err);
    }
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive 
        ? 'bg-gradient-to-r from-blue-500/15 to-transparent text-blue-400 border-l-2 border-blue-500' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1 border-l-2 border-transparent'
    }`;

  const channelLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500/15 to-transparent text-indigo-400 border-l-2 border-indigo-500' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white hover:translate-x-1 border-l-2 border-transparent'
    }`;

  return (
    <div className="w-64 h-screen bg-[#0a0a0f] border-r border-white/5 flex flex-col relative shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-10">
      <div className="px-6 py-6 flex items-center gap-3 font-extrabold text-xl tracking-tight">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <div className="w-3.5 h-3.5 bg-white rounded-sm" />
        </div>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Lattice
        </span>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-2 flex flex-col">
        <div className="space-y-8 flex-1">
          <div>
            <div className="px-3 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Workspace
            </div>
            <div className="space-y-1">
              <NavLink to="/director/dashboard" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </div>
              </NavLink>
              <NavLink to="/director/inbox" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  Inbox
                </div>
                <div className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg shadow-blue-500/30">12</div>
              </NavLink>
              <NavLink to="/director/tasks" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4" />
                  My Tasks
                </div>
              </NavLink>
              <NavLink to="/director/channel/sprint-14-board" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  Sprint Board
                </div>
              </NavLink>
            </div>
          </div>

          <div>
            <div className="px-3 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Metric Dashboards
            </div>
            <div className="space-y-1">
              <NavLink to="/director/channel/platform-eng" className={channelLinkClasses}>
                <LayoutDashboard className="w-4 h-4 opacity-70" />
                Platform Eng
              </NavLink>
              <NavLink to="/director/channel/qa-automation" className={channelLinkClasses}>
                <LayoutDashboard className="w-4 h-4 opacity-70" />
                QA Automation
              </NavLink>
              <NavLink to="/director/channel/release-train" className={channelLinkClasses}>
                <LayoutDashboard className="w-4 h-4 opacity-70" />
                Release Train
              </NavLink>
              <NavLink to="/director/channel/design-review" className={channelLinkClasses}>
                <LayoutDashboard className="w-4 h-4 opacity-70" />
                Design Review
              </NavLink>
              <NavLink to="/director/channel/infra-ops" className={channelLinkClasses}>
                <LayoutDashboard className="w-4 h-4 opacity-70" />
                Infra Ops
              </NavLink>
            </div>
          </div>

          <div>
            <div className="px-3 mb-3 text-[10px] font-bold text-indigo-400/70 uppercase tracking-widest flex items-center justify-between">
              <span>Messaging Channels</span>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <NavLink key={channel._id} to={`/director/channel/${channel.name}`} className={channelLinkClasses}>
                  <Hash className="w-4 h-4 opacity-70" />
                  {channel.name}
                </NavLink>
              ))}
              
              <button 
                onClick={() => setShowChannelModal(true)} 
                className="flex items-center gap-3 px-3 py-2 mt-2 w-full rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-indigo-500/50 group-hover:bg-indigo-500/20 transition-all">
                  <Plus className="w-3 h-3 group-hover:text-indigo-400" />
                </div>
                Add Channel
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 mb-3 text-[10px] font-bold text-indigo-400/70 uppercase tracking-widest flex items-center justify-between">
              <span>Projects</span>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <NavLink key={project._id || project.slug} to={`/director/project/${project.slug}`} className={channelLinkClasses}>
                  <div className={`w-2 h-2 rounded-full bg-${project.color || 'emerald'}-500 shadow-[0_0_8px_currentColor]`} />
                  {project.name}
                </NavLink>
              ))}

              <button 
                onClick={() => setShowProjectModal(true)} 
                className="flex items-center gap-3 px-3 py-2 mt-2 w-full rounded-xl text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-5 h-5 rounded bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/20 transition-all">
                  <Plus className="w-3 h-3 group-hover:text-emerald-400" />
                </div>
                Add Project
              </button>
            </div>
          </div>

          <div>
            <div className="px-3 mb-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Administration
            </div>
            <div className="space-y-1">
              <NavLink to="/director/admin" className={channelLinkClasses}>
                <Settings className="w-4 h-4 opacity-70" />
                Workspace Settings
              </NavLink>
              <NavLink to="/director/admin/audit-logs" className={channelLinkClasses}>
                <FileText className="w-4 h-4 opacity-70" />
                Audit Logs
              </NavLink>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-4">
          <NavLink
            to="/director/admin"
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg"
          >
            <UserPlus className="w-4 h-4" />
            Invite Teammates
          </NavLink>
        </div>
      </div>

      <div className="p-3">
        {showProfileMenu && (
          <div className="absolute bottom-[80px] left-3 right-3 bg-[#111116] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50 transform origin-bottom animate-in fade-in slide-in-from-bottom-2 duration-200">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-400 hover:bg-white/5 transition-colors text-left">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 cursor-pointer transition-all duration-300 backdrop-blur-md"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner font-bold text-white text-sm">
             {user?.avatarInitials || user?.name?.charAt(0) || '?'}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-bold text-white truncate">{user?.name || 'Loading...'}</div>
            <div className="text-[11px] font-medium text-indigo-300 uppercase tracking-wider truncate">{user?.role || 'Director'}</div>
          </div>
          <MoreVertical className="w-4 h-4 text-gray-500 mr-1" />
        </div>
      </div>

      {(showChannelModal || showProjectModal) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] animate-in fade-in duration-200">
          <div className="bg-[#0f111a] border border-white/10 rounded-3xl w-full max-w-md p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] transform scale-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                Create New {showChannelModal ? 'Channel' : 'Project'}
              </h2>
              <button onClick={() => { setShowChannelModal(false); setShowProjectModal(false); }} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={showChannelModal ? handleCreateChannel : handleCreateProject}>
              <div className="mb-6">
                <label className="text-xs font-bold text-indigo-300/70 uppercase tracking-widest mb-2 block">Name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={showChannelModal ? "e.g. general-chat" : "e.g. Project Apollo"}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!newItemName.trim()}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:shadow-none"
              >
                Create {showChannelModal ? 'Channel' : 'Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
