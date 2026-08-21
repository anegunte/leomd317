import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

const publicRoutes = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1 },
  { path: '/about', changeFrequency: 'monthly' as const, priority: 0.9 },
  { path: '/directory', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/impact', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/events', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/media', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/reports', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/isame', changeFrequency: 'weekly' as const, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
