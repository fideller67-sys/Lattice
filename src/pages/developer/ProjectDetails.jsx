import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Trash2 } from 'lucide-react';
import api from '../../config/api';

export default function ProjectDetails() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await api.get(`/projects/${projectSlug}`);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProject();
  }, [projectSlug]);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${project.name}?`)) {
      try {
        await api.delete(`/projects/${projectSlug}`);
        navigate('/');
        window.location.reload();
      } catch (err) {
        console.error('Failed to delete project:', err);
      }
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'In Progress': return 'text-blue-400';
      case 'In Review': return 'text-amber-400';
      case 'To Do': return 'text-gray-400';
      case 'On Hold': return 'text-gray-500';
      default: return 'text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Project not found.
      </div>
    );
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-2">Projects &gt; {project.name}</div>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight">Epic Milestone Analysis</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-[#111116] border border-white/5 rounded-lg overflow-hidden">
            <button className="px-4 py-1.5 text-xs font-medium bg-blue-600 text-white">Days</button>
            <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors">Weeks</button>
          </div>
          <button 
            onClick={handleDelete}
            className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20"
            title="Delete Project"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Epics */}
      <div className="space-y-8">
        {project.epics.map((epic, epicIdx) => (
          <div key={epicIdx}>
            {/* Epic Header Bar */}
            <div className={`${epic.color} rounded-t-xl px-5 py-3 flex items-center gap-2`}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-sm font-bold text-white uppercase tracking-wider">{epic.name}</span>
            </div>

            {/* Epic Progress Bar */}
            <div className="bg-[#111116] border-x border-white/5 px-5 py-1">
              <div className="h-1 bg-white/5 rounded-full">
                <div 
                  className={`h-full ${epic.color} rounded-full transition-all`} 
                  style={{ width: `${Math.round((epic.tasks.filter(t => t.status === 'In Progress' || t.status === 'In Review').length / epic.tasks.length) * 100)}%` }} 
                />
              </div>
            </div>

            {/* Tasks */}
            <div className="bg-[#111116] border border-white/5 rounded-b-xl overflow-hidden divide-y divide-white/5">
              {epic.tasks.map((task) => (
                <div 
                  key={task.id}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-gray-500 w-20">{task.id}</span>
                    <span className="text-sm text-gray-200">{task.title}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityStyles(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span className={`text-xs font-medium w-20 text-right ${getStatusStyles(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
