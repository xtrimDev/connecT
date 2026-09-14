import React from 'react';
import { Search, Bell, Layers } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TopNavbar: React.FC = () => {
  const { searchQuery, setSearchQuery, projects, activeProject, setActiveProjectById } = useApp();

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Search Input */}
      <div className="relative w-96">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Search projects, channels, tasks, documents..."
          className="w-full bg-slate-950/60 border border-slate-800 focus:border-brand-500 rounded-xl pl-10 pr-4 py-1.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Workspace Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-1.5 text-xs text-slate-300">
          <Layers className="w-3.5 h-3.5 text-brand-400" />
          <select
            value={activeProject.id}
            onChange={e => setActiveProjectById(Number(e.target.value))}
            className="bg-transparent outline-none cursor-pointer font-medium text-slate-200"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id} className="bg-slate-900 text-slate-100">
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500"></span>
        </button>
      </div>
    </header>
  );
};
