import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  Check,
  Shield,
  Zap,
  Globe,
  Layers,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const passwordChecks = [
    { label: 'At least 6 characters', met: password.length >= 6 },
    { label: 'Contains a number', met: /\d/.test(password) },
    { label: 'Passwords match', met: password.length > 0 && password === confirmPassword },
  ];

  const allChecksMet = passwordChecks.every(c => c.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!allChecksMet) {
      setError('Please meet all password requirements.');
      return;
    }
    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions.');
      return;
    }

    setError('');
    setIsLoading(true);
    const result = await signup(name.trim(), email.trim(), password);
    if (!result.success) {
      setError(result.error || 'Signup failed.');
    }
    setIsLoading(false);
  };

  const highlights = [
    { icon: Shield, label: 'Enterprise Security', desc: 'End-to-end encryption' },
    { icon: Zap, label: 'Instant Setup', desc: 'Ready in seconds' },
    { icon: Globe, label: 'Cloud Workspace', desc: 'Access from anywhere' },
    { icon: Layers, label: 'Multi-Project', desc: 'Unlimited workspaces' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/[0.06] rounded-full filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-500/[0.05] rounded-full filter blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-indigo-500/[0.04] rounded-full filter blur-[80px] pointer-events-none animate-pulse-soft"></div>

      {/* Left Panel — Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
        <div className="w-full max-w-md animate-scale-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-lg shadow-brand-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white font-outfit">
              Connec<span className="text-brand-400">T</span>
            </h1>
          </div>

          {/* Form Card */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800/60 relative overflow-hidden">
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-500/10 rounded-full filter blur-[50px] pointer-events-none"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-7">
                <h2 className="text-2xl font-extrabold text-white font-outfit">Create Account</h2>
                <p className="text-sm text-slate-400 mt-2">Join your team on ConnecT workspace</p>
              </div>

              {/* Error Banner */}
              {error && (
                <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 flex items-center gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                  <p className="text-xs text-rose-300 font-medium">{error}</p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full bg-slate-900/80 border border-slate-800/60 focus:border-brand-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none input-glow transition-all duration-300"
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
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
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      className="w-full bg-slate-900/80 border border-slate-800/60 focus:border-brand-500 rounded-xl pl-11 pr-12 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none input-glow transition-all duration-300"
                      autoComplete="new-password"
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      className="w-full bg-slate-900/80 border border-slate-800/60 focus:border-brand-500 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none input-glow transition-all duration-300"
                      autoComplete="new-password"
                    />
                  </div>
                </div>

                {/* Password Strength Checklist */}
                {password.length > 0 && (
                  <div className="space-y-1.5 animate-fade-in">
                    {passwordChecks.map((check, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300 ${
                          check.met
                            ? 'bg-emerald-500/20 border border-emerald-500/40'
                            : 'bg-slate-800/60 border border-slate-700/40'
                        }`}>
                          {check.met && <Check className="w-2.5 h-2.5 text-emerald-400" />}
                        </div>
                        <span className={`transition-colors ${check.met ? 'text-emerald-300' : 'text-slate-500'}`}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Terms */}
                <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={e => setAgreedToTerms(e.target.checked)}
                    className="accent-brand-500 w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  />
                  <span>
                    I agree to the{' '}
                    <span className="text-brand-400 font-medium">Terms of Service</span> and{' '}
                    <span className="text-brand-400 font-medium">Privacy Policy</span>
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !agreedToTerms}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                  <span>{isLoading ? 'Creating Account...' : 'Create Workspace Account'}</span>
                </button>
              </form>

              {/* Sign In Link */}
              <p className="text-center text-sm text-slate-400 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-brand-400 hover:text-brand-300 font-semibold transition-colors">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative z-10">
        <div className="animate-fade-in">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16 justify-end">
            <div>
              <h1 className="text-2xl font-bold text-white tracking-wide font-outfit text-right">
                Connec<span className="text-brand-400">T</span>
              </h1>
              <p className="text-xs text-slate-400 text-right">Workspace Hub</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-400 flex items-center justify-center shadow-xl shadow-brand-500/25 animate-float">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-5 mb-16">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-white font-outfit tracking-tight leading-[1.1]">
              Start Your
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-brand-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_200%]">
                Journey Today
              </span>
            </h2>
            <p className="text-slate-300 text-base leading-relaxed max-w-md">
              Create your workspace in seconds. Invite your team, set up channels, 
              and start collaborating with AI-powered tools.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 gap-4 stagger-children">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/40 backdrop-blur-sm animate-stagger-in group hover:border-brand-500/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-brand-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{item.label}</p>
                    <p className="text-xs text-slate-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-slate-500 text-right animate-fade-in" style={{ animationDelay: '600ms' }}>
          © 2026 ConnecT Platform • Secure & Encrypted
        </p>
      </div>
    </div>
  );
};
