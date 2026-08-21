import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Annual Impact Reports & Service Metrics',
  description: 'Explore annual impact reporting, district contribution standings and service metrics for Leo Multiple District 317.',
  path: '/reports',
  keywords: ['Leo annual report', 'community service impact report', 'Leo Multiple District 317 reports', 'youth volunteer impact'],
});

export default function ReportsLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
