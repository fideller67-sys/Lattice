import React, { useState, useEffect } from 'react';
import { Download, Search, Loader2 } from 'lucide-react';
import api from '../../config/api';

export default function DirectorAuditLogs() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const data = await api.get('/admin/audit-logs');
      setAuditLogs(data);
    } catch (err) {
      console.error('Failed to load audit logs', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    const csvRows = [
      ['Actor', 'Action', 'Context', 'Timestamp'],
      ...auditLogs.map(log => [
        log.actor,
        log.actionDescription,
        log.scopeContext,
        log.timestampLabel
      ])
    ];
    const csvString = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit_logs.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredLogs = auditLogs.filter(log => 
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.actionDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.scopeContext.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="text-gray-500 font-light">#</span> Audit Activity Logs
          </h1>
          <p className="text-xs text-gray-500 mt-1">Director-scoped structural system event streams.</p>
        </div>
        
        <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-[#111116] border border-white/10 hover:bg-white/5 text-white rounded-lg text-sm font-medium transition-colors">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Logs Container */}
      <div className="bg-[#111116] border border-white/5 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Recent Audit Activity</h2>
          
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border border-white/5 rounded-md pl-9 pr-4 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white/20 transition-colors w-48"
            />
          </div>
        </div>

        <div className="divide-y divide-white/5">
          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-10 text-center text-gray-500 text-sm">
              No audit logs found.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log._id} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-gray-300 flex-shrink-0 mt-0.5">
                    {log.actor.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">
                      <span className="font-bold text-white">{log.actor}</span> {log.actionDescription}
                    </div>
                    <div className="text-[10px] text-gray-500 font-medium tracking-wide uppercase mt-1">
                      {log.scopeContext}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-medium whitespace-nowrap ml-4 group-hover:text-gray-400 transition-colors">
                  {log.timestampLabel}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t border-white/5 flex justify-center">
          <button onClick={fetchLogs} className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors">
            Load More Events
          </button>
        </div>
      </div>
    </div>
  );
}
