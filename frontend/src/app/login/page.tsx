'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { Shield, Key, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If already logged in, redirect directly to admin panel
    if (db.getCurrentUser()) {
      router.push('/admin');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await db.login(username, password);
      // Dispatch event to notify layout/navbar of auth state change
      window.dispatchEvent(new Event('leo-auth-change'));
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center min-h-[75vh]">
      
      {/* LHS text detail (7 cols) */}
      <div className="lg:col-span-6 space-y-6 text-left">
        <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center mb-4">
          <Shield className="text-gold-primary" size={24} />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase leading-snug">
          District Command <span className="gold-glow-text">Access</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          Secure Administration Hub for LEO MD 317 Cabinets
        </p>
        <p className="text-xs text-silver-dark leading-relaxed font-light max-w-md">
          Authorized club, district, and multiple district administrators can authenticate here to manage directory profiles, schedule district training assemblies, upload service metrics, and generate annual impact summaries.
        </p>
      </div>

      {/* RHS login panel (5 cols) */}
      <div className="lg:col-span-6 w-full max-w-md glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Background glow overlay */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />

        <h3 className="text-lg font-serif font-bold text-white mb-6 uppercase tracking-wider">
          Sign In to Platform
        </h3>

        {error && (
          <div className="p-3 mb-5 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-xs">
          
          {/* Username */}
          <div className="relative">
            <label className="block text-[8px] uppercase tracking-widest text-silver-dark font-bold mb-1.5">Username / ID</label>
            <div className="relative">
              <User className="absolute left-3.5 top-3.5 text-silver-dark" size={14} />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full pl-10 pr-4 py-3 bg-bg-deep-space/65 border border-white/10 focus:border-gold-primary rounded-xl text-xs text-white placeholder-silver-dark focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-[8px] uppercase tracking-widest text-silver-dark font-bold mb-1.5">Password</label>
            <div className="relative">
              <Key className="absolute left-3.5 top-3.5 text-silver-dark" size={14} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-3 bg-bg-deep-space/65 border border-white/10 focus:border-gold-primary rounded-xl text-xs text-white placeholder-silver-dark focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-silver-dark hover:text-white"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-gold-primary to-gold-hover text-bg-deep-space text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Authorize Login'}
            <ArrowRight size={14} />
          </button>
        </form>

      </div>

    </div>
  );
}
