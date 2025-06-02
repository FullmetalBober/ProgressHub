import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import NextAuthProvider from '@/lib/auth/Provider';
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
        {/* <SpeedInsights />
        <Analytics /> */}
      </body>
    </html>
  );
}
