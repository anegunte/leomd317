import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Leadership Directory | Leo Clubs in Multiple District 317',
  description: 'Explore the leadership directory of Leo Multiple District 317, including multiple-district, Lion, district and club leadership teams.',
  path: '/directory',
  keywords: ['Leo leadership directory', 'Leo Clubs Karnataka', 'Leo district cabinet', 'Leo club leaders', 'Multiple District 317'],
});

export default function DirectoryLayout({ children }: Readonly<{ children: React.ReactNode }>) { return children; }
