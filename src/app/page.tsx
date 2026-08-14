'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Users,
  FolderHeart,
  Map,
  Clock,
  Sparkles,
  Droplet,
  Trees,
  Play,
  ArrowRight,
  TrendingUp,
  ChevronDown
} from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';

// Dynamically import heavy interactive components to disable SSR hydration warnings and optimize initial LCP
const KarnatakaMap = dynamic(() => import('@/components/KarnatakaMap'), { ssr: false });

export default function Home() {

  return (
    <div className="w-full flex flex-col items-center">

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden py-16 lg:py-24 z-10 hero-section">

        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
          
          .hero-section {
            background-image: linear-gradient(to bottom, rgba(5, 8, 20, 0.95) 0%, rgba(5, 8, 20, 0.85) 60%, rgba(5, 8, 20, 0.5) 100%), url('/hero-bg.png?v=2');
            background-size: cover;
            background-position: center;
          }
          @media (min-width: 1024px) {
            .hero-section {
              background-image: linear-gradient(to right, #04060f 35%, rgba(4, 6, 15, 0.75) 55%, rgba(4, 6, 15, 0.3) 75%, transparent 100%), url('/hero-bg.png?v=2');
              background-position: right center;
            }
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start text-left relative z-10">

          <div className="flex flex-col items-start text-left mt-8 lg:mt-0 max-w-xl lg:max-w-2xl animate-fade-in">

            <h1 className="font-serif text-[4rem] sm:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tight mb-4 leading-none">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">BEYOND</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#f3e5ab] via-[#d4af37] to-[#b8860b] mt-1.5">BOUNDARIES</span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wide text-slate-300 mb-6 leading-tight">
              <span className="block">Leading with Purpose.</span>
              <span className="block mt-1">Serving without Limits.</span>
            </h2>

            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37]/80 uppercase mb-8">
              MD 317 &nbsp;|&nbsp; 2026-27
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap justify-start gap-4 mb-8">
              <Link
                href="#impact-dashboard"
                className="px-6 py-3.5 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-bg-deep-space text-[10px] tracking-widest font-bold uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Explore Our Impact
              </Link>
              <Link
                href="/directory"
                className="px-6 py-3.5 rounded-lg border border-white/20 hover:border-[#d4af37]/50 bg-white/5 hover:bg-[#d4af37]/10 text-[10px] tracking-widest font-bold uppercase text-[#f3e5ab] transition-all duration-300"
              >
                Meet the Leaders
              </Link>
              <Link
                href="/events"
                className="px-6 py-3.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-[10px] tracking-widest font-bold uppercase text-slate-300 transition-all duration-300"
              >
                View Upcoming Events
              </Link>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-silver-dark/60 text-[8px] tracking-[0.25em] font-medium uppercase select-none animate-pulse">
          <span>Scroll to Discover</span>
          <ChevronDown size={14} className="animate-bounce text-[#d4af37]" />
        </div>
      </section>

      {/* 2. LIVE ACTIVITY FEED */}
      <div className="w-full bg-bg-midnight/80 backdrop-blur-md border-y border-white/5 py-3.5 relative z-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-gold-primary/10 border border-gold-primary/20 text-[9px] font-bold tracking-widest text-gold-light uppercase shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            Live Activity
          </span>

          {/* Ticker scrolling items */}
          <div className="w-full overflow-hidden relative">
            <div className="inline-flex gap-16 animate-marquee whitespace-nowrap text-[10px] text-silver-primary/80 font-medium tracking-widest uppercase">
              <span>District 317A completed a blood donation drive (120 units) 🩸</span>
              <span>District 317D planted 500 saplings in Kodagu 🌳</span>
              <span>District 317F conducted youth leadership training for 50 Leos 🎓</span>
              <span>District 317B organized educational outreach in Belagavi 📚</span>
              <span>District 317C distributed 150 health kits in Udupi 🏥</span>
              <span>District 317E completed lake cleanup in Mysuru 💧</span>
              <span>District 317G set up a primary care medical camp 🩺</span>

              {/* Duplicate to prevent gaps */}
              <span>District 317A completed a blood donation drive (120 units) 🩸</span>
              <span>District 317D planted 500 saplings in Kodagu 🌳</span>
              <span>District 317F conducted youth leadership training for 50 Leos 🎓</span>
              <span>District 317B organized educational outreach in Belagavi 📚</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. IMPACT DASHBOARD COUNTERS */}
      <section id="impact-dashboard" className="w-full py-20 bg-bg-deep-space/40 border-y border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase flex items-center justify-center gap-1.5 mb-3">
              <TrendingUp size={14} className="text-gold-primary" />
              Service Intelligence
            </span>
            <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wider">
              Platform Impact Dashboard
            </h2>
            <p className="text-xs text-silver-dark mt-2 leading-relaxed">
              Consolidated real-time service coordinates generated from on-ground local club service reports.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {/* Counter Card 1 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <Users className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Total Leos</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={8653} />
                </span>
              </div>
            </div>

            {/* Counter Card 2 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <FolderHeart className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Active Clubs</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={154} />
                </span>
              </div>
            </div>

            {/* Counter Card 3 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <Map className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">LEO Districts</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={7} />
                </span>
              </div>
            </div>

            {/* Counter Card 4 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <Clock className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Service Hours</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={1950} suffix="+" />
                </span>
              </div>
            </div>

            {/* Counter Card 5 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <Sparkles className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Beneficiaries</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={15300} suffix="+" />
                </span>
              </div>
            </div>

            {/* Counter Card 6 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <Trees className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Trees Planted</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={1800} />
                </span>
              </div>
            </div>

            {/* Counter Card 7 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <Droplet className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Blood Units</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={1200} />
                </span>
              </div>
            </div>

            {/* Counter Card 8 */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[140px]">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                <FolderHeart className="text-gold-primary" size={20} />
              </div>
              <div className="mt-4">
                <span className="block text-[10px] tracking-widest text-silver-dark uppercase font-semibold">Completed Projects</span>
                <span className="text-3xl font-extrabold text-white mt-1 block">
                  <AnimatedCounter value={82} />
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE KARNATAKA MAP */}
      <section className="w-full py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase flex items-center justify-center gap-1.5 mb-3">
            <Map size={14} className="text-gold-primary" />
            DISTRICT NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white uppercase tracking-wider">
            EXPLORE OUR DISTRICTS
          </h2>
          <p className="text-xs text-silver-dark mt-2 leading-relaxed">
            Discover the leaders, clubs, projects, and impact stories shaping communities across Karnataka, Goa and parts of Andhra Pradesh.
          </p>
        </div>

        <KarnatakaMap />
      </section>

      {/* 5. STORIES BEYOND BOUNDARIES SECTION */}
      <section className="w-full py-24 bg-bg-deep-space/20 relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase flex items-center justify-center gap-1.5 mb-3">
              <Sparkles size={14} className="text-gold-primary" />
              Human Legacy
            </span>
            <h2 className="text-3xl font-serif font-bold text-white uppercase tracking-wider">
              Stories Beyond Boundaries
            </h2>
            <p className="text-xs text-silver-dark mt-2 leading-relaxed">
              Go behind the metrics to discover the real human lives transformed by youth leadership and service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-bg-deep-space flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-gold-primary/25 transition-all duration-500 h-[480px]">
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800"
                  alt="Education Story"
                  className="w-full h-full object-cover filter brightness-[0.45] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-bg-deep-space/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[8px] font-bold tracking-widest text-gold-light uppercase w-max mb-4">
                  Education &bull; District 317C
                </span>
                <h3 className="text-xl font-serif font-bold text-white leading-snug group-hover:text-gold-light transition-colors mb-3">
                  A Bright Future: How LEO Support Kept Me in School
                </h3>
                <p className="text-xs text-silver-primary/80 line-clamp-3 mb-6 font-light leading-relaxed">
                  When financial constraints threatened to end Rajesh's schooling, local Leos sponsored his annual tuition, providing uniforms, books, and mentoring coordinates.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-silver-dark">Impact Outcome</span>
                    <span className="text-xs font-bold text-gold-light">Sponsored 120+ Students</span>
                  </div>
                  <button
                    onClick={() => alert("Launching full editorial: 'Rajesh\'s Academic Journey'...")}
                    className="text-[9px] font-bold tracking-widest text-white uppercase group-hover:text-gold-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Read Story <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-bg-deep-space flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-gold-primary/25 transition-all duration-500 h-[480px]">
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800"
                  alt="Healthcare Story"
                  className="w-full h-full object-cover filter brightness-[0.45] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-bg-deep-space/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[8px] font-bold tracking-widest text-gold-light uppercase w-max mb-4">
                  Healthcare &bull; District 317A
                </span>
                <h3 className="text-xl font-serif font-bold text-white leading-snug group-hover:text-gold-light transition-colors mb-3">
                  The Gift of Life: 3 Units of Blood When It Mattered
                </h3>
                <p className="text-xs text-silver-primary/80 line-clamp-3 mb-6 font-light leading-relaxed">
                  During an emergency surgery, LEO blood coordinators mobilized donors within 30 minutes, delivering 3 critical units of O-negative blood to save a mother's life.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-silver-dark">Impact Outcome</span>
                    <span className="text-xs font-bold text-gold-light">1,200+ Blood Units Mobilized</span>
                  </div>
                  <button
                    onClick={() => alert("Launching full editorial: 'Emergency Blood Network Response'...")}
                    className="text-[9px] font-bold tracking-widest text-white uppercase group-hover:text-gold-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Read Story <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-bg-deep-space flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.5)] hover:border-gold-primary/25 transition-all duration-500 h-[480px]">
              {/* Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800"
                  alt="Leadership Story"
                  className="w-full h-full object-cover filter brightness-[0.45] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-bg-deep-space/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[8px] font-bold tracking-widest text-gold-light uppercase w-max mb-4">
                  Leadership &bull; District 317F
                </span>
                <h3 className="text-xl font-serif font-bold text-white leading-snug group-hover:text-gold-light transition-colors mb-3">
                  From Shy Volunteer to District President
                </h3>
                <p className="text-xs text-silver-primary/80 line-clamp-3 mb-6 font-light leading-relaxed">
                  Kavitha joined LEO as a quiet college freshman. Through district-level speech workshops and service execution roles, she developed absolute public speaking and executive leadership skills.
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider text-silver-dark">Impact Outcome</span>
                    <span className="text-xs font-bold text-gold-light">Trained 350+ Leaders</span>
                  </div>
                  <button
                    onClick={() => alert("Launching full editorial: 'Youth Leadership Transformation'...")}
                    className="text-[9px] font-bold tracking-widest text-white uppercase group-hover:text-gold-primary transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Read Story <ArrowRight size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP DIRECTORY PREVIEW */}
      <section className="w-full py-24 bg-bg-midnight relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase mb-3">
                Organizational Structure
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white uppercase tracking-wider mb-6">
                The People Behind The Impact
              </h2>
              <p className="text-sm text-silver-primary leading-relaxed font-light mb-8 max-w-md">
                A network of dedicated leaders serving communities across Karnataka, Goa and parts of Andhra Pradesh.
              </p>
              <Link
                href="/directory"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#d4af37]/30 hover:border-[#d4af37] bg-white/5 hover:bg-[#d4af37]/10 text-xs tracking-widest font-bold uppercase text-gold-light transition-all duration-300"
              >
                Access Cabinet Directory <ArrowRight size={14} />
              </Link>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300">
                <span className="text-2xl font-serif font-semibold text-gold-light">MD Council</span>
                <p className="text-[11px] text-silver-dark mt-2 leading-relaxed">Top-tier governing body planning annual operations, budgets, and policy coordinates across the multiple district.</p>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300">
                <span className="text-2xl font-serif font-semibold text-gold-light whitespace-nowrap">District Cabinets</span>
                <p className="text-[11px] text-silver-dark mt-2 leading-relaxed">Seven localized district teams organizing events, leadership training, and territory coordination councils.</p>
              </div>
              <div className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300">
                <span className="text-2xl font-serif font-semibold text-gold-light">Club Officers</span>
                <p className="text-[11px] text-silver-dark mt-2 leading-relaxed">On-ground leaders managing local chapters, coordinating service campaigns, and driving community impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EVENTS PREVIEW */}
      <section className="w-full py-24 bg-bg-deep-space/20 relative z-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-md">
              <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase mb-3 block">
                Upcoming Events
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white uppercase tracking-wider">
                SERVICE, LEADERSHIP & EXPERIENCES
              </h2>
              <p className="text-xs text-silver-dark mt-2 leading-relaxed">
                Connect with the movement. Participate in our upcoming youth leadership conferences, state installations, and district council meetings.
              </p>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#f3e5ab] hover:text-gold-primary transition-colors mt-6 md:mt-0"
            >
              Explore Events <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-gold-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[8px] font-bold tracking-widest text-gold-light uppercase">
                  Multiple District Installation
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-4">Apex Assembly 2026</h3>
                <p className="text-xs text-silver-dark mt-2 leading-relaxed font-light">
                  The official installation ceremony for the Multiple District Cabinet officers and district council representatives, marking the beginning of the service year.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 text-[10px] text-silver-primary">
                <span>📅 July 18, 2026 &bull; Bengaluru</span>
                <span className="font-semibold text-gold-light">Registration Opening Soon</span>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5 hover:border-gold-primary/20 transition-all duration-300 flex flex-col justify-between min-h-[220px]">
              <div>
                <span className="px-2 py-0.5 rounded bg-gold-primary/10 border border-gold-primary/30 text-[8px] font-bold tracking-widest text-gold-light uppercase">
                  Leadership Conference
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-4">Youth Leadership Summit</h3>
                <p className="text-xs text-silver-dark mt-2 leading-relaxed font-light">
                  A high-impact leadership training workshop featuring elite guest speakers, public speaking coaching, and project management coordinates.
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6 text-[10px] text-silver-primary">
                <span>📅 August 05, 2026 &bull; Mysuru</span>
                <span className="font-semibold text-gold-light">Registration Opening Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRESIDENT'S ADDRESS */}
      <section className="w-full py-24 bg-bg-deep-space/40 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* President Image Widget (LHS - 5 cols) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10 bg-bg-midnight">
              {/* Profile Background Image */}
              <img
                src="/president.jpg"
                alt="Leo Lion A Vaishnavi mjf"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient cover */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-transparent to-transparent z-10" />

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h4 className="text-lg font-serif font-bold text-white">Leo Lion A Vaishnavi mjf</h4>
                <p className="text-[10px] text-silver-primary/80 tracking-wide uppercase">Multiple District President, MD 317</p>
              </div>
            </div>
          </div>

          {/* Written Message & Vision Action Buttons (RHS - 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase mb-3">
              Leadership Address
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white uppercase tracking-wider mb-6">
              President&apos;s Address
            </h2>
            <div className="space-y-4 text-sm text-silver-primary leading-relaxed font-light mb-8 max-w-2xl">
              <p>
                &ldquo;Welcome to Leo Multiple District 317.
                <br /><br />
                This year, our theme, <strong>Beyond Boundaries</strong>, is a call to dream bigger, serve deeper, and lead with greater purpose. Across Karnataka, Goa and parts of Andhra Pradesh, thousands of Leos are coming together to create meaningful impact, inspire change, and build stronger communities.
                <br /><br />
                Let us move beyond limitations, embrace new possibilities, and prove that when passion meets service, there are truly no limits to what we can achieve.
                <br /><br />
                Together, let us lead with purpose and serve without limits.&rdquo;
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="flex items-center gap-1.5 pl-0 pr-6 py-3 text-xs tracking-widest uppercase font-bold text-white hover:text-gold-primary transition-colors"
              >
                Read MD History
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 9. MEDIA HUB PREVIEW */}
      <section className="w-full py-24 bg-bg-midnight relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-md">
              <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase mb-3 block">
                Visual Archive
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white uppercase tracking-wider">
                Capturing the Movement
              </h2>
              <p className="text-xs text-silver-dark mt-2 leading-relaxed">
                A visual journey through our service campaigns, tree plantation drives, medical camps, and regional youth summits.
              </p>
            </div>
            <Link
              href="/media"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-[#f3e5ab] hover:text-gold-primary transition-colors mt-6 md:mt-0"
            >
              Enter Media Hub <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=600"
                alt="Environmental Drive"
                className="w-full h-full object-cover filter brightness-[0.55] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 to-transparent flex flex-col justify-end p-6">
                <span className="text-[9px] tracking-wider text-gold-light uppercase font-bold">Go green campaign</span>
                <span className="text-xs font-bold text-white mt-1">Kodagu Reforestation</span>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600"
                alt="Community Outreach"
                className="w-full h-full object-cover filter brightness-[0.55] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 to-transparent flex flex-col justify-end p-6">
                <span className="text-[9px] tracking-wider text-gold-light uppercase font-bold">Health Outreach</span>
                <span className="text-xs font-bold text-white mt-1">Udupi Welfare Drive</span>
              </div>
            </div>

            <div className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600"
                alt="Leadership Session"
                className="w-full h-full object-cover filter brightness-[0.55] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 to-transparent flex flex-col justify-end p-6">
                <span className="text-[9px] tracking-wider text-gold-light uppercase font-bold">Leadership summit</span>
                <span className="text-xs font-bold text-white mt-1">Cabinet Induction 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
