import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Leo Multiple District 317 — Beyond Boundaries',
    short_name: 'Leo MD 317',
    description: 'Youth leadership, community service, events, and impact stories from Leo Multiple District 317.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030714',
    theme_color: '#030714',
    icons: [{ src: '/logo.jpg', sizes: 'any', type: 'image/jpeg' }],
  };
}
