import React, { useState, useEffect, useRef } from 'react';
import { Plus, X, Loader2, GripVertical, Image, CheckSquare, MoreHorizontal, Activity } from 'lucide-react';
import api from '../config/api';

const STATUS_COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];

const getPriorityStyles = (priority) => {
  switch (priority) {
    case 'High': return 'text-red-400 bg-red-500/10 border-red-500/20';
    case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  }
};

export default function DynamicSprintBoard({ title = 'Sprint Board', subtitle }) {
  const [tasks, setTasks] = useState([]);
  const [workspaceUsers, setWorkspaceUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNewIssue, setShowNewIssue] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  const [selectedTask, setSelectedTask] = useState(null);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newStatus, setNewStatus] = useState('todo');
  const [newAssignee, setNewAssignee] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedTask) {
      const updated = tasks.find(t => t._id === selectedTask._id);
      if (updated) setSelectedTask(updated);
    }
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const data = await api.get('/tasks');
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await api.get('/auth/users/workspace');
      setWorkspaceUsers(data);
    } catch (err) {
      console.error('Failed to load users:', err);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        title: newTitle,
        description: newDescription,
        priority: newPriority,
        status: newStatus,
        sprint: 'Sprint 14',
      };
      if (newAssignee) payload.assignedTo = newAssignee;

      const created = await api.post('/tasks', payload);
      setTasks((prev) => [...prev, created]);
      setNewTitle('');
      setNewDescription('');
      setNewPriority('Medium');
      setNewStatus('todo');
      setNewAssignee('');
      setShowNewIssue(false);
      setFormError('');
    } catch (err) {
      console.error('Failed to create task:', err);
      setFormError(err.message || 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.style.opacity = '0.4';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    if (!draggedTask || draggedTask.status === newStatus) return;

    const taskId = draggedTask._id;

    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
    } catch (err) {
      console.error('Failed to update task:', err);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status: draggedTask.status } : t))
      );
    }
  };

  const handlePropertyChange = async (field, value) => {
    if (!selectedTask) return;
    const taskId = selectedTask._id;
    
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, [field]: value } : t))
    );
    
    try {
      await api.put(`/tasks/${taskId}`, { [field]: value });
    } catch (err) {
      console.error(`Failed to update ${field}:`, err);
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, [field]: selectedTask[field] } : t))
      );
    }
  };

  const getColumnTasks = (columnId) => tasks.filter((t) => t.status === columnId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0a0f]">
      <div className="px-10 py-6 border-b border-white/5 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-gray-500 font-light">#</span> {title}
          </h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={() => setShowNewIssue(true)}
          className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors shadow-sm flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" /> New Issue
        </button>
      </div>

      {error && (
        <div className="mx-10 mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg shrink-0">
          {error}
        </div>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        
        <div className="flex-1 overflow-x-auto p-10 custom-scrollbar">
          <div className="flex gap-6 min-w-max h-full">
            {STATUS_COLUMNS.map((col) => {
              const columnTasks = getColumnTasks(col.id);
              const isOver = dragOverColumn === col.id;
              return (
                <div
                  key={col.id}
                  className={`w-[300px] flex flex-col h-full rounded-xl transition-colors ${isOver ? 'bg-white/[0.02]' : ''}`}
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, col.id)}
                >
                  <div className="flex items-center gap-2 mb-4 text-xs font-bold text-gray-400 uppercase tracking-widest px-2">
                    {col.title}
                    <span className="bg-white/5 px-1.5 py-0.5 rounded-full text-[10px]">
                      {columnTasks.length}
                    </span>
                  </div>

                  <div className="flex-1 overflow-y-auto space-y-3 pb-10 px-1 custom-scrollbar">
                    {columnTasks.map((task) => (
                      <div
                        key={task._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedTask(task)}
                        className={`bg-[#111116] border rounded-xl p-4 transition-all cursor-pointer group ${
                          selectedTask?._id === task._id 
                          ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.15)] bg-[#16161c]' 
                          : 'border-white/5 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border ${getPriorityStyles(task.priority)}`}
                          >
                            {task.priority || 'Medium'}
                          </span>
                          {task.sprint && (
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-white/5 text-gray-400">
                              {task.sprint}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-medium text-gray-200 mb-3 leading-snug group-hover:text-white transition-colors">
                          {task.title}
                        </h3>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-[10px] font-medium text-gray-500 font-mono">
                            T-{task._id.slice(-6).toUpperCase()}
                          </span>
                          {task.assignedTo && (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#111116] flex items-center justify-center text-[8px] font-bold text-white">
                              {task.assignedTo.avatarInitials || task.assignedTo.name?.charAt(0) || '?'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    {columnTasks.length === 0 && (
                      <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-gray-600 text-xs">
                        Drop tasks here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedTask && (
          <div className="w-[450px] shrink-0 border-l border-white/5 bg-[#0d0d12] overflow-y-auto custom-scrollbar flex flex-col animate-in slide-in-from-right duration-200">
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0d0d12]/80 backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-gray-400 tracking-wider">
                  T-{selectedTask._id.slice(-6).toUpperCase()}
                </span>
                <button className="p-1 hover:bg-white/10 rounded text-gray-500 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedTask(null)} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Status</span>
                  <select 
                    value={selectedTask.status} 
                    onChange={(e) => handlePropertyChange('status', e.target.value)}
                    className="bg-[#16161c] border border-white/5 hover:border-white/10 rounded-full px-3 py-1 text-xs font-bold text-gray-300 outline-none cursor-pointer appearance-none text-right"
                  >
                    {STATUS_COLUMNS.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Assignee</span>
                  <div className="flex items-center gap-2 bg-[#16161c] border border-white/5 rounded-full px-2 py-1 cursor-pointer hover:border-white/10">
                    {selectedTask.assignedTo ? (
                      <>
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-[8px] font-bold text-white">
                          {selectedTask.assignedTo.avatarInitials || '?'}
                        </div>
                        <span className="text-xs font-bold text-gray-300 pr-1">{selectedTask.assignedTo.name?.split(' ')[0]}</span>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-gray-500 px-2">Unassigned</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Priority</span>
                  <select 
                    value={selectedTask.priority || 'Medium'} 
                    onChange={(e) => handlePropertyChange('priority', e.target.value)}
                    className={`rounded-full px-3 py-1 text-xs font-bold outline-none cursor-pointer appearance-none text-right border ${getPriorityStyles(selectedTask.priority)}`}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Parent Epic</span>
                  <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold">
                    {selectedTask.epic || 'Epic: Auth'}
                  </span>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-6 leading-tight">
                {selectedTask.title}
              </h2>

              <div className="mb-8">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-gray-500">##</span> Overview
                </h3>
                <div className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                  {selectedTask.description || "No description provided for this task. Click to edit."}
                </div>
              </div>

              <div className="mb-8 bg-[#16161c] border border-white/5 rounded-xl aspect-video flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:bg-white/[0.03] transition-colors group">
                <Image className="w-8 h-8 mb-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                <span className="text-xs font-medium">Auth Flow Diagram</span>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckSquare className="w-4 h-4 text-gray-500" /> Checklist
                  </h3>
                  <span className="text-xs text-gray-500 font-mono">
                    {selectedTask.checklist?.filter(c => c.isCompleted).length || 0}/{selectedTask.checklist?.length || 4}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {(selectedTask.checklist && selectedTask.checklist.length > 0 ? selectedTask.checklist : [
                    { text: 'Generate code verifier and challenge', isCompleted: true },
                    { text: 'Redirect to authorization endpoint', isCompleted: true },
                    { text: 'Exchange code for access token', isCompleted: false },
                    { text: 'Validate ID token and persist session', isCompleted: false }
                  ]).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="mt-0.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-colors cursor-pointer
                          ${item.isCompleted 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'border-gray-600 group-hover:border-blue-500'}`}
                        >
                          {item.isCompleted && <CheckSquare className="w-3 h-3" />}
                        </div>
                      </div>
                      <span className={`text-sm ${item.isCompleted ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                  
                  <button className="text-xs font-medium text-gray-500 hover:text-white transition-colors flex items-center gap-1 mt-4">
                    <Plus className="w-3 h-3" /> Add item
                  </button>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Activity</span>
                  <span>{selectedTask.assignedTo?.name?.split(' ')[0] || 'Unknown'} - 2h ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showNewIssue && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#111116] border border-white/10 rounded-2xl w-full max-w-lg p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white">Create New Issue</h2>
              <button onClick={() => setShowNewIssue(false)} className="text-gray-500 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-5">
              {formError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg">
                  {formError}
                </div>
              )}
              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Fix auth token refresh"
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Description</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="What needs to be done?"
                  rows={3}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    <option value="High">🔴 High</option>
                    <option value="Medium">🔵 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                  >
                    {STATUS_COLUMNS.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-400 mb-1.5 block">Assign To</label>
                <select
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                >
                  <option value="">Unassigned</option>
                  {workspaceUsers.map((u) => (
                    <option key={u._id} value={u._id}>{u.name} ({u.role})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !newTitle.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                {isSubmitting ? 'Creating...' : 'Create Issue'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
