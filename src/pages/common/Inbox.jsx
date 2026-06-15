import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Check, Trash2, Loader2, Bell } from 'lucide-react';
import api from '../../config/api';

export default function Inbox({ roleTitle = "Notification Inbox" }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      const data = await api.get('/notifications');
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await api.put(`/notifications/${id}/read`);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter(n => n._id !== id));
    } catch (error) {
      console.error('Failed to delete notification', error);
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'mention': return 'from-pink-500 to-rose-500';
      case 'task_assigned': return 'from-blue-500 to-indigo-500';
      case 'system_alert': return 'from-gray-500 to-gray-700';
      case 'project_update': return 'from-purple-500 to-fuchsia-500';
      case 'approval_needed': return 'from-orange-500 to-amber-500';
      default: return 'from-emerald-500 to-teal-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">{roleTitle}</h1>
          <p className="text-sm text-gray-500">{unreadCount} Unread Notifications</p>
        </div>
        
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-colors border border-white/10 shadow-sm flex items-center gap-2">
              <Check className="w-4 h-4" />
              Mark All Read
            </button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex justify-center p-10">
            <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center p-12 border border-white/5 border-dashed rounded-xl">
            <Bell className="w-8 h-8 text-gray-600 mx-auto mb-3" />
            <div className="text-gray-400 font-medium">You're all caught up!</div>
            <div className="text-gray-600 text-sm mt-1">No new notifications in your inbox.</div>
          </div>
        ) : (
          notifications.map((notif) => (
            <div 
              key={notif._id} 
              className={`group flex items-center justify-between p-4 bg-[#111116] border ${notif.isRead ? 'border-white/5' : 'border-blue-500/30'} rounded-xl hover:border-white/20 transition-colors`}
            >
              <div className="flex items-center gap-4 flex-1 cursor-pointer" onClick={() => markAsRead(notif._id)}>
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getIconColor(notif.type)} flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-sm shrink-0`}>
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                
                <div className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{notif.title}</span>
                    {!notif.isRead && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                  </div>
                  <div className={`mt-0.5 ${notif.isRead ? 'text-gray-500' : 'text-gray-300'}`}>
                    {notif.message}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs text-gray-500">
                  {new Date(notif.createdAt).toLocaleDateString()} {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notif.isRead && (
                    <button onClick={() => markAsRead(notif._id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Mark Read">
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => deleteNotification(notif._id)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-gray-400 hover:text-red-400 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {notif.actionUrl && (
                    <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/5 text-blue-500 transition-colors" title="View Action">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
