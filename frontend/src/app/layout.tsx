import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Youth Leadership & Community Service`,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Leo Multiple District 317 connects youth leadership, community-service projects, events and measurable impact across Karnataka, Goa and Andhra Pradesh.",
  applicationName: SITE_NAME,
  icons: {
    // Keep these URLs stable: Google uses the icon linked by the home page for
    // the favicon shown in Search results.
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  keywords: ["Leo Multiple District 317", "Leo Clubs", "Lions International", "youth leadership", "community service", "volunteer projects", "Karnataka service activities", "Goa Leo Clubs", "Beyond Boundaries"],
  authors: [{ name: "Leo Multiple District 317 Cabinet" }],
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: `${SITE_NAME} | Beyond Boundaries`,
    description: "Discover youth leadership, community service, events and impact stories from Leo Multiple District 317.",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_IN",
    type: "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "Leo Multiple District 317 — Beyond Boundaries" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Beyond Boundaries`,
    description: "Youth leadership, community service, events and measurable impact across Multiple District 317.",
    images: [DEFAULT_OG_IMAGE],
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    alternateName: 'Leo MD 317',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
    email: 'mdleo317@gmail.com',
    description: 'A youth leadership and community-service platform for Leo Multiple District 317.',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Karnataka, India' },
      { '@type': 'AdministrativeArea', name: 'Goa, India' },
      { '@type': 'AdministrativeArea', name: 'Andhra Pradesh, India' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: 'Leo MD 317',
    url: SITE_URL,
    inLanguage: 'en-IN',
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
      <body className="bg-bg-midnight text-white min-h-screen flex flex-col antialiased">
        <Navbar />
        <main className="flex-grow flex flex-col w-full relative z-10 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
