import React, { useState, useEffect } from 'react';
import { Users, Shield, Lock, Globe, Key, UserPlus, Settings, FileText, ChevronRight, Loader2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../config/api';

export default function DirectorWorkspaceAdmin() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await api.get('/admin/members');
      setMembers(data);
    } catch (err) {
      console.error('Failed to load members:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/user/${userId}/role`, { role: newRole });
      setMembers(prev => prev.map(m => m._id === userId ? { ...m, role: newRole } : m));
    } catch (err) {
      alert(err.message || 'Failed to update role');
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to remove ${userName} from the workspace?`)) return;
    try {
      await api.delete(`/admin/user/${userId}`);
      setMembers(prev => prev.filter(m => m._id !== userId));
    } catch (err) {
      alert(err.message || 'Failed to remove user');
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: 'bg-red-500/10 text-red-400 border-red-500/20',
      director: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      pm: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      developer: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    };
    return styles[role] || 'bg-white/5 text-gray-400 border-white/10';
  };

  const securityConfigs = [
    {
      title: 'Enforce Organization-wide SAML Single Sign-On',
      description: 'Require identity provider authentication for all team members',
      icon: <Lock className="w-4 h-4" />,
      status: 'Enabled',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Restrict Shared Channel Custom Creation Tiers',
      description: 'Limit channel creation to admin and manager roles only',
      icon: <Globe className="w-4 h-4" />,
      status: 'Enabled',
      statusColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
    },
    {
      title: 'Set Default Project Access Scopes to Restricted',
      description: 'Apply least-privilege access controls for newly created projects',
      icon: <Key className="w-4 h-4" />,
      status: 'Restricted',
      statusColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
          Director-level controls for Engineering Organization workspace
        </div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Workspace Administration</h1>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-xl p-6 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-xs text-gray-500 font-bold mb-2 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" />
              Active Members
            </div>
            <div className="text-4xl font-bold text-white tracking-tight">{members.length}</div>
          </div>
        </div>
        <button
          onClick={() => setInviteModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
        >
          <UserPlus className="w-4 h-4" />
          Invite Teammates
        </button>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden mb-6">
        <div className="p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            Workspace Members
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {members.map((member) => (
              <div key={member._id} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    {member.avatarInitials || member.name?.charAt(0) || '?'}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member._id, e.target.value)}
                    className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer appearance-none ${getRoleBadge(member.role)} bg-transparent focus:outline-none`}
                  >
                    <option value="developer">Developer</option>
                    <option value="pm">Product Manager</option>
                    <option value="director">Director</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button
                    onClick={() => handleDeleteUser(member._id, member.name)}
                    className="text-gray-600 hover:text-red-400 transition-colors p-1"
                    title="Remove user"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden mb-6">
        <div className="p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-gray-500" />
            Security Configuration
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {securityConfigs.map((config, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                  {config.icon}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{config.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{config.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border ${config.statusColor}`}>
                  {config.status}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="bg-[#111116] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:bg-white/[0.02] hover:border-white/10 transition-colors text-left group">
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Workspace Settings</div>
            <div className="text-xs text-gray-500">General workspace configuration and preferences</div>
          </div>
        </button>

        <button
          onClick={() => navigate('/director/admin/audit-logs')}
          className="bg-[#111116] border border-white/5 rounded-xl p-5 flex items-center gap-4 hover:bg-white/[0.02] hover:border-white/10 transition-colors text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Audit Logs</div>
            <div className="text-xs text-gray-500">Review activity history and compliance trail</div>
          </div>
        </button>
      </div>

      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setInviteModalOpen(false)} />
          <div className="relative bg-[#111116] border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Invite Teammates</h3>
            <p className="text-sm text-gray-500 mb-6">Send an invitation to join your workspace</p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">Email Address</label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 mb-2">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-4 py-3 bg-[#0a0a0f] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="developer">Developer — Full access to channels, projects, and code</option>
                  <option value="pm">Product Manager — Manage tasks, epics, and roadmaps</option>
                  <option value="director">Director — Full administrative and oversight access</option>
                  <option value="admin">Admin — Complete workspace administration</option>
                </select>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-3">
                <div className="text-xs text-blue-400 font-medium">
                  {inviteRole === 'developer' && '💻 Developers get full project access, GitHub sync, and task management.'}
                  {inviteRole === 'pm' && '📋 PMs can manage tasks, create epics, and view team analytics.'}
                  {inviteRole === 'director' && '🎯 Directors get organization-wide oversight and approval authority.'}
                  {inviteRole === 'admin' && '⚡ Admins have full workspace control including security settings.'}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={() => setInviteModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!inviteEmail) return;
                  try {
                    const newUser = await api.post('/admin/invite', { email: inviteEmail, role: inviteRole });
                    setMembers(prev => [newUser, ...prev]);
                    setInviteModalOpen(false);
                    setInviteEmail('');
                  } catch (err) {
                    alert(err.message || 'Failed to invite user');
                  }
                }}
                className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
