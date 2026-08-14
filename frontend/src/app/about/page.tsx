'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { Globe2, History, Compass, Shield, Target, Lightbulb } from 'lucide-react';
import { db } from '@/lib/db';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PILLAR_ICONS: Record<string, any> = { Globe2, Target, Shield, Lightbulb };

// These values are stored in MongoDB. Keep the Tailwind class names literal in
// source so Tailwind generates the gradient utilities at build time.
const PILLAR_COLOR_CLASSES: Record<string, string> = {
  'from-gold-primary to-gold-hover': 'from-gold-primary to-gold-hover',
  'from-silver-primary to-white': 'from-silver-primary to-white',
  'from-gold-light to-gold-primary': 'from-gold-light to-gold-primary',
  'from-silver-light to-silver-dark': 'from-silver-light to-silver-dark',
};

const DEFAULT_PILLAR_COLOR = 'from-gold-primary to-gold-hover';

export default function About() {
  const [aboutContent, setAboutContent] = useState<any>(null);
  const [pillars, setPillars] = useState<any[]>([]);

  useEffect(() => {
    db.getAbout().then(setAboutContent).catch(() => {});
    db.getThemePillars().then(setPillars).catch(() => {});
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const themes = pillars.map(p => ({
    title: p.title,
    description: p.description,
    icon: PILLAR_ICONS[p.icon] || Globe2,
    colorClass: PILLAR_COLOR_CLASSES[p.color] || DEFAULT_PILLAR_COLOR,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">

      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white uppercase mb-4">
          About Our <span className="gold-glow-text">Movement</span>
        </h1>
        <p className="text-xs tracking-widest uppercase text-silver-primary font-medium">
          Leading with Purpose. Serving without Limits.
        </p>
      </div>

      {/* Grid: Global Leo & MD 317 History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-28">

        {/* Section 1: Global Leo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-gold-primary/20 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center mb-6">
              <Globe2 className="text-gold-primary" size={24} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-4">
              {aboutContent?.leoInternationalTitle || 'About LEO Clubs International'}
            </h2>
            <div className="space-y-4 text-sm text-silver-primary leading-relaxed font-light">
              {(aboutContent?.leoInternationalContent || [
                'Sponsored by Lions Clubs International, the LEO Club Program provides youth around the world with an opportunity to development and contribution, both individually and collectively, as responsible members of their local, national, and international community.',
                'The letters L-E-O stand for Leadership, Experience, and Opportunity. Through organizing community projects, managing club structures, and cooperating with senior Lions advisors, Leos gain core project management skills and cultivate lifelong relationships.',
              ]).map((text: string, i: number) => <p key={i}>{text}</p>)}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-silver-dark uppercase tracking-wider">
            {aboutContent?.leoInternationalFooter || 'Sponsored by Lions Clubs International \u2022 Serving since 1957'}
          </div>
        </motion.div>

        {/* Section 2: MD 317 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-panel rounded-3xl p-8 border border-white/10 hover:border-gold-primary/20 transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-gold-primary/10 border border-gold-primary/20 flex items-center justify-center mb-6">
              <History className="text-gold-primary" size={24} />
            </div>
            <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-wider mb-4">
              {aboutContent?.md317Title || 'About Multiple District 317'}
            </h2>
            <div className="space-y-4 text-sm text-silver-primary leading-relaxed font-light">
              {(aboutContent?.md317Content || [
                'Leo Multiple District 317 constitutes the administrative union of seven distinct LEO Districts (317A to 317G) covering the geographical landscape of Karnataka, Goa and parts of Andhra Pradesh.',
                'With a storied history of organizing large-scale health camps, dynamic environmental campaigns, blood drives, and youth training summits, MD 317 is recognized as one of the most active and organized Multiple Districts globally.',
              ]).map((text: string, i: number) => <p key={i}>{text}</p>)}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-silver-dark uppercase tracking-wider">
            {aboutContent?.md317Footer || 'Encompassing Districts 317A-G \u2022 Serving Karnataka & Goa'}
          </div>
        </motion.div>

      </div>

      {/* Theme Section: Beyond Boundaries */}
      <div className="border-t border-white/10 pt-24 mb-16">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-sans font-bold tracking-widest text-gold-light uppercase flex items-center justify-center gap-1.5 mb-3">
            <Compass size={14} className="text-gold-primary" />
            {aboutContent?.themeYear || '2026-27'} Vision Theme
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white uppercase tracking-wider">
            Theme: {aboutContent?.themeName || 'Beyond Boundaries'}
          </h2>
          <p className="text-xs text-silver-dark mt-2 leading-relaxed">
            {aboutContent?.themeDescription || 'Unpacking the guiding philosophy behind our leadership execution, service campaigns, and digital footprint.'}
          </p>
        </div>

        {/* Timeline of Theme Pillars */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {themes.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glass-panel rounded-2xl p-8 border border-white/5 hover:border-gold-primary/20 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pillar.colorClass} flex items-center justify-center text-bg-deep-space font-bold mb-6`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-gold-light transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-silver-primary leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-6 border-t border-white/5 pt-4 text-[9px] text-gold-primary font-bold tracking-widest uppercase flex items-center gap-1">
                  <span>Pillar {idx + 1}</span>
                  <span className="text-silver-dark">&bull;</span>
                  <span>Active Initiative</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

    </div>
  );
}
