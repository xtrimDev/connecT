import React, { useState } from 'react';
import { X, FileUp, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface UploadDocModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadDocModal: React.FC<UploadDocModalProps> = ({ isOpen, onClose }) => {
  const { uploadDoc } = useApp();
  const [title, setTitle] = useState('');
  const [fileType, setFileType] = useState('PDF Document');
  const [fileSize, setFileSize] = useState('2.4 MB');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    uploadDoc(title.trim(), fileType, fileSize);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-400">
            <FileUp className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-100 font-outfit">Upload Document</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Document Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. System Requirement Spec v2.pdf"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">File Type</label>
              <select
                value={fileType}
                onChange={e => setFileType(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
              >
                <option value="PDF Document">PDF Document</option>
                <option value="Word Spec">Word Spec</option>
                <option value="JSON Config">JSON Config</option>
                <option value="Markdown Doc">Markdown Doc</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Simulated Size</label>
              <input
                type="text"
                value={fileSize}
                onChange={e => setFileSize(e.target.value)}
                placeholder="2.4 MB"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="border-2 border-dashed border-slate-800 hover:border-brand-500/50 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-950/30">
            <FileUp className="w-8 h-8 text-brand-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-200">Click or drop file here to simulate upload</p>
            <p className="text-xs text-slate-500 mt-1">Supports PDF, DOCX, Markdown, JSON up to 25MB</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30"
            >
              <Plus className="w-4 h-4" />
              Upload Doc
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
