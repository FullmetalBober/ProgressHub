import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NextAuthProvider from '@/lib/auth/Provider';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'ProgressHub',
  description: 'A platform for tracking your progress',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <TooltipProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
          <Toaster />
        </TooltipProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
