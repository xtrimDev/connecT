import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, Users, ArrowLeft, MessageSquare, ShieldCheck } from 'lucide-react';
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
      <div className="space-y-4">
        <p className="text-slate-400">Group thread not found.</p>
        <button onClick={() => navigate('/communication')} className="text-brand-400 text-xs font-semibold">
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
      <div className="glass-panel px-6 py-4 rounded-2xl border border-slate-800 flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 hover:text-slate-200">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-brand-400 font-semibold">#{parentChannel.name}</span>
              <span className="text-slate-600">•</span>
              <h2 className="text-lg font-bold text-slate-100 font-outfit">{foundGroup.name}</h2>
            </div>
            <p className="text-xs text-slate-400">{foundGroup.description || 'Team chat stream'}</p>
          </div>
        </div>

        {/* Member Avatars */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {foundGroup.users.map((u: any) => (
              <img
                key={u.id}
                src={u.avatarUrl}
                alt={u.name}
                title={u.name}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900"
              />
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium pl-1">{foundGroup.users.length} Members</span>
        </div>
      </div>

      {/* Chat Area + Sidebar */}
      <div className="flex-1 flex gap-6 min-h-0 overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 glass-card rounded-2xl border border-slate-800 flex flex-col min-h-0 overflow-hidden">
          {/* Scrollable Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {foundGroup.messages.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                No messages yet. Start the discussion!
              </div>
            ) : (
              foundGroup.messages.map((msg: any) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex items-start gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                    <img
                      src={msg.senderAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={msg.senderName}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
                    />
                    <div className={`max-w-md ${isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`flex items-center gap-2 mb-1 text-[11px] ${isMe ? 'justify-end' : ''}`}>
                        <span className="font-semibold text-slate-300">{msg.senderName}</span>
                        <span className="text-slate-500">{msg.createdAt}</span>
                      </div>
                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                          isMe
                            ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white rounded-tr-none shadow-md shadow-brand-600/20'
                            : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
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
          <div className="p-4 border-t border-slate-800 bg-slate-950/60">
            <div className="relative flex items-center">
              <textarea
                rows={1}
                value={inputContent}
                onChange={e => setInputContent(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Message #${foundGroup.name} (Press Enter to send, Shift+Enter for new line)...`}
                className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none resize-none"
              />
              <button
                onClick={handleSend}
                className="absolute right-2 p-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Members Sidebar */}
        <div className="hidden lg:block w-64 glass-card rounded-2xl border border-slate-800 p-5 space-y-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
            <Users className="w-4 h-4 text-brand-400" />
            <span>Group Members</span>
          </div>
          <div className="space-y-3">
            {foundGroup.users.map((member: any) => (
              <div key={member.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                <img src={member.avatarUrl} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-slate-200 truncate">{member.name}</p>
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
