import React, { useState, useEffect } from 'react';
import { ChevronDown, Code2, Loader2 } from 'lucide-react';
import api from '../../config/api';

export default function MyTasks({ title = "My Development Tasks" }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
    fetchTasks();
  }, []);

  const statusMapping = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'review': 'In Review',
    'done': 'Done',
    'on-hold': 'On Hold'
  };

  const getMappedStatus = (status) => statusMapping[status] || status;

  const todoTasks = tasks.filter(t => t.status === 'todo').map(t => ({ id: t._id.slice(-6).toUpperCase(), title: t.title, priority: t.priority || 'Medium', status: getMappedStatus(t.status) }));
  const activeTasks = tasks.filter(t => ['in-progress', 'review'].includes(t.status)).map(t => ({ id: t._id.slice(-6).toUpperCase(), title: t.title, priority: t.priority || 'Medium', status: getMappedStatus(t.status) }));
  const holdTasks = tasks.filter(t => t.status === 'on-hold').map(t => ({ id: t._id.slice(-6).toUpperCase(), title: t.title, priority: t.priority || 'Medium', status: getMappedStatus(t.status) }));

  const sections = [
    {
      title: 'TO DO THIS WEEK',
      count: todoTasks.length,
      tasks: todoTasks
    },
    {
      title: 'IN ACTIVE DEVELOPMENT & REVIEW',
      count: activeTasks.length,
      tasks: activeTasks
    },
    {
      title: 'ON HOLD',
      count: holdTasks.length,
      tasks: holdTasks
    }
  ];

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Medium': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusDisplay = (status) => {
    switch (status) {
      case 'To Do': return <span className="text-gray-400 font-medium">{status}</span>;
      case 'In Progress': return (
        <span className="flex items-center gap-1.5 text-blue-400 font-medium">
          <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeDasharray="30 30" strokeLinecap="round" opacity="0.3"/><path d="M12 2v10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>
          {status}
        </span>
      );
      case 'In Review': return (
        <span className="flex items-center gap-1.5 text-amber-400 font-medium">
          <div className="w-2 h-2 rounded-full bg-amber-400" />
          {status}
        </span>
      );
      case 'On Hold': return <span className="text-gray-500 font-medium">{status}</span>;
      default: return <span>{status}</span>;
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight mb-4">{title}</h1>
        <div className="flex gap-6 border-b border-white/10 text-sm font-medium">
          <button className="pb-3 text-white border-b-2 border-blue-500">Active Work</button>
          <button className="pb-3 text-gray-500 hover:text-gray-300">Upcoming Sprints</button>
          <button className="pb-3 text-gray-500 hover:text-gray-300">Completed</button>
          <button className="pb-3 text-gray-500 hover:text-gray-300">History Logs</button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        </div>
      ) : error ? (
        <div className="text-center text-red-400 p-8 border border-red-400/20 rounded-xl bg-red-400/10">
          {error}
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-gray-500 p-12 border border-white/10 rounded-xl border-dashed">
          <p>No tasks found in your workspace.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.filter(s => s.count > 0).map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center gap-2 mb-3 px-2">
                <ChevronDown className="w-4 h-4 text-gray-500" />
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{section.title}</h3>
                <span className="bg-white/5 text-gray-400 text-[10px] px-1.5 py-0.5 rounded-full">{section.count}</span>
              </div>
              
              <div className="space-y-2">
                {section.tasks.map((task) => (
                  <div 
                    key={task.id}
                    className="flex items-center justify-between p-3.5 bg-[#111116] border border-white/5 rounded-xl hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-400">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-gray-500 mr-3">T-{task.id}</span>
                        <span className="text-sm font-medium text-gray-200">{task.title}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                      </div>
                      
                      <div className="w-24 text-xs">
                        {getStatusDisplay(task.status)}
                      </div>
                      
                      <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium px-4 py-1.5 rounded-md transition-colors shadow-sm">
                        Open Branch
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
