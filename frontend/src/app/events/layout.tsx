import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Leo Events, Trainings & Service Activities',
  description: 'Find upcoming Leo Multiple District 317 events, leadership trainings, assemblies, conferences and service activities.',
  path: '/events',
  keywords: ['Leo events', 'Leo leadership training', 'Leo conference Karnataka', 'service activities', 'Multiple District 317 events'],
});

export default function EventsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
