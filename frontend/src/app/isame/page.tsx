'use client';

import { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  CircleCheck,
  Compass,
  ExternalLink,
  Globe2,
  MapPin,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { db } from '@/lib/db';
import { DEFAULT_ISAME_SETTINGS, IsameSettings } from '@/lib/isame';
import PageDataLoader from '@/components/PageDataLoader';

const pillars = [
  {
    icon: Globe2,
    title: 'Across ISAME',
    description: 'ISAME is Lions Clubs International’s area encompassing India, South Asia and the Middle East.',
  },
  {
    icon: UsersRound,
    title: 'A Leo gathering',
    description: 'Forum spaces bring Leos together to exchange service experiences, leadership perspectives and friendship across borders.',
  },
  {
    icon: Compass,
    title: 'Goa, India',
    description: 'Lions Clubs International currently lists Goa, India for the ISAME Leo Forum. Dates remain forthcoming.',
  },
];

export default function IsameForumPage() {
  const [settings, setSettings] = useState<IsameSettings>(DEFAULT_ISAME_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    db.getIsameSettings()
      .then((savedSettings) => setSettings({ ...DEFAULT_ISAME_SETTINGS, ...savedSettings }))
      .catch(() => {
        // Keep the carefully reviewed defaults visible if the API is offline.
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="w-full overflow-hidden">
      {isLoading ? <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"><PageDataLoader variant="wide" label="Preparing the ISAME experience" /></div> : <>
      <section className="relative isolate min-h-[680px] overflow-hidden border-b border-gold-primary/15">
        <img
          src={settings.heroImage}
          alt="Palm-lined coast in Goa, India"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,7,20,0.98)_0%,rgba(3,7,20,0.9)_35%,rgba(3,7,20,0.36)_72%,rgba(3,7,20,0.65)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_35%,rgba(212,175,55,0.3),transparent_20%),linear-gradient(0deg,rgba(3,7,20,0.92),transparent_55%)]" />

        <div className="mx-auto flex min-h-[680px] max-w-7xl items-center px-4 py-28 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-primary/35 bg-bg-midnight/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-light backdrop-blur-sm">
              <Sparkles size={13} className="text-gold-primary" />
              Leo Multiple District 317 invites you
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-gold-primary">{settings.eyebrow}</p>
            <h1 className="font-serif text-5xl font-bold leading-[0.93] tracking-tight text-white sm:text-7xl lg:text-8xl">
              {settings.titlePrefix}
              <span className="gold-glow-text mt-2 block">{settings.titleHighlight}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg font-light leading-relaxed text-silver-light sm:text-xl">
              {settings.heroSubtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={settings.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-primary px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-bg-deep-space transition-all hover:bg-gold-hover hover:shadow-[0_0_28px_rgba(212,175,55,0.4)]"
              >
                Register your interest <ArrowUpRight size={16} />
              </a>
              <a
                href="#details"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-bg-midnight/35 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-silver-light transition-colors hover:border-gold-primary/60 hover:text-gold-light"
              >
                Explore the forum <Compass size={16} />
              </a>
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-wider text-silver-primary/80">Registration opens in a new Google Form</p>
          </div>
        </div>
      </section>

      <section id="details" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mb-14 grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light">
              <Globe2 size={15} className="text-gold-primary" /> The ISAME connection
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
              One region.<br /><span className="gold-glow-text">Countless perspectives.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm font-light leading-relaxed text-silver-primary">
            {settings.regionIntro}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, description }) => (
            <article key={title} className="glass-panel glass-card-hover rounded-2xl border border-white/8 p-7">
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-primary/25 bg-gold-primary/10 text-gold-primary">
                <Icon size={21} />
              </div>
              <h3 className="font-serif text-xl font-bold text-white">{title}</h3>
              <p className="mt-3 text-xs font-light leading-relaxed text-silver-primary">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/6 bg-bg-deep-space/60">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div className="relative overflow-hidden rounded-3xl border border-gold-primary/20 shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
            <img src={settings.forumImage} alt="Audience at a leadership forum" className="h-[320px] w-full object-cover sm:h-[390px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-deep-space via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-bg-midnight/75 p-4 backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-light">A shared Leo tradition</p>
              <p className="mt-1 text-sm text-silver-light">Leadership grows when ideas and service stories travel.</p>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-gold-light">A forum made for connection</span>
            <h2 className="mt-4 font-serif text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
              Bring your <span className="gold-glow-text">Leo story.</span>
            </h2>
            <p className="mt-6 text-sm font-light leading-relaxed text-silver-primary">
              {settings.forumExperience}
            </p>
            <div className="mt-7 space-y-3 text-sm text-silver-light">
              {['Meet Leos from across the ISAME area', 'Share ideas rooted in local service', 'Celebrate friendship across cultures'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CircleCheck size={17} className="shrink-0 text-gold-primary" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-light">
            <MapPin size={15} className="text-gold-primary" /> Destination: {settings.location}
          </span>
          <h2 className="mt-4 font-serif text-4xl font-bold uppercase leading-tight text-white sm:text-5xl">
            Let the coast <span className="gold-glow-text">set the rhythm.</span>
          </h2>
          <p className="mt-6 text-sm font-light leading-relaxed text-silver-primary">
            {settings.destinationIntro}
          </p>

          <div className="mt-8 rounded-2xl border border-gold-primary/20 bg-gold-primary/5 p-5">
            <div className="flex items-start gap-3">
              <CalendarDays size={20} className="mt-0.5 shrink-0 text-gold-primary" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-gold-light">{settings.dates}</h3>
                <p className="mt-1 text-xs leading-relaxed text-silver-primary">{settings.venue} · {settings.statusNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-white/10">
          <img src={settings.leadershipImage} alt="People gathered at an event" className="h-[360px] w-full object-cover sm:h-[440px]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(3,7,20,0.55),transparent_55%,rgba(212,175,55,0.24))]" />
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-gold-primary/20 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_48%)] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Sparkles className="mx-auto text-gold-primary" size={24} />
          <h2 className="mt-5 font-serif text-4xl font-bold uppercase text-white sm:text-5xl">Your next horizon starts here.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-silver-primary">
            Be part of {settings.titlePrefix} {settings.titleHighlight}. {settings.statusNote}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={settings.registrationUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-primary px-6 py-4 text-[11px] font-extrabold uppercase tracking-widest text-bg-deep-space transition-colors hover:bg-gold-hover">
              Register now <ArrowUpRight size={16} />
            </a>
            <a href={settings.officialForumUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-silver-light transition-colors hover:border-gold-primary/60 hover:text-gold-light">
              Official forum listing <ExternalLink size={15} />
            </a>
          </div>
          <p className="mt-7 text-[10px] uppercase tracking-wider text-silver-dark">
            {settings.location} · {settings.dates}
          </p>
        </div>
      </section>
      </>}
    </div>
  );
}
