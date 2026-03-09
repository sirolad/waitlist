'use client';

import Image from 'next/image';
import { Twitter, Mail, Instagram, Linkedin, Heart } from 'lucide-react';

function MediumIcon({ className }: { className?: string }) {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' className={className} aria-hidden='true'>
      <path d='M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z' />
    </svg>
  );
}

const NAV = [
  { label: 'About', href: '#' },
  { label: 'Dictionary', href: '#preview' },
  { label: 'FAQs', href: '/faq' },
  { label: 'Join waitlist', href: '#waitlist' },
  { label: 'Contact', href: 'mailto:hello@awalingo.com' },
];

const SOCIAL = [
  { label: 'Twitter / X', href: 'https://www.x.com/useawalingo', icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/useawalingo', icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/awalingo', icon: Linkedin },
  { label: 'Medium', href: 'https://medium.com/@awalingo', icon: MediumIcon },
  { label: 'Email', href: 'mailto: awalingoteam@gmail.com', icon: Mail },
];

const COMMUNITIES = [
  { name: 'Yoruba' },
  { name: 'Igbo' },
  { name: 'Hausa' },
  { name: 'Swahili', soon: true },
  { name: 'Amharic', soon: true },
  { name: 'Zulu', soon: true },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-border bg-card text-card-foreground'>
      <div className='mx-auto max-w-6xl px-6 py-14'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>

          {/* Brand */}
          <div className='lg:col-span-2'>
            <Image
              src='/branding/logo-wordmark-light.png'
              alt='Awalingo'
              width={600}
              height={256}
              className='h-18 w-auto object-contain dark:hidden'
            />
            <Image
              src='/branding/logo-wordmark-dark.png'
              alt='Awalingo'
              width={600}
              height={256}
              className='hidden h-18 w-auto object-contain dark:block'
            />
            <p className='mt-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              A Community-driven Dictionary for LRLs
            </p>
            <p className='mt-4 max-w-xs text-sm leading-6 text-muted-foreground'>
              At Awalingo, we aren’t just preserving indigenous languages — we are engineering inclusion and helping you co-curate the future of mothertongues. Join the mission.

            </p>
            {/* Social */}
            <div className='mt-6 flex items-center gap-3'>
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary'
                >
                  <Icon className='h-4 w-4' />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className='mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Links
            </p>
            <ul className='space-y-3'>
              {NAV.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className='text-sm text-muted-foreground transition hover:text-foreground'
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div>
            <p className='mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Communities
            </p>
            <ul className='space-y-3'>
              {COMMUNITIES.map(({ name, soon }) => (
                <li key={name} className='flex items-center gap-2'>
                  <span className='text-sm text-muted-foreground'>{name}</span>
                  {soon && (
                    <span className='rounded-full bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400'>
                      soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row'>
          <p className='text-xs text-muted-foreground'>
            © {year} Awalingo. All rights reserved.
          </p>
          <p className='flex items-center gap-1 text-xs text-muted-foreground'>
            Built with <Heart className='h-3 w-3 fill-red-500 text-red-500' /> for every mother tongue.
          </p>
        </div>
      </div>
    </footer>
  );
}
