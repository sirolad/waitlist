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
    <header className='mx-auto max-w-6xl px-6 py-8 md:py-10'>
      <nav className='flex items-center justify-between gap-6'>
        {/* Logo */}
        <Link href='/' className='shrink-0'>
          <Image
            src='/branding/logo-wordmark-light.png'
            alt='Awalingo'
            width={500}
            height={156}
            className='h-14 w-auto object-contain dark:hidden md:h-16'
            priority
          />
          <Image
            src='/branding/logo-wordmark-dark.png'
            alt='Awalingo'
            width={500}
            height={156}
            className='hidden h-14 w-auto object-contain dark:block md:h-16'
            priority
          />
        </Link>

        {/* Nav links + theme toggle */}
        <div className='flex shrink-0 items-center gap-0.5 sm:gap-1'>
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
          <div className='ml-1'>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
