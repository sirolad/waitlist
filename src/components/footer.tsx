'use client';

import { Github, Twitter, Mail } from 'lucide-react';

const NAV = [
  { label: 'About', href: '#' },
  { label: 'Dictionary', href: '#preview' },
  { label: 'Join waitlist', href: '#waitlist' },
  { label: 'Contact', href: 'mailto:hello@awalingo.com' },
];

const SOCIAL = [
  { label: 'Twitter / X', href: 'https://twitter.com/awalingo', icon: Twitter },
  { label: 'GitHub', href: 'https://github.com/awalingo', icon: Github },
  { label: 'Email', href: 'mailto:hello@awalingo.com', icon: Mail },
];

const LANGUAGES = ['Yoruba', 'Igbo', 'Hausa', 'Swahili', 'Amharic', 'Zulu'];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-border bg-card text-card-foreground'>
      <div className='mx-auto max-w-6xl px-6 py-14'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>

          {/* Brand */}
          <div className='lg:col-span-2'>
            <p className='font-display text-xl font-bold tracking-tight'>Awalingo</p>
            <p className='mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Mothertongue Rescue
            </p>
            <p className='mt-4 max-w-xs text-sm leading-6 text-muted-foreground'>
              A collaborative platform for communities to preserve and grow low-resource
              languages through curated dictionaries, voting, and guided learning.
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
              Languages
            </p>
            <ul className='space-y-3'>
              {LANGUAGES.map(lang => (
                <li key={lang}>
                  <span className='text-sm text-muted-foreground'>{lang}</span>
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
          <p className='text-xs text-muted-foreground'>
            Built with care for every mother tongue.
          </p>
        </div>
      </div>
    </footer>
  );
}
