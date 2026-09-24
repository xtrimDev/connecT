import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, Users, ArrowRight, MessageSquareText, Sparkles, Activity, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CommunicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProject } = useApp();

  const channelGlowColors = [
    { glow: 'bg-brand-500/20', accent: 'from-brand-500 to-indigo-500', badge: 'bg-brand-500/15 text-brand-300 border-brand-500/30' },
    { glow: 'bg-purple-500/20', accent: 'from-purple-500 to-pink-500', badge: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
    { glow: 'bg-emerald-500/20', accent: 'from-emerald-500 to-teal-500', badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
    { glow: 'bg-amber-500/20', accent: 'from-amber-500 to-orange-500', badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fade-in">
      {/* Hero Header */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden border border-brand-500/20">
        <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/8 rounded-full filter blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/6 rounded-full filter blur-[60px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Communication</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white font-outfit tracking-tight">
              Project Channels
            </h1>
            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              Channels group real-time sub-teams and dynamic chat threads for{' '}
              <span className="text-brand-300 font-semibold">{activeProject.name}</span>. 
              Each channel contains dynamic groups for focused discussions.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="glass-card px-5 py-3 rounded-2xl border border-slate-800 text-center">
              <p className="text-2xl font-extrabold text-white font-outfit counter-value">{activeProject.channels.length}</p>
              <p className="text-xs text-slate-400 font-medium">Channels</p>
            </div>
            <div className="glass-card px-5 py-3 rounded-2xl border border-slate-800 text-center">
              <p className="text-2xl font-extrabold text-white font-outfit counter-value">
                {activeProject.channels.reduce((acc, c) => acc + c.groups.length, 0)}
              </p>
              <p className="text-xs text-slate-400 font-medium">Groups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        {activeProject.channels.map((channel, idx) => {
          const colorScheme = channelGlowColors[idx % channelGlowColors.length];
          const totalMessages = channel.groups.reduce((acc, g) => acc + g.messages.length, 0);

          return (
            <div
              key={channel.id}
              className="channel-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between animate-stagger-in group"
              onClick={() => navigate(`/channels/${channel.id}`)}
            >
              {/* Ambient glow */}
              <div className={`card-glow -top-8 -right-8 ${colorScheme.glow}`}></div>

              <div>
                {/* Channel Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorScheme.accent} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-brand-500/30 transition-all duration-300`}>
                      <Hash className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-100 font-outfit group-hover:text-white transition-colors">
                        #{channel.name}
                      </h2>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colorScheme.badge}`}>
                          {channel.groups.length} Groups
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Live activity indicator */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-soft"></div>
                    <span className="text-[10px] text-slate-400 font-medium">Active</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-5">{channel.description}</p>

                {/* Dynamic Groups Preview */}
                <div className="space-y-2 mb-5">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-brand-400" />
                    Dynamic Groups
                  </div>
                  {channel.groups.map(group => (
                    <div
                      key={group.id}
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/groups/${group.id}`);
                      }}
                      className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-brand-500/30 hover:bg-slate-900/80 cursor-pointer flex items-center justify-between text-xs transition-all duration-300 group/item"
                    >
                      <div className="flex items-center gap-2.5">
                        <MessageSquareText className="w-3.5 h-3.5 text-slate-500 group-hover/item:text-brand-400 transition-colors" />
                        <span className="font-semibold text-slate-200 group-hover/item:text-white transition-colors">{group.name}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{group.users.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquareText className="w-3 h-3" />
                          <span>{group.messages.length}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel Footer */}
              <div className="pt-4 border-t border-slate-800/60">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Activity className="w-3 h-3" />
                    <span>{totalMessages} messages</span>
                  </div>
                  <div className="flex -space-x-2">
                    {channel.groups
                      .flatMap(g => g.users)
                      .filter((u, i, arr) => arr.findIndex(x => x.id === u.id) === i)
                      .slice(0, 4)
                      .map(u => (
                        <img
                          key={u.id}
                          src={u.avatarUrl}
                          alt={u.name}
                          className="w-6 h-6 rounded-full object-cover ring-2 ring-slate-900"
                        />
                      ))}
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 hover:shadow-brand-500/30 transition-all duration-300 group-hover:shadow-xl">
                  <span>Manage Channel Groups</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
