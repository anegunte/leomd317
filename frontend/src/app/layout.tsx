import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Beyond Boundaries | Leo MD 317 Digital Leadership & Impact Platform",
  description: "The digital headquarters of Leo Multiple District 317. Centralizing youth leadership, interactive service analytics, real-time district tracking, and annual impact reports across 7 districts in Karnataka.",
  keywords: ["Leo Clubs", "Lions Clubs", "Leo MD 317", "Karnataka youth leadership", "service impact analytics", "non-profit dashboard", "Beyond Boundaries"],
  authors: [{ name: "Leo Multiple District 317 Cabinet" }],
  openGraph: {
    title: "Beyond Boundaries | Leo MD 317 Platform",
    description: "Discover real-time service analytics, leadership directories, and annual reports for thousands of youth leaders across Karnataka.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} scroll-smooth`}>
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
