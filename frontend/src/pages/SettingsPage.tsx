import React, { useState } from 'react';
import { User, Bell, Palette, Shield, Check, Sparkles, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'workspace'>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: 'profile' as const, label: 'User Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'appearance' as const, label: 'Appearance', icon: Palette },
    { id: 'workspace' as const, label: 'Workspace API', icon: Shield },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/6 rounded-full filter blur-[60px] pointer-events-none"></div>
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Configuration</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white font-outfit tracking-tight">Workspace & User Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Configure your profile, notifications, appearance, and API connections.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="glass-card p-3 rounded-2xl border border-slate-800 space-y-1 animate-slide-in-left">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-lg shadow-brand-600/20 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 hover:translate-x-0.5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-slate-800 space-y-6 animate-fade-in-up">
          {activeTab === 'profile' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800/60 pb-3">
                User Profile Settings
              </h2>
              <div className="flex items-center gap-4 py-2">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100 text-lg">{currentUser.name}</h3>
                  <p className="text-xs text-slate-400">{currentUser.role} • {currentUser.email}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full bg-slate-900/80 border border-slate-800/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none input-glow transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full bg-slate-900/80 border border-slate-800/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none input-glow transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800/60 pb-3">
                Notification Preferences
              </h2>
              <div className="space-y-3 text-xs stagger-children">
                {[
                  'New Message Notifications in Channels',
                  'Task Priority Assignment Alerts',
                  'AI Assistant Task Reminders',
                ].map((label, idx) => (
                  <label
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 cursor-pointer hover:border-brand-500/20 transition-all duration-300 animate-stagger-in"
                  >
                    <span className="text-slate-200">{label}</span>
                    <input type="checkbox" defaultChecked className="accent-brand-500 w-4 h-4" />
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800/60 pb-3">
                Appearance & Theme
              </h2>
              <p className="text-xs text-slate-300">
                ConnecT uses a sleek Dark Indigo aesthetic designed for maximum focus and visual clarity.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl border-2 border-brand-500 bg-slate-900/80 text-xs font-semibold text-slate-100 flex items-center justify-between glow-indigo">
                  <span>Dark Indigo (Active)</span>
                  <Check className="w-4 h-4 text-brand-400" />
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 text-xs font-semibold text-slate-500 opacity-60 cursor-not-allowed">
                  <span>Light Mode (Disabled)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="space-y-4 animate-fade-in">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800/60 pb-3">
                Backend API Connection
              </h2>
              <p className="text-xs text-slate-300">
                Currently operating in Local State mode with full `localStorage` persistence. Connecting to Express / Node backend API:
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  API Endpoint Base URL
                </label>
                <input
                  type="text"
                  defaultValue="http://localhost:5000/api"
                  className="w-full bg-slate-900/80 border border-slate-800/60 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none input-glow transition-all duration-300"
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800/60 flex justify-end">
            <button
              onClick={handleSave}
              className={`btn-primary flex items-center gap-2 text-xs ${saved ? 'from-emerald-500 to-emerald-600' : ''}`}
            >
              {saved ? <Check className="w-4 h-4 text-emerald-100" /> : <Save className="w-4 h-4" />}
              <span>{saved ? 'Saved Successfully' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
