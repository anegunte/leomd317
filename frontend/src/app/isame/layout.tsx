import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'ISAME Leo Forum 2027 | Goa, India',
  description: 'Discover the ISAME Leo Forum 2027 experience and register your interest with Leo Multiple District 317.',
  path: '/isame',
  keywords: ['ISAME Leo Forum 2027', 'Leo Forum Goa', 'ISAME Lions Leo', 'international Leo gathering'],
});

export default function IsameLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
