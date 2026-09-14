import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, setActiveProjectById } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit">Workspace Projects</h1>
          <p className="text-sm text-slate-400">Manage all active organization projects, progress, and members.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map(project => (
          <div
            key={project.id}
            className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-brand-400" />
                  <h2 className="text-lg font-bold text-slate-100 font-outfit">{project.name}</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 font-medium border border-brand-500/30">
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{project.description}</p>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-400">
                  <span>Overall Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-brand-600 to-indigo-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {project.members.map(member => (
                    <img
                      key={member.id}
                      src={member.avatarUrl}
                      alt={member.name}
                      title={member.name}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900"
                    />
                  ))}
                </div>
                <span className="text-xs text-slate-400">{project.members.length} Members</span>
              </div>

              <button
                onClick={() => {
                  setActiveProjectById(project.id);
                  navigate(`/projects/${project.id}`);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
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
