import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  MessageSquareText,
  CheckSquare,
  FileText,
  Calendar,
  Github,
  Bot,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeProject } = useApp();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/projects', icon: FolderKanban },
    { label: 'Communication', path: '/communication', icon: MessageSquareText },
    { label: 'Tasks', path: '/tasks', icon: CheckSquare },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'Events & Schedule', path: '/events', icon: Calendar },
    { label: 'GitHub Repository', path: '/github', icon: Github },
    { label: 'AI Assistant', path: '/ai', icon: Bot, badge: 'AI' },
    { label: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800/80 flex flex-col flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide font-outfit">
            Connec<span className="text-brand-400">T</span>
          </h1>
          <p className="text-xs text-slate-400">Workspace Hub</p>
        </div>
      </div>

      {/* Active Project Card Pill */}
      <div className="px-4 py-3 border-b border-slate-800/60 bg-slate-950/40">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Active Workspace</div>
        <div className="flex items-center justify-between text-sm font-medium text-slate-200">
          <span className="truncate">{activeProject.name}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30">
            v1.0
          </span>
        </div>
      </div>

      {/* Nav Menu Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-md shadow-brand-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-400/20 text-brand-300 border border-brand-400/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer User Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
              alt="Aman Kukreti"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/50"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full"></span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-100 truncate">Aman Kukreti</p>
            <p className="text-xs text-slate-400 truncate">Admin / Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
