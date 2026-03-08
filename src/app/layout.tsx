import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});
const parkinsans = localFont({
  src: [
    {
      path: '../../public/fonts/Parkinsans/Parkinsans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Parkinsans/Parkinsans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Parkinsans/Parkinsans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Parkinsans/Parkinsans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-parkinsans',
  display: 'swap',
});

const metropolis = localFont({
  src: [
    {
      path: '../../public/fonts/Metropolis Font family/Metropolis-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Metropolis Font family/Metropolis-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Metropolis Font family/Metropolis-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Metropolis Font family/Metropolis-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-metropolis',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://awalingo.com';

export const metadata: Metadata = {
  title: 'Awalingo — Join the Waitlist',
  description:
    'Awalingo helps communities preserve and grow low-resource languages through collaborative dictionaries, voting, and peer-reviewed curation. Join the early access waitlist.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: 'Awalingo — Keep mother tongues alive, one word at a time.',
    description:
      'Awalingo helps communities preserve and grow low-resource languages. Join the waitlist for early access.',
    url: SITE_URL,
    siteName: 'Awalingo',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Awalingo — Keep mother tongues alive, one word at a time.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awalingo — Keep mother tongues alive, one word at a time.',
    description:
      'Awalingo helps communities preserve and grow low-resource languages. Join the waitlist for early access.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${parkinsans.variable} ${metropolis.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
