'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type='button'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label='Toggle theme'
      className='inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:bg-black/5 dark:hover:bg-white/10'
    >
      <Sun className='hidden h-4 w-4 dark:block' />
      <Moon className='block h-4 w-4 dark:hidden' />
    </button>
  );
}
