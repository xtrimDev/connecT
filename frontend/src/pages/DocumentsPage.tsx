import React, { useState } from 'react';
import { FileText, FileCode, FileSpreadsheet, Download, Plus } from 'lucide-react';
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

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit">Workspace Documents & Specs</h1>
          <p className="text-sm text-slate-400">Shared project documentation, specification blueprints, and architectural specs.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {docs.map(doc => {
          const Icon = getIcon(doc.fileType);
          return (
            <div
              key={doc.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm font-outfit truncate max-w-[200px]">{doc.title}</h3>
                    <p className="text-[11px] text-slate-400">{doc.fileType} • {doc.fileSize}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>By {doc.uploadedBy}</span>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 transition-colors">
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
