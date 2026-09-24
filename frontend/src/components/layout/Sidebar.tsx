import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
  User,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeProject, currentUser } = useApp();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Profile', path: '/profile', icon: User },
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
    <aside className="w-64 h-screen bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/80 flex flex-col flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/20 animate-float">
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
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30 animate-pulse-soft">
            v1.0
          </span>
        </div>
      </div>

      {/* Nav Menu Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 stagger-children">
        {navItems.map(item => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/25 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 hover:translate-x-0.5'
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
      <div
        onClick={() => navigate('/profile')}
        className="p-4 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between cursor-pointer hover:bg-slate-900/80 transition-all duration-300 group"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center ring-2 ring-brand-500/50 group-hover:ring-brand-400/70 transition-all">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-2 border-slate-900 rounded-full ${currentUser.status === 'online' ? 'status-online' : currentUser.status === 'idle' ? 'status-idle' : 'status-offline'}`}></span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-slate-100 truncate group-hover:text-white transition-colors">{currentUser.name}</p>
            <p className="text-xs text-slate-400 truncate">{currentUser.role} / Lead</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
