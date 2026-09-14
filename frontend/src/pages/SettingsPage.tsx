import React, { useState } from 'react';
import { User, Bell, Palette, Shield, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'appearance' | 'workspace'>('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white font-outfit">Workspace & User Settings</h1>
        <p className="text-sm text-slate-400">Configure your profile, notifications, appearance, and API connections.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="glass-card p-3 rounded-2xl border border-slate-800 space-y-1">
          {[
            { id: 'profile', label: 'User Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'workspace', label: 'Workspace API', icon: Shield },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="md:col-span-3 glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800 pb-3">
                User Profile Settings
              </h2>
              <div className="flex items-center gap-4 py-2">
                <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-500" />
                <div>
                  <h3 className="font-semibold text-slate-100">{currentUser.name}</h3>
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
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800 pb-3">
                Notification Preferences
              </h2>
              <div className="space-y-3 text-xs">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span>New Message Notifications in Channels</span>
                  <input type="checkbox" defaultChecked className="accent-brand-500 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span>Task Priority Assignment Alerts</span>
                  <input type="checkbox" defaultChecked className="accent-brand-500 w-4 h-4" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span>AI Assistant Task Reminders</span>
                  <input type="checkbox" defaultChecked className="accent-brand-500 w-4 h-4" />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800 pb-3">
                Appearance & Theme
              </h2>
              <p className="text-xs text-slate-300">
                ConnecT uses a sleek Dark Indigo aesthetic designed for maximum focus and visual clarity.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-xl border-2 border-brand-500 bg-slate-900 text-xs font-semibold text-slate-100 flex items-center justify-between">
                  <span>Dark Indigo (Active)</span>
                  <Check className="w-4 h-4 text-brand-400" />
                </div>
                <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-500 opacity-60">
                  <span>Light Mode (Disabled)</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-100 font-outfit border-b border-slate-800 pb-3">
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
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-sm text-slate-100 outline-none"
                />
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all"
            >
              {saved ? <Check className="w-4 h-4 text-emerald-300" /> : null}
              <span>{saved ? 'Saved Successfully' : 'Save Preferences'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
