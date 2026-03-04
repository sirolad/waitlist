import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
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

export const metadata: Metadata = {
  title: 'Awalingo — Join the Waitlist',
  description:
    'Awalingo helps communities preserve and grow low-resource languages. Join the waitlist.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${parkinsans.variable} ${metropolis.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
