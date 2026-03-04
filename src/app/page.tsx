'use client';
import { WaitlistForm } from '@/components/waitlist-form';
import { motion } from 'framer-motion';
import { Languages, Sparkles, Users } from 'lucide-react';
import type { ReactNode } from 'react';

export default function Home() {
  return (
    <main className='min-h-screen bg-background text-foreground'>
      <section className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className='text-sm font-semibold uppercase tracking-wider text-muted-foreground'
        >
          Awalingo
        </motion.p>
        <div className='mt-4 grid gap-12 md:grid-cols-2 md:gap-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className='font-display text-4xl font-semibold leading-tight md:text-6xl'
            >
              Keep mother tongues alive, one word at a time.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
              className='mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg'
            >
              Awalingo helps communities preserve and grow low-resource
              languages through collaborative dictionaries, voting, and guided
              learning.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className='mt-8 grid max-w-xl gap-4 sm:grid-cols-3'
            >
              <ValueCard
                icon={<Languages className='h-5 w-5' />}
                title='Dictionary'
                description='Community-curated definitions and translations.'
              />
              <ValueCard
                icon={<Users className='h-5 w-5' />}
                title='Waitlist'
                description='Early access for contributors and partners.'
              />
              <ValueCard
                icon={<Sparkles className='h-5 w-5' />}
                title='Launch'
                description='Product updates and onboarding priority.'
              />
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='rounded-2xl border border-border bg-white p-6 shadow-sm dark:bg-zinc-950'
          >
            <h2 className='font-display text-2xl font-semibold'>
              Join the waitlist
            </h2>
            <p className='mt-2 text-sm text-muted-foreground'>
              Be first to access Awalingo and help shape the launch.
            </p>
            <div className='mt-6'>
              <WaitlistForm />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      className='rounded-xl border border-border bg-background p-4'
    >
      <div className='text-primary'>{icon}</div>
      <p className='mt-3 text-sm font-semibold'>{title}</p>
      <p className='mt-1 text-xs leading-5 text-muted-foreground'>
        {description}
      </p>
    </motion.div>
  );
}
