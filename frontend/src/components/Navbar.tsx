/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { db } from '@/lib/db';
import { Shield, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [logoSrc, setLogoSrc] = useState<string>('/logo.jpg');

  // Process logo image to remove non-pure black background pixels dynamically
  useEffect(() => {
    const img = new Image();
    img.src = '/logo.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const maxVal = Math.max(r, g, b);
        if (maxVal < 60) {
          // Smooth transparency ramp to preserve anti-aliasing edges
          data[i + 3] = Math.round((maxVal / 60) * 255);
        }
      }
      ctx.putImageData(imgData, 0, 0);
      setLogoSrc(canvas.toDataURL('image/png'));
    };
  }, []);

  // Load user session
  useEffect(() => {
    const checkUser = () => {
      const currentUser = db.getCurrentUser();
      setUser(currentUser);
    };
    checkUser();
    // Listen for custom login/logout events to update navbar state dynamically
    window.addEventListener('leo-auth-change', checkUser);
    return () => window.removeEventListener('leo-auth-change', checkUser);
  }, []);

  // Handle scroll effect for navbar glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    db.logout();
    setUser(null);
    window.dispatchEvent(new Event('leo-auth-change'));
    window.location.href = '/';
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Directory', path: '/directory' },
    { name: 'Impact', path: '/impact' },
    { name: 'Events', path: '/events' },
    { name: 'Reports', path: '/reports' },
    { name: 'Media Hub', path: '/media' },
    { name: 'ISAME', path: '/isame' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${scrolled
        ? 'bg-bg-midnight/80 backdrop-blur-md border-white/10 shadow-lg py-3'
        : 'bg-transparent border-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">

          {/* Recreated Animated SVG Logo & Name */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 flex items-center justify-center">
              <img
                src={logoSrc}
                alt="Beyond Boundaries Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-sm tracking-[0.25em] text-gold-light group-hover:text-gold-primary transition-colors uppercase leading-none">
                LEO MD 317
              </span>
              <span className="font-sans text-[11px] tracking-[0.18em] text-silver-primary/80 uppercase mt-0.5 leading-none">
                2026-27
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`relative py-1 text-xs tracking-widest uppercase font-medium transition-all duration-300 hover:text-gold-light ${isActive ? 'text-gold-primary font-semibold' : 'text-silver-light/70'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-primary to-gold-light rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Status and Action Button */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gold-primary/30 bg-gold-primary/5 hover:bg-gold-primary/10 transition-all duration-300 text-[10px] tracking-wider uppercase font-semibold text-gold-light"
                >
                  <LayoutDashboard size={12} className="text-gold-primary" />
                  {user.role}
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-full border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 transition-all text-silver-primary hover:text-red-400"
                  title="Logout"
                >
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 hover:border-gold-primary bg-white/5 hover:bg-gold-primary/5 text-xs tracking-wider uppercase font-medium transition-all duration-500"
              >
                <Shield size={12} className="text-gold-primary" />
                Admin Panel
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-silver-light hover:text-gold-primary p-2 focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[100%] inset-x-0 min-h-[calc(100dvh-5rem)] overflow-y-auto bg-[#030714] border-t border-gold-primary/15 p-6 shadow-[0_24px_48px_rgba(0,0,0,0.6)] animate-fade-in">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-widest uppercase font-medium py-2 border-b border-white/5 ${isActive ? 'text-gold-primary' : 'text-silver-light/85'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* User Session status on mobile */}
            <div className="pt-2">
              {user ? (
                <div className="flex flex-col gap-3">
                  <div className="text-xs text-silver-primary">
                    Logged in as: <strong className="text-gold-light">{user.name}</strong> ({user.role})
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex-grow flex items-center justify-center gap-2 px-4 py-2 rounded bg-gold-primary/10 border border-gold-primary/30 text-xs tracking-widest uppercase font-semibold text-gold-light"
                    >
                      <LayoutDashboard size={14} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        handleLogout();
                      }}
                      className="px-4 py-2 rounded bg-red-500/10 border border-red-500/30 text-xs tracking-widest uppercase font-semibold text-red-400"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded bg-gold-primary/10 border border-gold-primary/35 text-xs tracking-widest uppercase font-semibold text-gold-primary"
                >
                  <Shield size={14} />
                  Admin Panel Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
