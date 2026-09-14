import React, { useState } from 'react';
import { X, Calendar, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CalendarEvent } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  const { scheduleEvent } = useApp();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('2026-09-18');
  const [time, setTime] = useState('11:00 AM');
  const [duration, setDuration] = useState('30 mins');
  const [type, setType] = useState<CalendarEvent['type']>('Meeting');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    scheduleEvent(title.trim(), description.trim(), date, time, duration, type);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-400">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-bold text-slate-100 font-outfit">Schedule Meeting / Event</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Daily Standup or Design Review"
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Meeting agenda and topics..."
              className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-4 py-2 text-sm text-slate-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Time</label>
              <input
                type="text"
                value={time}
                onChange={e => setTime(e.target.value)}
                placeholder="10:00 AM"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="45 mins"
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Type</label>
              <select
                value={type}
                onChange={e => setType(e.target.value as CalendarEvent['type'])}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-slate-100 outline-none"
              >
                <option value="Meeting">Meeting</option>
                <option value="Review">Review</option>
                <option value="Sprint">Sprint</option>
                <option value="Deadline">Deadline</option>
              </select>
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
              Schedule Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
