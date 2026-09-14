import React from 'react';
import { Github, GitBranch, GitCommit, Star, GitFork, AlertCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GitHubPage: React.FC = () => {
  const { githubRepo } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Repo Header */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-white">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white font-outfit">{githubRepo.name}</h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-400">Public Organization Repository • Main Branch</p>
          </div>
        </div>

        <a
          href={githubRepo.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
        >
          <span>View on GitHub</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <Star className="w-5 h-5 text-amber-400" />
          <div>
            <p className="text-xs text-slate-400">Stars</p>
            <p className="text-lg font-bold text-slate-100 font-outfit">{githubRepo.stars}</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <GitFork className="w-5 h-5 text-brand-400" />
          <div>
            <p className="text-xs text-slate-400">Forks</p>
            <p className="text-lg font-bold text-slate-100 font-outfit">{githubRepo.forks}</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <GitBranch className="w-5 h-5 text-indigo-400" />
          <div>
            <p className="text-xs text-slate-400">Branches</p>
            <p className="text-lg font-bold text-slate-100 font-outfit">{githubRepo.branches.length}</p>
          </div>
        </div>
        <div className="glass-card p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400" />
          <div>
            <p className="text-xs text-slate-400">Open Issues</p>
            <p className="text-lg font-bold text-slate-100 font-outfit">{githubRepo.openIssues}</p>
          </div>
        </div>
      </div>

      {/* Commits Activity */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 font-bold text-slate-100 font-outfit text-lg">
          <GitCommit className="w-5 h-5 text-brand-400" />
          <span>Recent Commits Activity</span>
        </div>

        <div className="space-y-3">
          {githubRepo.recentCommits.map(commit => (
            <div
              key={commit.id}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <img src={commit.avatar} alt={commit.author} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-200">{commit.message}</h4>
                  <p className="text-xs text-slate-400">
                    {commit.author} • committed {commit.timestamp}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded-md bg-slate-950 border border-slate-800 text-brand-300">
                  {commit.sha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
