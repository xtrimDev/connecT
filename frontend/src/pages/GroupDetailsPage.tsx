import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Users, ArrowLeft, MessageSquare, ShieldCheck, Hash, Activity, Smile } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GroupDetailsPage: React.FC = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const { currentUser, activeProject, postMessage } = useApp();
  const [inputContent, setInputContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Find target group across active channels
  let foundGroup: any = null;
  let parentChannel: any = null;

  for (const channel of activeProject.channels) {
    const g = channel.groups.find(item => item.id === Number(groupId));
    if (g) {
      foundGroup = g;
      parentChannel = channel;
      break;
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [foundGroup?.messages]);

  if (!foundGroup) {
    return (
      <div className="space-y-4 animate-fade-in">
        <p className="text-slate-400">Group thread not found.</p>
        <button onClick={() => navigate('/communication')} className="text-brand-400 text-xs font-semibold hover:text-brand-300 transition-colors">
          Return to Communication
        </button>
      </div>
    );
  }

  const handleSend = () => {
    if (!inputContent.trim()) return;
    postMessage(foundGroup.id, inputContent.trim());
    setInputContent('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-7xl mx-auto animate-fade-in">
      {/* Top Bar */}
      <div className="glass-panel px-6 py-4 rounded-2xl border border-slate-800/60 flex items-center justify-between mb-4 flex-shrink-0 animate-fade-in-down">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-200 hover:-translate-x-0.5 transition-all">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Hash className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-400 font-semibold">#{parentChannel.name}</span>
              <span className="text-slate-600">•</span>
              <h2 className="text-lg font-bold text-slate-100 font-outfit">{foundGroup.name}</h2>
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400">{foundGroup.description || 'Team chat stream'}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft"></div>
                <span className="text-[10px] text-slate-500">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/40 text-xs text-slate-400">
            <Activity className="w-3 h-3 text-brand-400" />
            <span>{foundGroup.messages.length} msgs</span>
          </div>
          <div className="flex -space-x-2">
            {foundGroup.users.map((u: any) => (
              <img
                key={u.id}
                src={u.avatarUrl}
                alt={u.name}
                title={u.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900 hover:ring-brand-500/50 hover:scale-110 transition-all duration-200 cursor-pointer"
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium pl-1">{foundGroup.users.length} Members</span>
        </div>
      </div>

      {/* Chat Area + Sidebar */}
      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 glass-card rounded-2xl border border-slate-800/60 flex flex-col min-h-0 overflow-hidden">
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {foundGroup.messages.length === 0 ? (
              <div className="text-center py-16 text-slate-500 text-xs animate-fade-in">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/40 border border-slate-700/40 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-sm font-medium text-slate-400">No messages yet</p>
                <p className="text-xs text-slate-500 mt-1">Start the conversation!</p>
              </div>
            ) : (
              foundGroup.messages.map((msg: any, idx: number) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 animate-fade-in-up ${isMe ? 'flex-row-reverse' : ''}`}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <img
                      src={msg.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5 ring-2 ring-slate-800"
                    />
                    <div className={`max-w-md ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`flex items-center gap-2 mb-1 text-[11px] ${isMe ? 'justify-end' : ''}`}>
                        <span className="font-semibold text-slate-300">{msg.senderName}</span>
                        <span className="text-slate-500">{msg.createdAt}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed transition-all duration-200 hover:shadow-lg ${
                          isMe
                            ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-tr-md shadow-md shadow-brand-600/20 hover:shadow-brand-500/30'
                            : 'bg-slate-900/80 text-slate-200 border border-slate-800/60 rounded-tl-md hover:border-slate-700/60'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-slate-800/60 bg-slate-950/40 backdrop-blur-sm">
            <div className="relative flex items-center">
              <textarea
                rows={1}
                value={inputContent}
                onChange={e => setInputContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${foundGroup.name}...`}
                className="w-full bg-slate-900/80 border border-slate-800/60 focus:border-brand-500 rounded-xl pl-4 pr-14 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none input-glow transition-all duration-300"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button className="p-2 rounded-lg text-slate-500 hover:text-slate-300 transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSend}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    inputContent.trim()
                      ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Members Sidebar */}
        <div className="hidden lg:block w-64 glass-card rounded-2xl border border-slate-800/60 p-5 space-y-4 overflow-y-auto animate-slide-in-right">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Users className="w-4 h-4 text-brand-400" />
            <span>Group Members</span>
          </div>
          <div className="space-y-2 stagger-children">
            {foundGroup.users.map((member: any, idx: number) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/40 border border-slate-800/40 hover:border-brand-500/20 hover:bg-slate-900/60 transition-all duration-300 animate-stagger-in group cursor-pointer"
              >
                <div className="relative">
                  <img src={member.avatarUrl} alt={member.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-slate-800 group-hover:ring-brand-500/30 transition-all" />
                  <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${member.status === 'online' ? 'status-online' : member.status === 'idle' ? 'status-idle' : 'status-offline'}`}></span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-slate-200 truncate group-hover:text-white transition-colors">{member.name}</p>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-brand-400" />
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
