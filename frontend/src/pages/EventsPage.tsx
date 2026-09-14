import React, { useState } from 'react';
import { Clock, MapPin, Plus, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreateEventModal } from '../components/event/CreateEventModal';

export const EventsPage: React.FC = () => {
  const { events } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit">Calendar & Team Meetings</h1>
          <p className="text-sm text-slate-400">Schedule sprint reviews, architecture discussions, and daily standups.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Meeting</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map(event => (
          <div key={event.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs px-2.5 py-1 rounded-full bg-brand-500/20 text-brand-300 font-semibold border border-brand-500/30">
                {event.type}
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{event.time} ({event.duration})</span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-100 font-outfit">{event.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">{event.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>{event.location || 'ConnecT Virtual Room'}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-300">
                <Users className="w-3.5 h-3.5" />
                <span>{event.attendees.length} Attendees</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
