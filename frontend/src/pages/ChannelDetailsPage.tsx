import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Hash, Plus, MessageSquareText, ArrowLeft } from 'lucide-react';
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <button
        onClick={() => navigate('/communication')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Communication Channels
      </button>

      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Hash className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-outfit">#{channel.name} Channel</h1>
            <p className="text-xs text-slate-400">{channel.description}</p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Group</span>
        </button>
      </div>

      {/* Render Dynamic Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channel.groups.map(group => (
          <div
            key={group.id}
            onClick={() => navigate(`/groups/${group.id}`)}
            className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/40 cursor-pointer transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-slate-100 font-outfit">{group.name}</h3>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 font-medium">
                  {group.messages.length} msgs
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{group.description || 'Dynamic sub-group'}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {group.users.map(u => (
                    <img
                      key={u.id}
                      src={u.avatarUrl}
                      alt={u.name}
                      title={u.name}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-slate-900"
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">{group.users.length} Members</span>
              </div>
              <span className="text-xs font-semibold text-brand-400 flex items-center gap-1">
                Open Chat <MessageSquareText className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      <CreateGroupModal channelId={channel.id} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
