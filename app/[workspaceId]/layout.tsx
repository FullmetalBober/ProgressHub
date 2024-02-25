import Footer from '@/components/layout/Footer';
import SideBar from '@/components/layout/Sidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-screen justify-between'>
      <div className='mb-auto p-8 pt-2 md:p-8 grid lg:grid-cols-5'>
        <SideBar />
        <main className='col-span-3 lg:col-span-4'>{children}</main>
      </div>
      <Footer />
    </div>
  );
}
