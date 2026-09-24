import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, ArrowRight, Users, Sparkles, Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, setActiveProjectById } = useApp();

  const statusColors: Record<string, string> = {
    Active: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'In Review': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Completed: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
    Planning: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/6 rounded-full filter blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Project Management</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-outfit tracking-tight">Workspace Projects</h1>
            <p className="text-sm text-slate-400 mt-1">Manage all active organization projects, progress, and members.</p>
          </div>
          <div className="glass-card px-5 py-3 rounded-2xl border border-slate-800 text-center">
            <p className="text-2xl font-extrabold text-white font-outfit counter-value">{projects.length}</p>
            <p className="text-xs text-slate-400 font-medium">Total Projects</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="channel-card p-6 rounded-2xl flex flex-col justify-between animate-stagger-in group"
          >
            {/* Ambient glow */}
            <div className="card-glow -top-8 -right-8 bg-brand-500/15"></div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                    <FolderKanban className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-100 font-outfit group-hover:text-white transition-colors">{project.name}</h2>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${statusColors[project.status] || statusColors.Active}`}>
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="space-y-2 mb-5">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Overall Progress</span>
                  <span className="text-brand-300">{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-950/60 rounded-full h-2 overflow-hidden border border-slate-800/60">
                  <div
                    className="bg-gradient-to-r from-brand-600 to-indigo-400 h-full rounded-full transition-all duration-700 animate-shimmer"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-400" />
                  <span>{project.channels.length} Channels</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.members.length} Members</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {project.members.map(member => (
                    <img
                      key={member.id}
                      src={member.avatarUrl}
                      alt={member.name}
                      title={member.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900 hover:ring-brand-500/40 hover:scale-110 transition-all duration-200 cursor-pointer"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveProjectById(project.id);
                  navigate(`/projects/${project.id}`);
                }}
                className="btn-primary flex items-center gap-1.5 text-xs py-2 px-4"
              >
                <span>Project Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
