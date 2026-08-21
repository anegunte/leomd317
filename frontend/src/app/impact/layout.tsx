import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Community Service Projects & Impact',
  description: 'Discover Leo Multiple District 317 community-service projects in education, healthcare, environment, youth leadership and more.',
  path: '/impact',
  keywords: ['community service projects Karnataka', 'youth volunteer service', 'Leo impact projects', 'education healthcare environment initiatives'],
});

export default function ImpactLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
