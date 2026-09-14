import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

export interface FeatureCardProps {
  title: string;
  category?: string;
  description: string;
  icon: LucideIcon;
  badgeText?: string;
  badgeColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  stats?: { label: string; value: string | number }[];
  actionText?: string;
  onClick: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  category = 'Feature',
  description,
  icon: Icon,
  badgeText,
  badgeColor = 'bg-brand-500/20 text-brand-300 border-brand-500/30',
  gradientFrom = 'from-slate-900',
  gradientTo = 'to-slate-950',
  stats,
  actionText = 'Explore Feature',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`group relative glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 cursor-pointer flex flex-col justify-between overflow-hidden bg-gradient-to-b ${gradientFrom} ${gradientTo}`}
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-brand-500/10 rounded-full filter blur-2xl group-hover:bg-brand-500/20 transition-all"></div>

      <div>
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300 shadow-md">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{category}</span>
              <h3 className="text-lg font-bold text-slate-100 font-outfit group-hover:text-brand-300 transition-colors">
                {title}
              </h3>
            </div>
          </div>

          {badgeText && (
            <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${badgeColor}`}>
              {badgeText}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 leading-relaxed mb-6 line-clamp-3">{description}</p>

        {/* Stats Grid */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-6 pt-3 border-t border-slate-800/80">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className="block text-[10px] text-slate-400 uppercase font-medium">{stat.label}</span>
                <span className="text-sm font-bold text-slate-100 font-outfit">{stat.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Card Action Button Footer */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-brand-400 group-hover:text-brand-300">
        <span>{actionText}</span>
        <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 group-hover:border-brand-500/40 group-hover:bg-brand-600 group-hover:text-white flex items-center justify-center transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
