import React from 'react';
import Link from 'next/link';
import { Mail, Globe, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-bg-deep-space border-t border-white/10 pt-16 pb-8 overflow-hidden z-10">
      {/* Background radial accent */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Platform Identity */}
          <div className="md:col-span-2">
            <h3 className="font-sans font-bold text-lg tracking-widest text-gold-light uppercase mb-3">
              BEYOND BOUNDARIES
            </h3>
            <p className="font-sans text-xs tracking-wider text-gold-primary/80 font-medium mb-4 italic">
              "Leading with Purpose. Serving without Limits."
            </p>
            <p className="text-xs text-silver-dark max-w-sm leading-relaxed mb-4">
              The Digital Leadership & Impact Platform of Leo Multiple District 317. Empowering thousands of youth leaders across 7 districts to build a sustainable, structured future through service intelligence.
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-silver-dark tracking-widest uppercase">
              <span>Made with</span>
              <Heart size={10} className="text-gold-primary fill-gold-primary animate-pulse" />
              <span>by Leo MD 317 Tech Team</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-xs text-silver-primary">
              <li>
                <Link href="/about" className="hover:text-gold-primary transition-colors">About History & Theme</Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-gold-primary transition-colors">LinkedIn Directory</Link>
              </li>
              <li>
                <Link href="/impact" className="hover:text-gold-primary transition-colors">Impact Analytics</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-gold-primary transition-colors">Event Calendar</Link>
              </li>
              <li>
                <Link href="/reports" className="hover:text-gold-primary transition-colors">Annual Reports</Link>
              </li>
            </ul>
          </div>

          {/* Headquarters Contacts */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-bold text-white mb-4">
              Headquarters
            </h4>
            <ul className="space-y-3 text-xs text-silver-primary">
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-gold-primary shrink-0" />
                <span className="text-silver-primary">Multiple District 317, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-gold-primary shrink-0" />
                <a href="mailto:mdleo317@gmail.com" className="hover:underline text-silver-primary">mdleo317@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={14} className="text-gold-primary shrink-0" />
                <a href="https://lionsclubs.org" target="_blank" rel="noopener noreferrer" className="hover:underline text-silver-primary/80">Lions International</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Copyright */}
        <div className="border-t border-white/5 pt-8 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-silver-dark tracking-wider">
            &copy; {new Date().getFullYear()} Leo Multiple District 317. All Rights Reserved. Program governed under Lions Clubs International.
          </p>
          <div className="flex gap-4 text-[10px] text-silver-dark tracking-widest uppercase">
            <Link href="/login" className="hover:text-gold-primary transition-colors">Admin Portal</Link>
            <span>&bull;</span>
            <a href="#" className="hover:text-gold-primary transition-colors">Privacy Policy</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-gold-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
