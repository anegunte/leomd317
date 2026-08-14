'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Radio } from 'lucide-react';
import { db, toDirectImageUrl } from '@/lib/db';
import type { LeoEvent } from '@/lib/mockData';

export default function HighImpactEventRibbon() {
  const [events, setEvents] = useState<LeoEvent[]>([]);

  useEffect(() => {
    let mounted = true;

    const refreshEvents = async () => {
      try {
        const allEvents = await db.getEvents();
        if (mounted) {
          setEvents(allEvents.filter((event) => event.status === 'upcoming' && event.isHighImpact && event.registrationLink));
        }
      } catch {
        // Keep the most recently displayed ribbon if the API is briefly unavailable.
      }
    };

    refreshEvents();
    window.addEventListener('leo-events-updated', refreshEvents);
    return () => {
      mounted = false;
      window.removeEventListener('leo-events-updated', refreshEvents);
    };
  }, []);

  if (!events.length) return null;

  return (
    <aside className="relative z-20 w-full overflow-hidden border-y border-gold-primary/25 bg-[#080d1b]/95 shadow-[0_10px_28px_rgba(0,0,0,0.28)] backdrop-blur-md" aria-label="High impact event announcements">
      <div className="mx-auto flex max-w-[1600px] items-stretch">
        <div className="relative z-10 hidden shrink-0 items-center gap-2 border-r border-gold-primary/25 bg-gold-primary px-5 text-[9px] font-extrabold uppercase tracking-[0.16em] text-bg-deep-space sm:flex">
          <Radio size={13} className="animate-pulse" />
          Priority live
        </div>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#080d1b] to-transparent sm:hidden" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#080d1b] to-transparent" />
          <div className="flex w-max animate-priority-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((track) => (
              <div key={track} className="flex w-max min-w-[100vw] pl-[38vw] pr-[20vw]" aria-hidden={track === 1}>
                {events.map((event) => (
                  <a
                    key={`${event.id}-${track}`}
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={track === 1 ? -1 : undefined}
                    className="group flex h-11 shrink-0 items-center gap-3 border-r border-white/10 px-5 text-silver-light transition-colors hover:bg-gold-primary/10 sm:h-12 sm:px-7"
                    title={`Register for ${event.title}`}
                  >
                    {event.poster && (
                      <img src={toDirectImageUrl(event.poster)} alt="" className="hidden h-7 w-10 rounded object-cover opacity-80 ring-1 ring-gold-primary/25 transition-opacity group-hover:opacity-100 sm:block" />
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-gold-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-primary shadow-[0_0_8px_rgba(212,175,55,0.95)]" />
                      Live
                    </span>
                    <span className="max-w-[22rem] truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-white sm:max-w-none">{event.highImpactMessage || event.title}</span>
                    <span className="hidden text-[9px] uppercase tracking-widest text-silver-primary group-hover:text-gold-light sm:inline">Register</span>
                    <ArrowUpRight size={13} className="shrink-0 text-gold-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
