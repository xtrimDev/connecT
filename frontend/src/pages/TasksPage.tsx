import React, { useState } from 'react';
import { Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Task } from '../types';
import { CreateTaskModal } from '../components/task/CreateTaskModal';

export const TasksPage: React.FC = () => {
  const { tasks, updateTaskState } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: { label: Task['status']; color: string; icon: any }[] = [
    { label: 'To Do', color: 'border-slate-700 bg-slate-900/50', icon: Clock },
    { label: 'In Progress', color: 'border-amber-500/40 bg-amber-950/10', icon: AlertCircle },
    { label: 'Completed', color: 'border-emerald-500/40 bg-emerald-950/10', icon: CheckCircle2 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit">Workspace Tasks</h1>
          <p className="text-sm text-slate-400">Track sprint deliverables, prioritize urgent issues, and update task statuses.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-lg shadow-brand-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Task</span>
        </button>
      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.label);
          const Icon = col.icon;

          return (
            <div key={col.label} className={`glass-card p-5 rounded-2xl border ${col.color} flex flex-col h-[650px]`}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                <div className="flex items-center gap-2 font-bold text-slate-100 font-outfit">
                  <Icon className="w-4 h-4 text-brand-400" />
                  <span>{col.label}</span>
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  {colTasks.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-brand-500/40 space-y-3 transition-all shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          task.priority === 'Urgent'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : task.priority === 'High'
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {task.priority}
                      </span>
                      <span className="text-[11px] text-slate-500">Due {task.dueDate}</span>
                    </div>

                    <h4 className="font-semibold text-slate-100 text-sm">{task.title}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{task.description}</p>

                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={task.assigneeAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                          alt={task.assigneeName}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs text-slate-300">{task.assigneeName}</span>
                      </div>

                      {/* Status Selector Dropdown */}
                      <select
                        value={task.status}
                        onChange={e => updateTaskState(task.id, e.target.value as Task['status'])}
                        className="bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-medium rounded-lg px-2 py-1 outline-none cursor-pointer hover:border-brand-500"
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <CreateTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
