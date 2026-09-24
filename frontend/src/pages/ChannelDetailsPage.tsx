import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Hash, Plus, MessageSquareText, ArrowLeft, Users, Activity, Zap, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreateGroupModal } from '../components/channel/CreateGroupModal';

export const ChannelDetailsPage: React.FC = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const navigate = useNavigate();
  const { activeProject } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const channel = activeProject.channels.find(c => c.id === Number(channelId)) || activeProject.channels[0];

  if (!channel) {
    return <div className="text-slate-400">Channel not found.</div>;
  }

  const groupGlowColors = [
    { glow: 'bg-brand-500/15', iconBg: 'from-brand-500 to-indigo-500', dot: 'bg-brand-400' },
    { glow: 'bg-purple-500/15', iconBg: 'from-purple-500 to-pink-500', dot: 'bg-purple-400' },
    { glow: 'bg-emerald-500/15', iconBg: 'from-emerald-500 to-teal-500', dot: 'bg-emerald-400' },
    { glow: 'bg-amber-500/15', iconBg: 'from-amber-500 to-orange-500', dot: 'bg-amber-400' },
    { glow: 'bg-sky-500/15', iconBg: 'from-sky-500 to-cyan-500', dot: 'bg-sky-400' },
    { glow: 'bg-rose-500/15', iconBg: 'from-rose-500 to-red-500', dot: 'bg-rose-400' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Back Navigation */}
      <button
        onClick={() => navigate('/communication')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Communication Channels
      </button>

      {/* Channel Header */}
      <div className="glass-panel p-6 md:p-8 rounded-3xl border border-brand-500/15 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-brand-500/8 rounded-full filter blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full filter blur-[60px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-brand-500/20 animate-scale-in">
              <Hash className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-[10px] font-semibold">
                  <Activity className="w-3 h-3" />
                  {channel.groups.length} Active Groups
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white font-outfit tracking-tight">#{channel.name} Channel</h1>
              <p className="text-sm text-slate-400 mt-1">{channel.description}</p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
        {channel.groups.map((group, idx) => {
          const colorScheme = groupGlowColors[idx % groupGlowColors.length];

          return (
            <div
              key={group.id}
              onClick={() => navigate(`/groups/${group.id}`)}
              className="channel-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between animate-stagger-in group"
            >
              {/* Ambient glow */}
              <div className={`card-glow -top-6 -right-6 ${colorScheme.glow}`}></div>

              <div>
                {/* Group Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${colorScheme.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <MessageSquareText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-100 font-outfit group-hover:text-white transition-colors">
                      {group.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${colorScheme.dot} animate-pulse-soft`}></div>
                    <span className="text-[10px] text-slate-500 font-medium">Live</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {group.description || 'Dynamic sub-group'}
                </p>

                {/* Message count preview */}
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                  <div className="flex items-center gap-1.5">
                    <MessageSquareText className="w-3.5 h-3.5" />
                    <span>{group.messages.length} messages</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Created {group.createdAt}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {group.users.map(u => (
                      <img
                        key={u.id}
                        src={u.avatarUrl}
                        alt={u.name}
                        title={u.name}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900 group-hover:ring-brand-900/50 transition-all"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{group.users.length} Members</span>
                </div>
                <span className="text-xs font-semibold text-brand-400 flex items-center gap-1 group-hover:text-brand-300 transition-colors">
                  Open Chat
                  <MessageSquareText className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <CreateGroupModal channelId={channel.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
