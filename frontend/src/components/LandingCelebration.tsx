'use client';

import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { db } from '@/lib/db';

const COLORS = ['#d4af37', '#f3e5ab', '#ffffff', '#b8c2d1'];

function celebrate() {
  const end = Date.now() + 2600;

  confetti({
    particleCount: 110,
    spread: 80,
    startVelocity: 48,
    origin: { x: 0.5, y: 0.23 },
    colors: COLORS,
    scalar: 1.08,
    zIndex: 100,
  });

  const timer = window.setInterval(() => {
    const remaining = end - Date.now();
    if (remaining <= 0) {
      window.clearInterval(timer);
      return;
    }

    const particleCount = Math.max(5, Math.round(24 * (remaining / 2600)));
    confetti({ particleCount, angle: 58, spread: 58, origin: { x: 0.04, y: 0.48 }, colors: COLORS, zIndex: 100 });
    confetti({ particleCount, angle: 122, spread: 58, origin: { x: 0.96, y: 0.48 }, colors: COLORS, zIndex: 100 });
  }, 260);
}

export default function LandingCelebration() {
  const latestNonce = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    let mounted = true;

    const checkForCelebration = async () => {
      try {
        const signal = await db.getCelebration();
        if (!mounted) return;

        // The first poll only establishes the current signal, avoiding a
        // celebration merely because a visitor has just opened the page.
        // A just-launched signal is still honoured for visitors arriving
        // immediately after an admin presses the button.
        if (latestNonce.current === undefined) {
          latestNonce.current = signal.nonce;
          const launchedMomentsAgo = signal.launchedAt && Date.now() - Date.parse(signal.launchedAt) < 5000;
          if (signal.nonce && launchedMomentsAgo) celebrate();
          return;
        }

        if (signal.nonce && signal.nonce !== latestNonce.current) {
          latestNonce.current = signal.nonce;
          celebrate();
        }
      } catch {
        // The landing page remains fully usable if the API is briefly offline.
      }
    };

    const handleCelebration = (event: Event) => {
      const signal = (event as CustomEvent<{ nonce?: string }>).detail;
      if (signal?.nonce && signal.nonce !== latestNonce.current) {
        latestNonce.current = signal.nonce;
        celebrate();
      }
    };

    checkForCelebration();
    window.addEventListener('leo-celebration', handleCelebration);
    return () => {
      mounted = false;
      window.removeEventListener('leo-celebration', handleCelebration);
    };
  }, []);

  return null;
}
