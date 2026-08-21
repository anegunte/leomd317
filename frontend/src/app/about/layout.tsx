import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'About Leo MD 317 | Youth Leadership Movement',
  description: 'Learn about Leo Multiple District 317, its Beyond Boundaries vision, youth leadership culture and community-service movement.',
  path: '/about',
  keywords: ['about Leo Multiple District 317', 'Leo youth leadership', 'Lions International Leo program', 'community service Karnataka'],
});

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
