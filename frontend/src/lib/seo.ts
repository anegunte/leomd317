import type { Metadata } from 'next';

export const SITE_URL = 'https://leomd317.in';
export const SITE_NAME = 'Leo Multiple District 317';
export const DEFAULT_OG_IMAGE = '/opengraph-image';

interface PageSeo {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}

/** Keeps titles, canonical URLs, and social previews consistent across public routes. */
export function buildPageMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_IN',
      type: 'website',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${SITE_NAME} — Beyond Boundaries` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
