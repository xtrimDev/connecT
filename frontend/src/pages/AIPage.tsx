import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Code } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AIPage: React.FC = () => {
  const { aiMessages, sendAiQuery } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);

  const presetPrompts = [
    'Summarize recent workspace activity and progress',
    'What tasks are overdue or urgent right now?',
    'Provide Express backend API controller code snippet',
    'How is the decoupled frontend structure organized?',
  ];

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || prompt;
    if (!queryText.trim() || isQuerying) return;
    setPrompt('');
    setIsQuerying(true);
    await sendAiQuery(queryText.trim());
    setIsQuerying(false);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-5xl mx-auto animate-fade-in">
      {/* AI Top Banner */}
      <div className="glass-panel p-5 rounded-2xl border border-brand-500/30 flex items-center justify-between mb-4 flex-shrink-0 bg-gradient-to-r from-brand-950/30 to-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/40 flex items-center justify-center text-brand-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white font-outfit flex items-center gap-2">
              ConnecT AI Assistant <Sparkles className="w-4 h-4 text-brand-400" />
            </h1>
            <p className="text-xs text-slate-400">Smart project analytics, task insights, and code recommendations.</p>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
          Ready
        </span>
      </div>

      {/* Chat History & Presets */}
      <div className="flex-1 glass-card rounded-2xl border border-slate-800 flex flex-col min-h-0 overflow-hidden">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {aiMessages.map(msg => {
            const isUser = msg.sender === 'user';
            return (
              <div key={msg.id} className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUser
                      ? 'bg-brand-600 text-white'
                      : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-400'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
                  <div className={`flex items-center gap-2 mb-1 text-[11px] ${isUser ? 'justify-end' : ''}`}>
                    <span className="font-semibold text-slate-300">{isUser ? 'You' : 'ConnecT AI'}</span>
                    <span className="text-slate-500">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed ${
                      isUser
                        ? 'bg-brand-600 text-white rounded-tr-none shadow-md shadow-brand-600/20'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}
                  >
                    {msg.text}

                    {msg.codeSnippet && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Code className="w-3 h-3" /> TypeScript / Express
                          </span>
                          <span>Controller snippet</span>
                        </div>
                        <pre>{msg.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {isQuerying && (
            <div className="flex items-center gap-3 text-slate-400 text-xs italic animate-pulse">
              <Bot className="w-4 h-4 text-brand-400" /> ConnecT AI is generating response...
            </div>
          )}
        </div>

        {/* Preset Suggestion Buttons */}
        <div className="px-6 py-2 border-t border-slate-800/80 bg-slate-950/40 flex items-center gap-2 overflow-x-auto">
          {presetPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-xs px-3 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white whitespace-nowrap transition-colors flex-shrink-0"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60">
          <div className="relative flex items-center">
            <input
              type="text"
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask AI about workspace tasks, project status, or dynamic groups..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-brand-500 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none"
            />
            <button
              onClick={() => handleSend()}
              disabled={isQuerying}
              className="absolute right-2 p-2 rounded-lg bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
