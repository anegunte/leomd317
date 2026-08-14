'use client';

import { useEffect } from 'react';
import { db } from '@/lib/db';

/** Opens one SSE connection and fans its messages out to landing-page widgets. */
export default function LiveLandingUpdates() {
  useEffect(() => {
    const stream = new EventSource(db.getLiveUpdatesUrl());

    stream.addEventListener('events-updated', () => {
      window.dispatchEvent(new Event('leo-events-updated'));
    });

    stream.addEventListener('celebration', (event) => {
      try {
        window.dispatchEvent(new CustomEvent('leo-celebration', { detail: JSON.parse(event.data) }));
      } catch {
        // Ignore a malformed transient message; EventSource reconnects itself.
      }
    });

    return () => stream.close();
  }, []);

  return null;
}
