/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/db';
import { generateNarrative, GeneratedNarrative } from '@/lib/generator';
import { Sparkles, Copy, RefreshCw, ArrowLeft, Send, CheckCircle, Share } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function Narrator() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Form Inputs
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Education');
  const [desc, setDesc] = useState('');
  const [benef, setBenef] = useState<number | undefined>(150);
  const [hours, setHours] = useState<number | undefined>(40);
  const [club, setClub] = useState('');
  const [district, setDistrict] = useState('317A');

  // Outputs
  const [loading, setLoading] = useState(false);
  const [narratives, setNarratives] = useState<GeneratedNarrative | null>(null);
  const [activeOutputTab, setActiveOutputTab] = useState<'insta' | 'linkedin' | 'news' | 'report'>('insta');
  const [copiedStates, setCopiedStates] = useState({ insta: false, linkedin: false, news: false, report: false });

  useEffect(() => {
    const user = db.getCurrentUser();
    if (!user) {
      router.push('/login');
      return;
    }
    setCurrentUser(user);
    setClub(user.club || 'Leo Club of Bangalore Elite');
    setDistrict(user.district === '317' ? '317A' : user.district);
  }, [router]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !desc) {
      alert('Please fill out the campaign title and description');
      return;
    }

    setLoading(true);
    setNarratives(null);
    setCopiedStates({ insta: false, linkedin: false, news: false, report: false });

    // Simulate AI model latency
    setTimeout(() => {
      const generated = generateNarrative({
        title,
        category,
        description: desc,
        beneficiaries: benef,
        volunteerHours: hours,
        district,
        club
      });
      setNarratives(generated);
      setLoading(false);
      
      // Dynamic celebration for UI wow factor
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#d4af37', '#ffffff', '#c0c0c0', '#0a192f']
      });
    }, 1200);
  };

  const handleCopy = (text: string, tab: keyof typeof copiedStates) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [tab]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [tab]: false }));
      }, 2000);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      
      {/* Back button */}
      <Link href="/admin" className="inline-flex items-center gap-1 text-xs text-silver-primary hover:text-gold-primary transition-colors mb-8 uppercase tracking-widest font-semibold">
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase mb-4 flex items-center justify-center gap-2">
          Leo Impact <span className="gold-glow-text">Narrator</span>
          <Sparkles className="text-gold-primary animate-pulse" size={26} />
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          AI-Powered storytelling engine for LEO Multiple District 317
        </p>
      </div>

      {/* Grid: Inputs (LHS) vs Outputs (RHS) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LHS: Inputs Form (5 cols) */}
        <form onSubmit={handleGenerate} className="lg:col-span-5 glass-panel rounded-3xl p-6 border border-white/10 space-y-5 text-xs">
          <div className="pb-3 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xs tracking-widest uppercase font-bold text-gold-light">
              Campaign Specifications
            </h3>
            <span className="text-[8px] uppercase tracking-wider text-silver-dark font-semibold">Input Panel</span>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">Campaign Name</label>
            <input
              type="text" required value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Vidyadhana Scholastics"
              className="w-full px-2.5 py-2.5 bg-bg-deep-space border border-white/10 rounded-xl focus:outline-none focus:border-gold-primary text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Sector */}
            <div>
              <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">Category Sector</label>
              <select
                value={category} onChange={e=>setCategory(e.target.value)}
                className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-xl focus:outline-none focus:border-gold-primary text-xs cursor-pointer"
              >
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Environment">Environment</option>
                <option value="Mental Health">Mental Health</option>
                <option value="Hunger Relief">Hunger Relief</option>
                <option value="Women Empowerment">Women Empowerment</option>
                <option value="Disaster Relief">Disaster Relief</option>
                <option value="Youth Leadership">Youth Leadership</option>
                <option value="Technology for Good">Technology for Good</option>
              </select>
            </div>
            
            {/* District */}
            <div>
              <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">District</label>
              <input
                type="text" required value={district} onChange={e=>setDistrict(e.target.value)}
                className="w-full px-2.5 py-2.5 bg-bg-deep-space border border-white/10 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Club */}
          <div>
            <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">Organizing Club</label>
            <input
              type="text" required value={club} onChange={e=>setClub(e.target.value)}
              className="w-full px-2.5 py-2.5 bg-bg-deep-space border border-white/10 rounded-xl text-xs"
            />
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">Beneficiaries</label>
              <input
                type="number" value={benef || ''} onChange={e=>setBenef(parseInt(e.target.value) || undefined)}
                className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">Volunteer Hours</label>
              <input
                type="number" value={hours || ''} onChange={e=>setHours(parseInt(e.target.value) || undefined)}
                className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-xl text-xs"
              />
            </div>
          </div>

          {/* Raw inputs */}
          <div>
            <label className="block text-[8px] uppercase tracking-wider text-silver-dark mb-1 font-bold">Raw Description (What happened?)</label>
            <textarea
              required value={desc} onChange={e=>setDesc(e.target.value)} rows={4} placeholder="e.g. Distributed books to 150 school kids, held computer coding basics class, local government representative attended to support us..."
              className="w-full px-2.5 py-2 bg-bg-deep-space border border-white/10 rounded-xl focus:outline-none focus:border-gold-primary text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 rounded-full bg-gradient-to-r from-gold-primary to-gold-hover text-bg-deep-space text-xs tracking-widest uppercase font-bold hover:shadow-[0_0_15px_rgba(212,175,55,0.35)] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                Engaging AI Models...
              </>
            ) : (
              <>
                <Sparkles size={14} />
                Generate Narratives
              </>
            )}
          </button>
        </form>

        {/* RHS: Generated Outputs (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {narratives ? (
            <div className="glass-panel rounded-3xl p-6 border border-white/10 flex flex-col justify-between min-h-[460px]">
              <div>
                
                {/* Tabs */}
                <div className="flex border-b border-white/5 text-[9px] tracking-widest uppercase font-bold text-silver-primary mb-6">
                  <button
                    onClick={() => setActiveOutputTab('insta')}
                    className={`flex-1 pb-3 text-center border-b-2 transition-all ${
                      activeOutputTab === 'insta' ? 'border-gold-primary text-gold-light' : 'border-transparent hover:text-white'
                    }`}
                  >
                    Instagram
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('linkedin')}
                    className={`flex-1 pb-3 text-center border-b-2 transition-all ${
                      activeOutputTab === 'linkedin' ? 'border-gold-primary text-gold-light' : 'border-transparent hover:text-white'
                    }`}
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('news')}
                    className={`flex-1 pb-3 text-center border-b-2 transition-all ${
                      activeOutputTab === 'news' ? 'border-gold-primary text-gold-light' : 'border-transparent hover:text-white'
                    }`}
                  >
                    Newsletter
                  </button>
                  <button
                    onClick={() => setActiveOutputTab('report')}
                    className={`flex-1 pb-3 text-center border-b-2 transition-all ${
                      activeOutputTab === 'report' ? 'border-gold-primary text-gold-light' : 'border-transparent hover:text-white'
                    }`}
                  >
                    Annual Report
                  </button>
                </div>

                {/* Tab content panel */}
                <div className="p-4 bg-bg-deep-space/55 border border-white/5 rounded-2xl relative min-h-[300px] overflow-y-auto">
                  
                  {/* Instagram copy */}
                  {activeOutputTab === 'insta' && (
                    <div className="whitespace-pre-wrap text-[11px] text-silver-primary leading-relaxed font-mono">
                      {narratives.instagram}
                    </div>
                  )}

                  {/* LinkedIn copy */}
                  {activeOutputTab === 'linkedin' && (
                    <div className="whitespace-pre-wrap text-[11px] text-silver-primary leading-relaxed">
                      {narratives.linkedin}
                    </div>
                  )}

                  {/* Newsletter copy */}
                  {activeOutputTab === 'news' && (
                    <div className="whitespace-pre-wrap text-[11px] text-silver-primary leading-relaxed font-serif">
                      {narratives.newsletter}
                    </div>
                  )}

                  {/* Annual Report summary */}
                  {activeOutputTab === 'report' && (
                    <div className="whitespace-pre-wrap text-[11px] text-silver-primary leading-relaxed">
                      {narratives.annualReport}
                    </div>
                  )}

                </div>

              </div>

              {/* Action buttons */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[8px] text-silver-dark uppercase tracking-widest font-mono">AI Model: LEO-GPT v4.0</span>
                
                <div className="flex gap-3 text-[9px] uppercase font-bold tracking-wider">
                  {/* Copy Button */}
                  <button
                    onClick={() => {
                      const textMap = {
                        insta: narratives.instagram,
                        linkedin: narratives.linkedin,
                        news: narratives.newsletter,
                        report: narratives.annualReport
                      };
                      handleCopy(textMap[activeOutputTab], activeOutputTab);
                    }}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gold-primary text-bg-deep-space hover:shadow-[0_0_12px_rgba(212,175,55,0.3)] transition-all"
                  >
                    {copiedStates[activeOutputTab] ? (
                      <>
                        <CheckCircle size={12} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        Copy Text
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel rounded-3xl p-8 border border-white/10 flex flex-col justify-center items-center text-center min-h-[460px]">
              <Sparkles size={36} className="text-gold-primary mb-4 animate-pulse" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Narratives Pending</h4>
              <p className="text-[10px] text-silver-dark max-w-sm">
                Provide the raw details of your service event on the left panel and click generate to launch AI copywriting sequences.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
