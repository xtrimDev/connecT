import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hash, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CommunicationPage: React.FC = () => {
  const navigate = useNavigate();
  const { activeProject } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white font-outfit">Project Communication & Channels</h1>
        <p className="text-sm text-slate-400">
          Channels group real-time sub-teams and dynamic chat threads for {activeProject.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeProject.channels.map(channel => (
          <div
            key={channel.id}
            className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-brand-500/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                    <Hash className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-100 font-outfit">#{channel.name}</h2>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  {channel.groups.length} Groups
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">{channel.description}</p>

              {/* Dynamic Groups Preview */}
              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Dynamic Groups
                </div>
                {channel.groups.map(group => (
                  <div
                    key={group.id}
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/groups/${group.id}`);
                    }}
                    className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 hover:border-brand-500/40 cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <span className="font-semibold text-slate-200">{group.name}</span>
                    <div className="flex items-center gap-1 text-slate-400">
                      <Users className="w-3.5 h-3.5" />
                      <span>{group.users.length}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate(`/channels/${channel.id}`)}
              className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-brand-600/20 transition-all"
            >
              <span>Manage Channel Groups</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
