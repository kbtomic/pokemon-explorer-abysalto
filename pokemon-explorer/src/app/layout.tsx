import type { Metadata, Viewport } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import { Providers } from './providers';
import { ScrollToTopButton } from '@/components/ui/ScrollToTopButton';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pokemon Explorer',
  description: 'Explore the world of Pokemon with advanced filtering and search capabilities',
  keywords: ['pokemon', 'pokedex', 'gaming', 'explorer'],
  authors: [{ name: 'Pokemon Explorer Team' }],
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-gray-50 dark:bg-gray-900">
      <body className={`${montserrat.variable} ${inter.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        <Providers>
          {children}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  );
}
