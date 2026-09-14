import React, { useState } from 'react';
import { X, Users, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface CreateGroupModalProps {
  channelId: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ channelId, isOpen, onClose }) => {
  const { users, createNewGroup } = useApp();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>(users.map(u => u.id));

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;
    createNewGroup(channelId, groupName.trim(), description.trim(), selectedUserIds);
    setGroupName('');
    setDescription('');
    onClose();
  };

  const toggleUser = (userId: number) => {
    setSelectedUserIds(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-400">
            <Users className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-100 font-outfit">Create Dynamic Group</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Group Name *
            </label>
            <input
              type="text"
              required
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="e.g. Frontend Team, UI/UX, Security"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of group focus area..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Select Group Members
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {users.map(user => (
                <label
                  key={user.id}
                  onClick={() => toggleUser(user.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                    selectedUserIds.includes(user.id)
                      ? 'bg-brand-500/10 border-brand-500/40 text-slate-100'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={user.avatarUrl} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <div className="text-sm font-semibold">{user.name}</div>
                      <div className="text-[11px] text-slate-400">{user.email}</div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedUserIds.includes(user.id)}
                    onChange={() => {}}
                    className="accent-brand-500 w-4 h-4"
                  />
                </label>
              ))}
            </div>
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
              Create Group
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
