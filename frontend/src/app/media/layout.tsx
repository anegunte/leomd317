import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Media Hub | Leo Service & Leadership Stories',
  description: 'View media from Leo Multiple District 317 installations, leadership conferences, service projects and youth activities.',
  path: '/media',
  keywords: ['Leo Clubs photos', 'Leo service projects', 'Leo leadership conference', 'youth service media'],
});

export default function MediaLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
