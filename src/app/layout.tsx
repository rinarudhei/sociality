import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import QueryProvider from '@/providers/queryProvider';
import StoreProvider from '@/providers/storeProvider';
import { Toaster } from 'sonner';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Sociality',
  description: 'Social Media Application',
  icons: {
    icon: '/svg/sociality.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body className={`${inter.variable} antialiased`}>
        <StoreProvider>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
