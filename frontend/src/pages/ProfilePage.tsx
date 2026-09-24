import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Shield,
  FolderKanban,
  CheckSquare,
  MessageSquareText,
  Hash,
  Clock,
  Calendar,
  Edit3,
  Save,
  X,
  Activity,
  TrendingUp,
  Sparkles,
  ChevronRight,
  FileText,
  Users,
  Zap,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, activeProject, tasks, docs, events } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editEmail, setEditEmail] = useState(currentUser.email);
  const [editBio, setEditBio] = useState(
    'Full-stack developer passionate about building real-time collaboration platforms. Expertise in React, TypeScript, and Node.js architecture.'
  );

  const myTasks = tasks.filter(t => t.assigneeId === currentUser.id);
  const completedTasks = myTasks.filter(t => t.status === 'Completed');
  const inProgressTasks = myTasks.filter(t => t.status === 'In Progress');
  const totalChannels = activeProject.channels.length;
  const totalGroups = activeProject.channels.reduce((acc, c) => acc + c.groups.length, 0);

  const stats = [
    {
      label: 'Projects',
      value: 2,
      icon: FolderKanban,
      color: 'from-brand-500/20 to-indigo-500/10',
      iconColor: 'text-brand-400',
      borderColor: 'border-brand-500/20',
    },
    {
      label: 'Tasks Completed',
      value: completedTasks.length,
      icon: CheckSquare,
      color: 'from-emerald-500/20 to-green-500/10',
      iconColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/20',
    },
    {
      label: 'Channels',
      value: totalChannels,
      icon: Hash,
      color: 'from-purple-500/20 to-violet-500/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/20',
    },
    {
      label: 'Groups',
      value: totalGroups,
      icon: Users,
      color: 'from-amber-500/20 to-orange-500/10',
      iconColor: 'text-amber-400',
      borderColor: 'border-amber-500/20',
    },
  ];

  const activityTimeline = [
    {
      action: 'Completed task',
      target: 'Decouple Frontend and Backend Folders',
      time: '2 hours ago',
      icon: CheckSquare,
      color: 'text-emerald-400',
    },
    {
      action: 'Sent message in',
      target: '#Development > Frontend',
      time: '4 hours ago',
      icon: MessageSquareText,
      color: 'text-brand-400',
    },
    {
      action: 'Uploaded document',
      target: 'ConnecT Architecture Blueprint.pdf',
      time: '1 day ago',
      icon: FileText,
      color: 'text-sky-400',
    },
    {
      action: 'Created group',
      target: 'DevOps in Development Channel',
      time: '2 days ago',
      icon: Users,
      color: 'text-purple-400',
    },
    {
      action: 'Scheduled event',
      target: 'Sprint Demo & Architecture Review',
      time: '3 days ago',
      icon: Calendar,
      color: 'text-amber-400',
    },
    {
      action: 'Joined project',
      target: 'AI Smart Assistant Engine',
      time: '5 days ago',
      icon: Zap,
      color: 'text-indigo-400',
    },
  ];

  // Contribution graph data (mock — 7 weeks × 7 days)
  const weeks = 12;
  const contributions = Array.from({ length: weeks * 7 }, (_, i) => {
    const rand = Math.random();
    if (rand > 0.75) return 3;
    if (rand > 0.5) return 2;
    if (rand > 0.25) return 1;
    return 0;
  });
  const contribColors = [
    'bg-slate-800/60',
    'bg-brand-500/25',
    'bg-brand-500/50',
    'bg-brand-500/80',
  ];

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Profile Hero Banner */}
      <div className="glass-panel rounded-3xl relative overflow-hidden border border-brand-500/20">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-brand-500/10 rounded-full filter blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/8 rounded-full filter blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/5 rounded-full filter blur-[60px] pointer-events-none animate-pulse-soft"></div>

        <div className="relative z-10 p-8 flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* User icon circle */}
          <div className="relative flex-shrink-0">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-xl shadow-brand-500/20 animate-scale-in">
              <User className="w-12 h-12 text-white" />
            </div>
            <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-3 border-slate-900 ${currentUser.status === 'online' ? 'status-online' : currentUser.status === 'idle' ? 'status-idle' : 'status-offline'}`}></span>
          </div>

          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
                <Shield className="w-3 h-3" />
                {currentUser.role}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-300 text-xs font-semibold">
                <Activity className="w-3 h-3" />
                {currentUser.status === 'online' ? 'Online' : currentUser.status === 'idle' ? 'Away' : 'Offline'}
              </span>
            </div>

            {isEditing ? (
              <div className="space-y-3 mt-3 animate-fade-in">
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="bg-slate-900/80 border border-slate-700 focus:border-brand-500 rounded-xl px-4 py-2.5 text-xl font-bold text-white outline-none input-glow w-full max-w-md transition-all"
                  placeholder="Display Name"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  className="bg-slate-900/80 border border-slate-700 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-200 outline-none input-glow w-full max-w-md transition-all"
                  placeholder="Email Address"
                />
                <textarea
                  value={editBio}
                  onChange={e => setEditBio(e.target.value)}
                  rows={2}
                  className="bg-slate-900/80 border border-slate-700 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-200 outline-none input-glow w-full max-w-lg transition-all resize-none"
                  placeholder="Bio..."
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex items-center gap-2 text-xs"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white font-outfit mt-2 tracking-tight">
                  {editName}
                </h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    {editEmail}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Joined Jan 2026
                  </span>
                </div>
                <p className="text-sm text-slate-300 mt-3 max-w-2xl leading-relaxed">{editBio}</p>
              </>
            )}
          </div>

          {/* Edit Button */}
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-brand-500/40 text-slate-300 hover:text-white text-xs font-semibold transition-all duration-300"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 stagger-children">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`profile-stat-card p-5 rounded-2xl ${stat.borderColor} animate-stagger-in`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center ${stat.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <TrendingUp className="w-4 h-4 text-slate-600" />
              </div>
              <p className="text-3xl font-extrabold text-white font-outfit counter-value">
                {stat.value}
              </p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Timeline — spans 2 columns */}
        <div className="lg:col-span-2 glass-card rounded-2xl border border-slate-800 p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-brand-400" />
              <h2 className="text-xl font-bold text-slate-100 font-outfit">Recent Activity</h2>
            </div>
            <span className="text-xs text-slate-400 font-medium">Last 7 days</span>
          </div>

          <div className="space-y-5">
            {activityTimeline.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="activity-item py-2 animate-stagger-in" style={{ animationDelay: `${idx * 80}ms` }}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-200">
                        <span className="text-slate-400">{item.action}</span>{' '}
                        <span className="font-semibold text-slate-100">{item.target}</span>
                      </p>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-lg bg-slate-800/60 border border-slate-700/40 flex items-center justify-center flex-shrink-0 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 animate-slide-in-right">
            <h3 className="text-lg font-bold text-slate-100 font-outfit mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: 'View My Tasks', path: '/tasks', icon: CheckSquare, color: 'text-brand-400' },
                { label: 'Open Communication', path: '/communication', icon: MessageSquareText, color: 'text-purple-400' },
                { label: 'Manage Settings', path: '/settings', icon: Star, color: 'text-amber-400' },
                { label: 'View Documents', path: '/documents', icon: FileText, color: 'text-emerald-400' },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => navigate(action.path)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-brand-500/30 hover:bg-slate-900/80 text-sm text-slate-300 hover:text-white font-medium transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${action.color}`} />
                      <span>{action.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Task Breakdown */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 animate-slide-in-right" style={{ animationDelay: '150ms' }}>
            <h3 className="text-lg font-bold text-slate-100 font-outfit mb-4 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-brand-400" />
              Task Breakdown
            </h3>
            <div className="space-y-3">
              {[
                { label: 'To Do', count: myTasks.filter(t => t.status === 'To Do').length, color: 'bg-slate-500', barColor: 'bg-slate-500' },
                { label: 'In Progress', count: inProgressTasks.length, color: 'bg-amber-500', barColor: 'bg-amber-500' },
                { label: 'Completed', count: completedTasks.length, color: 'bg-emerald-500', barColor: 'bg-emerald-500' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400 font-medium">{item.label}</span>
                    <span className="text-slate-200 font-bold">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`${item.barColor} h-full rounded-full transition-all duration-700`}
                      style={{ width: `${myTasks.length > 0 ? (item.count / myTasks.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Workspace */}
          <div className="glass-card rounded-2xl border border-slate-800 p-6 animate-slide-in-right" style={{ animationDelay: '300ms' }}>
            <h3 className="text-lg font-bold text-slate-100 font-outfit mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-400" />
              Active Workspace
            </h3>
            <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800/60">
              <div className="flex items-center gap-2 mb-2">
                <FolderKanban className="w-4 h-4 text-brand-400" />
                <span className="text-sm font-semibold text-slate-100">{activeProject.name}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">{activeProject.description.slice(0, 100)}...</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Progress</span>
                <span className="text-brand-300 font-bold">{activeProject.progress}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mt-1.5 border border-slate-800/60">
                <div
                  className="bg-gradient-to-r from-brand-600 to-indigo-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${activeProject.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="glass-card rounded-2xl border border-slate-800 p-6 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-bold text-slate-100 font-outfit">Contribution Activity</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Less</span>
            {contribColors.map((c, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${c}`}></div>
            ))}
            <span>More</span>
          </div>
        </div>
        <div className="flex gap-1 overflow-x-auto pb-2">
          {Array.from({ length: weeks }, (_, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {Array.from({ length: 7 }, (_, dayIdx) => {
                const idx = weekIdx * 7 + dayIdx;
                const level = contributions[idx] || 0;
                return (
                  <div
                    key={dayIdx}
                    className={`w-3.5 h-3.5 rounded-sm ${contribColors[level]} transition-all duration-200 hover:ring-1 hover:ring-brand-400/50 cursor-pointer`}
                    title={`${level} contributions`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
