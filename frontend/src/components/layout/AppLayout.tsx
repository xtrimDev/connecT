import React from 'react';
import { Sidebar } from './Sidebar';
import { TopNavbar } from './TopNavbar';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-[#0a0e1a] text-slate-100 overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-gradient-to-br from-slate-900 via-[#0d1225] to-slate-950 relative">
          {/* Subtle ambient background orbs */}
          <div className="fixed top-20 right-10 w-[400px] h-[400px] bg-brand-500/[0.03] rounded-full filter blur-[100px] pointer-events-none"></div>
          <div className="fixed bottom-10 left-72 w-[300px] h-[300px] bg-purple-500/[0.02] rounded-full filter blur-[80px] pointer-events-none"></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
