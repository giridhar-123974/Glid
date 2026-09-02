import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import CommandPalette from '@/components/ui/CommandPalette';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'GLID — Global Local Identity & Discovery | AI Trust & Opportunity Ecosystem',
  description: 'India’s premier AI-powered verified opportunity network for developers, designers, creators, home services, and businesses.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-[#0F172A] pb-16 md:pb-0 selection:bg-orange-100 selection:text-orange-900">
        <AuthProvider>
          <CommandPalette />
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
          <MobileBottomNav />
        </AuthProvider>
      </body>
    </html>
  );
}
