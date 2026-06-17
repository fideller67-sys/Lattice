import React from 'react';
import { Code2 } from 'lucide-react';

export default function ProductCoreAuthRevamp() {
  const epicTasks = [
    {
      id: 'AUTH-201',
      title: 'Draft PRD for OAuth2 PKCE flow',
      priority: 'High',
      priorityColor: 'text-red-500',
      status: 'In Progress'
    },
    {
      id: 'AUTH-202',
      title: 'Audit session token security architecture',
      priority: 'Medium',
      priorityColor: 'text-blue-500',
      status: 'In Review'
    },
    {
      id: 'AUTH-203',
      title: 'Approve localized email template flows',
      priority: 'Low',
      priorityColor: 'text-emerald-500',
      status: 'To Do'
    },
    {
      id: 'AUTH-204',
      title: 'Review MFA enrollment user journey logs',
      priority: 'Medium',
      priorityColor: 'text-blue-500',
      status: 'To Do'
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
            <span>Projects</span> <span className="text-gray-600">/</span> <span>Strategic Roadmap</span>
          </div>
          <h1 className="text-2xl font-bold text-white">User Security & Authentication Epic Roadmap</h1>
        </div>
        
        <div className="flex items-center bg-[#111116] border border-white/5 rounded-lg p-1 w-fit">
          <button className="px-4 py-1.5 text-sm font-medium text-gray-400 hover:text-white transition-colors">Days</button>
          <button className="px-4 py-1.5 text-sm font-medium bg-white/10 text-white rounded-md">Weeks</button>
        </div>
      </div>

      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        
        <div className="bg-blue-900/20 border-b border-blue-500/20 p-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Code2 className="w-4 h-4" />
          </div>
          <h2 className="text-sm font-bold text-blue-400 tracking-widest uppercase">Epic: Enterprise Access Control</h2>
        </div>

        <div className="divide-y divide-white/5">
          {epicTasks.map((task, idx) => (
            <div key={idx} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-gray-500">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono text-gray-500">{task.id}</span>
                <span className="text-sm font-bold text-white">{task.title}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`text-xs font-bold ${task.priorityColor}`}>{task.priority}</span>
                <span className="px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 text-[10px] font-bold uppercase tracking-wider min-w-[100px] text-center">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
