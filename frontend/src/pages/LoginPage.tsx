import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  MessageSquareText,
  CheckSquare,
  Users,
  Bot,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setIsLoading(true);
    const result = await login(email.trim(), password);
    if (!result.success) {
      setError(result.error || 'Login failed.');
    }
    setIsLoading(false);
  };

  const features = [
    { icon: MessageSquareText, label: 'Real-Time Channels', desc: 'Dynamic group chats' },
    { icon: CheckSquare, label: 'Task Management', desc: 'Kanban board workflows' },
    { icon: Users, label: 'Team Collaboration', desc: 'Multi-member workspaces' },
    { icon: Bot, label: 'AI Assistant', desc: 'Smart code suggestions' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-500/[0.07] rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/[0.03] rounded-full filter blur-[80px] pointer-events-none animate-pulse-soft"></div>

      {/* Left Panel — Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-xl shadow-brand-500/25 animate-float">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide font-outfit">
                Connec<span className="text-brand-400">T</span>
              </h1>
              <p className="text-xs text-slate-400">Workspace Hub</p>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-5 mb-16">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white font-outfit tracking-tight leading-[1.1]">
              Where Teams
              <br />
              <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Build Together
              </span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-md">
              Real-time collaboration platform with dynamic channels, AI-powered assistance, 
              and seamless project management — designed for modern tech teams.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="grid grid-cols-2 gap-4 stagger-children">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/40 backdrop-blur-sm animate-stagger-in group hover:border-brand-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500/20 to-indigo-500/10 flex items-center justify-center text-brand-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{feat.label}</p>
                    <p className="text-xs text-slate-400">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom text */}
        <p className="text-xs text-slate-500 animate-fade-in" style={{ animationDelay: '600ms' }}>
          © 2026 ConnecT Platform • Built with React, TypeScript & Tailwind
        </p>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white font-outfit">
              Connec<span className="text-brand-400">T</span>
            </h1>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800/60 relative overflow-hidden">
            {/* Card glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand-500/10 rounded-full filter blur-[50px] pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-extrabold text-white font-outfit">Welcome Back</h2>
                <p className="text-sm text-slate-400 mt-2">Sign in to access your workspace</p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-6 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <p className="text-xs text-rose-300 font-medium">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@connect.dev"
                      className="w-full bg-slate-900/80 border border-slate-800/60 focus:border-brand-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none input-glow transition-all duration-300"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full bg-slate-900/80 border border-slate-800/60 focus:border-brand-500 rounded-xl pl-11 pr-12 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none input-glow transition-all duration-300"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-brand-500 w-3.5 h-3.5" />
                    Remember me
                  </label>
                  <button type="button" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  <span>{isLoading ? 'Signing In...' : 'Sign In to Workspace'}</span>
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-slate-800/60"></div>
                <span className="text-xs text-slate-500 font-medium">or</span>
                <div className="flex-1 h-px bg-slate-800/60"></div>
              </div>

              {/* Demo Credentials */}
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/40 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  Quick Login (Demo Accounts)
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Aman', email: 'aman.kukreti@connect.dev', pass: 'admin123' },
                    { name: 'Rohit', email: 'rohit.gaira@connect.dev', pass: 'lead123' },
                  ].map((demo, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={async () => {
                        setEmail(demo.email);
                        setPassword(demo.pass);
                        setError('');
                        setIsLoading(true);
                        const result = await login(demo.email, demo.pass);
                        if (!result.success) {
                          setError(result.error || 'Login failed.');
                        }
                        setIsLoading(false);
                      }}
                      className="px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/40 hover:border-brand-500/30 text-xs text-slate-300 hover:text-white font-medium transition-all duration-300 text-left"
                    >
                      <span className="block font-semibold">{demo.name}</span>
                      <span className="text-[10px] text-slate-500">{demo.email.split('@')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-slate-400 mt-6">
                Don't have an account?{' '}
                <Link to="/signup" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
