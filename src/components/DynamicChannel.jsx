import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Terminal, Loader2, CheckCircle2, AlertCircle, Activity, Trash2 } from 'lucide-react';
import api from '../config/api';
import { useAuth } from '../context/AuthContext';

export default function DynamicChannel({ channelName, subtitle, systemLogMode = false }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchChannelAndMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, [channelName]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChannelAndMessages = async () => {
    setIsLoading(true);
    try {
      const channels = await api.get('/channels');
      const currentChannel = channels.find(c => c.name === channelName);
      if (currentChannel) {
        setChannel(currentChannel);
        await fetchMessages(currentChannel._id);
      }
    } catch (err) {
      console.error('Error fetching channel data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (cid) => {
    const targetChannelId = cid || channel?._id;
    if (!targetChannelId) return;
    try {
      const data = await api.get(`/channels/${targetChannelId}/messages`);
      setMessages(data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || !channel) return;

    try {
      const msg = await api.post(`/channels/${channel._id}/messages`, {
        text: inputText,
        type: 'chat'
      });
      setMessages(prev => [...prev, msg]);
      setInputText('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleDelete = async () => {
    if (!channel) return;
    if (window.confirm(`Are you sure you want to delete the #${channelName} channel?`)) {
      try {
        await api.delete(`/channels/${channel._id}`);
        navigate('/');
        window.location.reload();
      } catch (err) {
        console.error('Error deleting channel:', err);
      }
    }
  };

  const getMessageIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      case 'error': return <AlertCircle className="w-3.5 h-3.5 text-red-500" />;
      case 'info': return <Activity className="w-3.5 h-3.5 text-blue-500" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Channel not found. Ensure backend is seeded.
      </div>
    );
  }

  return (
    <div className="p-10 max-w-6xl mx-auto h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white tracking-tight"># {channelName}</h1>
          {subtitle && (
            <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {subtitle}
            </div>
          )}
        </div>
        <button 
          onClick={handleDelete}
          className="p-1.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors border border-red-500/20"
          title="Delete Channel"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {systemLogMode && (
        <div className="bg-[#0c0c10] border border-white/10 rounded-xl p-4 mb-8 font-mono text-xs overflow-hidden shrink-0">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/5 text-gray-500">
            <Terminal className="w-3.5 h-3.5" />
            system-out.log
          </div>
          <div className="space-y-1.5">
            <div><span className="text-blue-400">[INFO]</span> <span className="text-gray-300">Listening to channel events</span></div>
            <div><span className="text-emerald-500">[DONE]</span> <span className="text-gray-300">WebSocket connected</span></div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto mb-6 bg-[#111116] border border-white/5 rounded-xl p-6">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 text-sm mt-10">No messages yet. Start the conversation!</div>
          ) : (
            messages.map((msg) => {
              const isChat = msg.type === 'chat';
              const isMe = msg.sender?._id === user?._id;

              if (!isChat) {
                return (
                  <div key={msg._id} className="flex items-center justify-between p-3.5 bg-white/5 border border-white/5 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/20">
                        {getMessageIcon(msg.type)}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-gray-200">{msg.sender?.name || 'System'}</span>{' '}
                        <span className="text-gray-400">{msg.text}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              }

              return (
                <div key={msg._id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {msg.sender?.avatarInitials || msg.sender?.name?.charAt(0) || '?'}
                  </div>
                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-bold text-gray-300">{msg.sender?.name}</span>
                      <span className="text-[10px] text-gray-600">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`text-sm px-4 py-2.5 rounded-2xl max-w-xl ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="relative shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={`Message #${channelName}...`}
          className="w-full bg-[#111116] border border-white/10 rounded-xl pl-4 pr-12 py-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors shadow-lg"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
