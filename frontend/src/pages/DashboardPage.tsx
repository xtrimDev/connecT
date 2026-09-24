import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  MessageSquareText,
  CheckSquare,
  Sparkles,
  Bot,
  Users,
  Clock,
  FileText,
  Calendar,
  Github,
  Settings,
  Layers,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FeatureCard } from '../components/cards/FeatureCard';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser, activeProject, tasks, events, docs, aiMessages } = useApp();

  const pendingTasks = tasks.filter(t => t.status !== 'Completed');

  // List of all 8 core workspace features rendered as Cards
  const workspaceFeatures = [
    {
      title: 'Project Communication',
      category: 'Real-Time Channels',
      description: 'Dynamic channels (Development, Design, General) with customizable sub-team chat groups and member roles.',
      icon: MessageSquareText,
      badgeText: `${activeProject.channels.length} Channels`,
      badgeColor: 'bg-brand-500/20 text-brand-300 border-brand-500/30',
      stats: [
        { label: 'Channels', value: activeProject.channels.length },
        { label: 'Total Groups', value: activeProject.channels.reduce((acc, c) => acc + c.groups.length, 0) },
      ],
      actionText: 'Open Communication Hub',
      onClick: () => navigate('/communication'),
    },
    {
      title: 'Tasks',
      category: 'Task Management',
      description: 'Manage workspace tasks across To Do, In Progress, and Completed statuses with priority tags and assignees.',
      icon: CheckSquare,
      badgeText: `${pendingTasks.length} Pending`,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      stats: [
        { label: 'Pending Tasks', value: pendingTasks.length },
        { label: 'Total Tasks', value: tasks.length },
      ],
      actionText: 'View Tasks',
      onClick: () => navigate('/tasks'),
    },
    {
      title: 'AI Smart Assistant',
      category: 'Intelligence',
      description: 'Context-aware workspace AI assistant providing instant project summaries, task reports, and Express API code snippets.',
      icon: Bot,
      badgeText: 'AI Powered',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      stats: [
        { label: 'Assistant State', value: 'Active' },
        { label: 'Recent Response', value: aiMessages.length },
      ],
      actionText: 'Launch AI Assistant',
      onClick: () => navigate('/ai'),
    },
    {
      title: 'Document & Specs Library',
      category: 'Documentation',
      description: 'Central file repository for PDF architecture blueprints, Word specs, and JSON configuration files.',
      icon: FileText,
      badgeText: `${docs.length} Documents`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      stats: [
        { label: 'Uploaded Files', value: docs.length },
        { label: 'Storage Mode', value: 'Local State' },
      ],
      actionText: 'Open Documents',
      onClick: () => navigate('/documents'),
    },
    {
      title: 'Calendar & Meetings',
      category: 'Scheduling',
      description: 'Schedule sprint reviews, architecture demo sessions, and team huddles with attendee tracking.',
      icon: Calendar,
      badgeText: `${events.length} Upcoming`,
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      stats: [
        { label: 'Scheduled', value: events.length },
        { label: 'Next Meeting', value: events[0]?.date || 'Today' },
      ],
      actionText: 'View Calendar Schedule',
      onClick: () => navigate('/events'),
    },
    {
      title: 'GitHub Integration',
      category: 'Version Control',
      description: 'Connect repository branch activity, stars, forks, open issues, and recent commit history for xtrimDev/connecT.',
      icon: Github,
      badgeText: 'Connected',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
      stats: [
        { label: 'Repository', value: 'xtrimDev' },
        { label: 'Commits', value: '3 Recent' },
      ],
      actionText: 'View GitHub Dashboard',
      onClick: () => navigate('/github'),
    },
    {
      title: 'Workspace Projects',
      category: 'Projects Overview',
      description: 'Top-level workspace container managing multi-team progress, milestones, and member allocations.',
      icon: FolderKanban,
      badgeText: `${activeProject.progress}% Done`,
      badgeColor: 'bg-brand-500/20 text-brand-300 border-brand-500/30',
      stats: [
        { label: 'Project Name', value: activeProject.name.slice(0, 12) + '...' },
        { label: 'Members', value: activeProject.members.length },
      ],
      actionText: 'Explore All Projects',
      onClick: () => navigate('/projects'),
    },
    {
      title: 'Workspace Settings',
      category: 'Configuration',
      description: 'User profile preferences, notification rules, dark mode tokens, and API connection base URLs.',
      icon: Settings,
      badgeText: 'Configurable',
      badgeColor: 'bg-slate-700/40 text-slate-300 border-slate-600/40',
      stats: [
        { label: 'Active User', value: currentUser.name.split(' ')[0] },
        { label: 'Role', value: currentUser.role },
      ],
      actionText: 'Configure Settings',
      onClick: () => navigate('/settings'),
    },
  ];

  const metricCards = [
    { label: 'Project Completion', value: `${activeProject.progress}%`, icon: FolderKanban, color: 'brand', gradient: 'from-brand-500/20 to-indigo-500/10' },
    { label: 'Pending Tasks', value: pendingTasks.length, icon: CheckSquare, color: 'amber', gradient: 'from-amber-500/20 to-orange-500/10' },
    { label: 'Team Members', value: activeProject.members.length, icon: Users, color: 'emerald', gradient: 'from-emerald-500/20 to-teal-500/10' },
    { label: 'Upcoming Events', value: events.length, icon: Clock, color: 'indigo', gradient: 'from-indigo-500/20 to-purple-500/10' },
  ];

  const colorMap: Record<string, { icon: string; border: string; bg: string }> = {
    brand: { icon: 'text-brand-400', border: 'border-brand-500/20', bg: 'bg-brand-500/10' },
    amber: { icon: 'text-amber-400', border: 'border-amber-500/20', bg: 'bg-amber-500/10' },
    emerald: { icon: 'text-emerald-400', border: 'border-emerald-500/20', bg: 'bg-emerald-500/10' },
    indigo: { icon: 'text-indigo-400', border: 'border-indigo-500/20', bg: 'bg-indigo-500/10' },
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="glass-panel p-8 rounded-3xl relative overflow-hidden bg-gradient-to-r from-brand-900/50 via-slate-900 to-indigo-950/40 border border-brand-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 rounded-full filter blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-purple-500/5 rounded-full filter blur-[60px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-indigo-500/5 rounded-full filter blur-[50px] pointer-events-none animate-pulse-soft"></div>

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Feature Card Directory</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white font-outfit tracking-tight">
            Good Day, {currentUser.name} 👋
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm leading-relaxed">
            Welcome to <span className="text-brand-300 font-semibold">{activeProject.name}</span>. Every feature in the platform is organized into interactive cards below for quick access and control.
          </p>
        </div>
      </div>

      {/* Top Level Metric Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 stagger-children">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          const colors = colorMap[card.color];
          return (
            <div
              key={idx}
              className={`profile-stat-card p-5 rounded-2xl ${colors.border} animate-stagger-in`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-medium text-slate-400">{card.label}</p>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center ${colors.icon}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-white font-outfit counter-value">{card.value}</p>
              <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span>Active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Cards Grid (Each feature rendered as a Card) */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-400" />
            <h2 className="text-xl font-bold text-slate-100 font-outfit">Platform Features</h2>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Zap className="w-3.5 h-3.5 text-brand-400" />
            <span>Click any card to launch</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
          {workspaceFeatures.map((feat, idx) => (
            <FeatureCard
              key={idx}
              title={feat.title}
              category={feat.category}
              description={feat.description}
              icon={feat.icon}
              badgeText={feat.badgeText}
              badgeColor={feat.badgeColor}
              stats={feat.stats}
              actionText={feat.actionText}
              onClick={feat.onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
