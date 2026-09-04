'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
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
import HighImpactEventRibbon from '@/components/HighImpactEventRibbon';
import LandingCelebration from '@/components/LandingCelebration';
import LiveLandingUpdates from '@/components/LiveLandingUpdates';
import PageDataLoader from '@/components/PageDataLoader';
import { db, toDirectImageUrl } from '@/lib/db';
import type { HomeStory, MediaItem } from '@/lib/mockData';

// Dynamically import heavy interactive components to disable SSR hydration warnings and optimize initial LCP
const KarnatakaMap = dynamic(() => import('@/components/KarnatakaMap'), { ssr: false });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = { Users, FolderHeart, Map, Clock, Sparkles, Droplet, Trees, Play };

export default function Home() {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [counters, setCounters] = useState<any[]>([]);
  const [ticker, setTicker] = useState<any[]>([]);
  const [stories, setStories] = useState<HomeStory[]>([]);
  const [mediaPreview, setMediaPreview] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [settings, dashboardCounters, tickerItems, storyItems, mediaItems] = await Promise.all([
          db.getSiteSettings(), db.getCounters(), db.getTicker(), db.getStories(), db.getMedia(),
        ]);
        setSiteSettings(settings);
        setCounters(dashboardCounters);
        setTicker(tickerItems);
        setStories(storyItems);
        setMediaPreview(mediaItems.slice(0, 3));
      } catch (error) {
        console.error('Unable to load landing page data', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHome();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">

      <HighImpactEventRibbon />
      <LandingCelebration />
      <LiveLandingUpdates />

      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden py-16 lg:py-24 z-10 hero-section">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-start text-left relative z-10">

          <div className="flex flex-col items-start text-left mt-8 lg:mt-0 max-w-xl lg:max-w-4xl animate-fade-in">

            <h1 className="font-serif text-[2.5rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] font-bold tracking-tight mb-4 leading-none w-full">
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">{siteSettings?.heroTitle1 || 'BEYOND'}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#f3e5ab] via-[#d4af37] to-[#b8860b] mt-1.5">{siteSettings?.heroTitle2 || 'BOUNDARIES'}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-wide text-slate-300 mb-6 leading-tight">
              <span className="block">{siteSettings?.heroSubtitle1 || 'Leading with Purpose.'}</span>
              <span className="block mt-1">{siteSettings?.heroSubtitle2 || 'Serving without Limits.'}</span>
            </h2>

            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#d4af37]/80 uppercase mb-8">
              {siteSettings?.heroYear || 'MD 317  |  2026-27'}
            </div>

            {/* Action Links */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-start gap-3 sm:gap-4 mb-8 w-full">
              <Link
                href="#impact-dashboard"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg bg-[#d4af37] hover:bg-[#e5c158] text-bg-deep-space text-[9px] sm:text-[10px] tracking-widest font-bold uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] text-center"
              >
                Explore Our Impact
              </Link>
              <Link
                href="/directory"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-white/20 hover:border-[#d4af37]/50 bg-white/5 hover:bg-[#d4af37]/10 text-[9px] sm:text-[10px] tracking-widest font-bold uppercase text-[#f3e5ab] transition-all duration-300 text-center"
              >
                Meet the Leaders
              </Link>
              <Link
                href="/events"
                className="px-5 sm:px-6 py-3 sm:py-3.5 rounded-lg border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-[9px] sm:text-[10px] tracking-widest font-bold uppercase text-slate-300 transition-all duration-300 text-center"
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
            {isLoading ? <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-light/80"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-primary" />Synchronizing live activity</div> : <div className="inline-flex gap-16 animate-marquee whitespace-nowrap text-[10px] text-silver-primary/80 font-medium tracking-widest uppercase">
              {ticker.map((item, i) => (
                <span key={item.id || i}>{item.text}</span>
              ))}
              {/* Duplicate to prevent gaps */}
              {ticker.map((item, i) => (
                <span key={`dup-${item.id || i}`}>{item.text}</span>
              ))}
            </div>}
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
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase tracking-wider">
              Platform Impact Dashboard
            </h2>
            <p className="text-xs text-silver-dark mt-2 leading-relaxed">
              Consolidated real-time service coordinates generated from on-ground local club service reports.
            </p>
          </div>

          {isLoading ? <PageDataLoader variant="cards" label="Synchronizing service intelligence" /> : <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {counters.map((c, i) => {
              const Icon = ICON_MAP[c.icon] || Sparkles;
              return (
                <div key={c.id || i} className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col justify-between hover:border-gold-primary/20 transition-all duration-300 min-h-[120px] sm:min-h-[140px]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gold-primary/10 flex items-center justify-center border border-gold-primary/20">
                    <Icon className="text-gold-primary" size={16} />
                  </div>
                  <div className="mt-3 sm:mt-4">
                    <span className="block text-[8px] sm:text-[10px] tracking-widest text-silver-dark uppercase font-semibold">{c.label}</span>
                    <span className="text-xl sm:text-3xl font-extrabold text-white mt-1 block">
                      <AnimatedCounter value={c.value} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>}
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

          {isLoading ? <PageDataLoader variant="cards" label="Loading community stories" /> : stories.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {stories.map((story) => (
                <article key={story.id} className="group relative flex h-[480px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-bg-deep-space shadow-[0_15px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-gold-primary/25">
                  <div className="absolute inset-0 z-0">
                    <img src={toDirectImageUrl(story.image)} alt={story.title} className="h-full w-full object-cover brightness-[0.45] transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-bg-deep-space/40 to-transparent" />
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-end p-8">
                    <span className="mb-4 w-max rounded border border-gold-primary/30 bg-gold-primary/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest text-gold-light">
                      {story.tag || 'Service Story'}
                    </span>
                    <h3 className="mb-3 font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-gold-light">{story.title}</h3>
                    <p className="mb-6 line-clamp-3 text-xs font-light leading-relaxed text-silver-primary/80">
                      {story.description || 'Discover the people, service, and leadership behind this Leo impact story.'}
                    </p>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4">
                      <div>
                        <span className="block text-[8px] uppercase tracking-wider text-silver-dark">Impact Outcome</span>
                        <span className="text-xs font-bold text-gold-light">{story.impactOutcome || 'Community impact in action'}</span>
                      </div>
                      {story.readLink ? (
                        <a href={story.readLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-white transition-colors hover:text-gold-primary">
                          Read Story <ArrowRight size={10} />
                        </a>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-silver-primary">Impact Story</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 px-6 py-16 text-center text-xs text-silver-dark">Stories will appear here once they are published from the admin panel.</div>
          )}
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
              <Image
                src={toDirectImageUrl(siteSettings?.presidentPhoto || "/president.jpg")}
                alt={siteSettings?.presidentName || "President"}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient cover */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-transparent to-transparent z-10" />

              <div className="absolute bottom-6 left-6 right-6 z-20">
                <h4 className="text-lg font-serif font-bold text-white">{siteSettings?.presidentName || 'Leo Lion A Vaishnavi mjf'}</h4>
                <p className="text-[10px] text-silver-primary/80 tracking-wide uppercase">{siteSettings?.presidentTitle || 'Multiple District President, MD 317'}</p>
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
                {siteSettings?.presidentMessage || "Our vision this year is to push ourselves beyond every boundary that limits service. Every district, every club, every Leo is a force multiplier. Together, we will create a legacy of impact that echoes across Karnataka, Goa, and beyond."}
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

          {isLoading ? <PageDataLoader variant="gallery" label="Synchronizing visual archive" /> : mediaPreview.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mediaPreview.map((item) => (
              <Link key={item.id} href="/media" className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-lg">
                <img
                  src={toDirectImageUrl(item.thumbnail || item.url)}
                  alt={item.title}
                  className="h-full w-full object-cover brightness-[0.55] transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-midnight/90 to-transparent flex flex-col justify-end p-6">
                  <span className="text-[9px] tracking-wider text-gold-light uppercase font-bold">{item.category}</span>
                  <span className="text-xs font-bold text-white mt-1">{item.title}</span>
                  <span className="text-[9px] tracking-wider text-white/60 uppercase mt-1">District {item.district}</span>
                </div>
              </Link>
            ))}
          </div> : <div className="rounded-2xl border border-white/10 bg-white/[0.02] py-12 text-center text-sm text-silver/70">Visual archive entries will appear here shortly.</div>}
        </div>
      </section>

    </div>
  );
}
