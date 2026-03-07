'use client';
import { WaitlistForm } from '@/components/waitlist-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';
import { Languages, Sparkles, Users } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Footer } from '@/components/footer';
import { RolesSection } from '@/components/roles-section';
import type { ReactNode } from 'react';

const AppPreview = dynamic(
  () => import('@/components/app-preview').then(m => m.AppPreview),
  { ssr: false }
);

const HomePreview = dynamic(
  () => import('@/components/app-preview').then(m => m.HomePreview),
  { ssr: false }
);

const DictPreview = dynamic(
  () => import('@/components/app-preview').then(m => m.DictPreview),
  { ssr: false }
);

export default function Home() {
  return (
    <main className='min-h-screen bg-background text-foreground'>
      <section id='waitlist' className='mx-auto max-w-6xl px-6 py-16 md:py-24'>
        <div className='flex items-center justify-between gap-4'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Image
              src='/branding/logo-wordmark-light.png'
              alt='Awalingo'
              width={500}
              height={156}
              className='h-16 w-auto object-contain dark:hidden md:h-20'
              priority
            />
            <Image
              src='/branding/logo-wordmark-dark.png'
              alt='Awalingo'
              width={500}
              height={156}
              className='hidden h-16 w-auto object-contain dark:block md:h-20'
              priority
            />
          </motion.div>
          <ThemeToggle />
        </div>
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
            className='rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm'
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

      {/* App preview section */}
      <section id='preview' className='mx-auto max-w-6xl px-6 pb-24'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mb-12'
        >
          <p className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3'>
            Product preview
          </p>
          <h2 className='font-display text-3xl font-semibold md:text-4xl'>
            See Awalingo in action
          </h2>
          <p className='mt-3 text-base text-muted-foreground max-w-lg mx-auto'>
            Explore the dictionary and contribute words that preserve your community&apos;s language.
          </p>
        </motion.div>

        {/* Mobile / tablet: single alternating phone */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className='flex justify-center lg:hidden'
        >
          <div className='relative overflow-hidden w-[300px] h-[540px] md:w-[340px] md:h-[600px]'>
            <AppPreview />
          </div>
        </motion.div>

        {/* Desktop: two phones side by side */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className='hidden lg:flex items-start justify-center gap-4 xl:gap-6'
        >
          {/* Home phone */}
          <div className='flex flex-col items-center gap-1.5'>
            <div className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Home Dashboard
            </div>
            <div className='relative overflow-hidden w-[300px] h-[560px] xl:w-[340px] xl:h-[620px]'>
              <HomePreview />
            </div>
          </div>

          {/* Dictionary phone */}
          <div className='flex flex-col items-center gap-1.5'>
            <div className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              AwaDiko Dictionary
            </div>
            <div className='relative overflow-hidden w-[300px] h-[560px] xl:w-[340px] xl:h-[620px]'>
              <DictPreview />
            </div>
          </div>
        </motion.div>
      </section>
      <RolesSection />
      <Footer />
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
