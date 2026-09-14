import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FolderKanban, Users, MessageSquareText, CheckSquare, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectDetailsPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { projects, tasks } = useApp();

  const project = projects.find(p => p.id === Number(projectId)) || projects[0];
  const projectTasks = tasks.filter(t => t.projectId === project.id);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <button
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </button>

      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-outfit">{project.name}</h1>
              <p className="text-xs text-slate-400">Created on {project.createdAt}</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            {project.status}
          </span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
      </div>

      {/* Tabs / Feature Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Communication channels */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquareText className="w-4 h-4 text-brand-400" />
              <h3 className="font-bold text-slate-100 font-outfit">Channels ({project.channels.length})</h3>
            </div>
            <button onClick={() => navigate('/communication')} className="text-xs text-brand-400">
              Open
            </button>
          </div>
          <div className="space-y-2">
            {project.channels.map(c => (
              <div
                key={c.id}
                onClick={() => navigate(`/channels/${c.id}`)}
                className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-brand-500/30 cursor-pointer text-xs flex justify-between"
              >
                <span className="font-medium text-slate-200">#{c.name}</span>
                <span className="text-slate-400">{c.groups.length} groups</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks Summary */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-slate-100 font-outfit">Tasks ({projectTasks.length})</h3>
            </div>
            <button onClick={() => navigate('/tasks')} className="text-xs text-brand-400">
              Kanban
            </button>
          </div>
          <div className="space-y-2">
            {projectTasks.map(t => (
              <div key={t.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs flex justify-between">
                <span className="font-medium text-slate-200 truncate">{t.title}</span>
                <span className="text-slate-400 font-semibold">{t.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" />
              <h3 className="font-bold text-slate-100 font-outfit">Members ({project.members.length})</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {project.members.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60">
                <img src={m.avatarUrl} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                <div>
                  <p className="text-xs font-semibold text-slate-200">{m.name}</p>
                  <p className="text-[10px] text-slate-400">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
