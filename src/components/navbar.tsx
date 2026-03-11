'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/faq', label: 'FAQ' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className='sticky top-0 z-50 w-full border-b border-transparent bg-background/80 py-4 backdrop-blur-md transition-all md:py-5'>
      <nav className='mx-auto max-w-6xl px-6 flex items-center justify-between gap-6'>
        {/* Logo */}
        <Link href='/' className='shrink-0 -ml-7'>
          <Image
            src='/branding/logo-wordmark-light.png'
            alt='Awalingo'
            width={500}
            height={156}
            className='h-12 w-auto object-contain dark:hidden md:h-14'
            priority
          />
          <Image
            src='/branding/logo-wordmark-dark.png'
            alt='Awalingo'
            width={500}
            height={156}
            className='hidden h-12 w-auto object-contain dark:block md:h-14'
            priority
          />
        </Link>

        {/* Nav links + theme toggle + CTA */}
        <div className='flex shrink-0 items-center gap-2 sm:gap-4'>
          <div className='flex items-center gap-0.5 sm:gap-1'>
            {NAV_LINKS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors sm:px-3',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className='flex items-center gap-2 sm:gap-3'>
            <a
              href='/#waitlist'
              className='hidden h-9 items-center justify-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 md:flex'
            >
              Reserve your spot
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
