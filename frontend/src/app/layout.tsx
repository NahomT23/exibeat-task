import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';

const hkGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/HKGrotesk-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/HKGrotesk-Bold.otf', 
      weight: '700',
      style: 'normal',
    }
  ],
  variable: '--font-hkgrotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Exibeat',
  description: 'Music submission platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hkGrotesk.variable}>
      <body className="font-sans bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}