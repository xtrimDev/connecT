import React, { useState } from 'react';
import { FileText, FileCode, FileSpreadsheet, Download, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UploadDocModal } from '../components/doc/UploadDocModal';

export const DocumentsPage: React.FC = () => {
  const { docs } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getIcon = (type: string) => {
    if (type.includes('JSON') || type.includes('Config')) return FileCode;
    if (type.includes('Word') || type.includes('Spec')) return FileSpreadsheet;
    return FileText;
  };

  const iconColors = ['from-brand-500 to-indigo-500', 'from-emerald-500 to-teal-500', 'from-purple-500 to-pink-500', 'from-amber-500 to-orange-500'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/6 rounded-full filter blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Documentation</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-outfit tracking-tight">Workspace Documents & Specs</h1>
            <p className="text-sm text-slate-400 mt-1">Shared project documentation, specification blueprints, and architectural specs.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        {docs.map((doc, idx) => {
          const Icon = getIcon(doc.fileType);
          const gradient = iconColors[idx % iconColors.length];
          return (
            <div
              key={doc.id}
              className="channel-card p-6 rounded-2xl flex flex-col justify-between animate-stagger-in group"
            >
              <div className="card-glow -top-6 -right-6 bg-brand-500/10"></div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-100 text-sm font-outfit truncate group-hover:text-white transition-colors">{doc.title}</h3>
                    <p className="text-[11px] text-slate-400">{doc.fileType} • {doc.fileSize}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span>By {doc.uploadedBy}</span>
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">{doc.updatedAt}</span>
                  <button className="p-2 rounded-lg bg-slate-900/60 hover:bg-brand-600 text-slate-300 hover:text-white transition-all duration-300 group-hover:shadow-md">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <UploadDocModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
