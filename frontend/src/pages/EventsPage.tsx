import React, { useState } from 'react';
import { Clock, MapPin, Plus, Users, Sparkles, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CreateEventModal } from '../components/event/CreateEventModal';

export const EventsPage: React.FC = () => {
  const { events } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const typeColors: Record<string, string> = {
    Meeting: 'bg-brand-500/15 text-brand-300 border-brand-500/30',
    Review: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    Sprint: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    Deadline: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-500/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/6 rounded-full filter blur-[60px] pointer-events-none"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scheduling</span>
            </div>
            <h1 className="text-2xl font-extrabold text-white font-outfit tracking-tight">Calendar & Team Meetings</h1>
            <p className="text-sm text-slate-400 mt-1">Schedule sprint reviews, architecture discussions, and daily standups.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 stagger-children">
        {events.map((event, idx) => (
          <div key={event.id} className="channel-card p-6 rounded-2xl space-y-4 animate-stagger-in group">
            <div className="card-glow -top-6 -right-6 bg-brand-500/10"></div>

            <div className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-1 rounded-full font-semibold border ${typeColors[event.type] || typeColors.Meeting}`}>
                {event.type}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>{event.time} ({event.duration})</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-brand-400" />
                <span className="text-xs text-brand-300 font-semibold">{event.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-outfit group-hover:text-white transition-colors">{event.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1">{event.description}</p>
            </div>

            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>{event.location || 'ConnecT Virtual Room'}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1.5">
                  {event.attendees.slice(0, 3).map(a => (
                    <img key={a.id} src={a.avatarUrl} alt={a.name} className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-900" />
                  ))}
                </div>
                <span className="text-slate-300">{event.attendees.length} Attendees</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateEventModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
