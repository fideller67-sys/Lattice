import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Inbox, CheckSquare, Hash, MoreVertical, UserPlus, GitPullRequest, LogOut, MessageSquare, Plus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../config/api';

export default function DeveloperSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [channels, setChannels] = useState([]);
  const [projects, setProjects] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Modals state
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
      navigate(`/developer/channel/${newChannel.name}`);
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
      navigate(`/developer/project/${slug}`);
    } catch (err) {
      console.error(err);
    }
  };
  const navLinkClasses = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/10 text-white'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`;

  const channelLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? 'bg-white/10 text-white'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="w-64 h-screen bg-[#111116] border-r border-white/5 flex flex-col relative">
      {/* Brand Header */}
      <div className="px-6 py-6 flex items-center gap-2 font-bold text-lg text-white tracking-tight">
        <div className="w-6 h-6 rounded bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-sm" />
        </div>
        Lattice
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-2 flex flex-col">
        <div className="space-y-8 flex-1">
          {/* Workspace Section */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Workspace</div>
            <div className="space-y-1">
              <NavLink to="/developer/dashboard" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </div>
              </NavLink>
              <NavLink to="/developer/inbox" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  Inbox
                </div>
                <div className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">12</div>
              </NavLink>
              <NavLink to="/developer/tasks" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <CheckSquare className="w-4 h-4" />
                  My Tasks
                </div>
              </NavLink>
              <NavLink to="/developer/board" className={navLinkClasses}>
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="w-4 h-4" />
                  Sprint Board
                </div>
              </NavLink>
            </div>
          </div>

          {/* Messaging Channels Section */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
              <span>Messaging Channels</span>
              <button onClick={() => setShowChannelModal(true)} className="text-gray-400 text-xs font-normal hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-1">
              {channels.map((channel) => (
                <NavLink key={channel._id} to={`/developer/channel/${channel.name}`} className={channelLinkClasses}>
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  {channel.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <div className="px-3 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center justify-between">
              <span>Projects</span>
              <button onClick={() => setShowProjectModal(true)} className="text-gray-400 text-xs font-normal hover:text-white"><Plus className="w-3.5 h-3.5" /></button>
            </div>
            <div className="space-y-1">
              {projects.map((project) => (
                <NavLink key={project._id || project.slug} to={`/developer/project/${project.slug}`} className={channelLinkClasses}>
                  <div className={`w-2 h-2 rounded-full bg-${project.color || 'emerald'}-500`} />
                  {project.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="mt-8 space-y-1">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
            <UserPlus className="w-4 h-4" />
            Invite Teammates
          </button>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-colors">
            <GitPullRequest className="w-4 h-4" />
            Sync GitHub Link
          </button>
        </div>
      </div>

      {/* User Profile Footer */}
      <div className="p-4 border-t border-white/5 relative">
        {showProfileMenu && (
          <div className="absolute bottom-full left-4 mb-2 w-56 bg-[#111116] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-white/5 transition-colors text-left">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden font-bold text-white text-xs">
             {user?.avatarInitials || user?.name?.charAt(0) || '?'}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="text-sm font-semibold text-white truncate">{user?.name || 'Loading...'}</div>
            <div className="text-xs text-gray-500 capitalize truncate">{user?.role || 'Developer'}</div>
          </div>
          <MoreVertical className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Modals */}
      {(showChannelModal || showProjectModal) && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-[#111116] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Create New {showChannelModal ? 'Channel' : 'Project'}</h2>
              <button onClick={() => { setShowChannelModal(false); setShowProjectModal(false); }} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={showChannelModal ? handleCreateChannel : handleCreateProject}>
              <div className="mb-6">
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder={showChannelModal ? "e.g. general-chat" : "e.g. Project Apollo"}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={!newItemName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg text-sm transition-colors disabled:opacity-50"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
