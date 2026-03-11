'use client';
import { WaitlistForm } from '@/components/waitlist-form';
import { Navbar } from '@/components/navbar';
import { motion } from 'framer-motion';
import { ArrowDown, Languages, Sparkles, Users } from 'lucide-react';
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

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <Navbar />
      <section className='mx-auto max-w-6xl px-6'>

        <div className='mt-6 md:mt-4 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16'>
          {/* Left: text content */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='font-display text-4xl font-semibold leading-tight md:text-5xl xl:text-6xl'
            >
              Keep mother tongues alive, <span className="text-gold">one word at a time</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className='mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg'
            >
              Awalingo helps communities preserve and grow low-resource languages
              through collaborative dictionaries, voting, and peer-reviewed curation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28 }}
              className='mt-8 grid gap-4 sm:grid-cols-3'
            >
              <ValueCard
                icon={<Languages className='h-5 w-5' />}
                title='Dictionary'
                description='Community-curated definitions and translations.'
              />
              <ValueCard
                icon={<Users className='h-5 w-5' />}
                title='Suggest'
                description='Your power to Suggest words and leave a Legacy.'
              />
              <ValueCard
                icon={<Sparkles className='h-5 w-5' />}
                title='Vote'
                description='Vote for it and help it become a permanent part of the dictionary.'
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className='mt-10'
            >
              <a
                href='#waitlist'
                className='inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
              >
                Reserve your spot
                <ArrowDown className='h-4 w-4' />
              </a>
            </motion.div>
          </div>

          {/* Right: phone preview — desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.45 }}
            className='hidden lg:flex justify-center'
          >
            <div className='relative overflow-hidden w-[360px] h-[650px] xl:w-[420px] xl:h-[760px]'>
              <AppPreview />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. PRODUCT PREVIEW ──────────────────────────────── */}
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
            Explore the dictionary and contribute words that preserve your
            community&apos;s language.
          </p>
        </motion.div>

        {/* Mobile / tablet */}
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

        {/* Desktop */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className='hidden lg:flex items-start justify-center gap-4 xl:gap-6'
        >
          <div className='flex flex-col items-center gap-1.5'>
            <div className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
              Home Dashboard
            </div>
            <div className='relative overflow-hidden w-[300px] h-[560px] xl:w-[340px] xl:h-[620px]'>
              <HomePreview />
            </div>
          </div>
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

      {/* ── 3. ROLES ────────────────────────────────────────── */}
      <RolesSection />

      {/* ── 4. WAITLIST FORM ────────────────────────────────── */}
      <section id='waitlist' className='mx-auto max-w-6xl px-6 pb-28'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='mx-auto max-w-xl'
        >
          <div className='mb-8 text-center'>
            <p className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3'>
              Join the waitlist
            </p>
            <h2 className='font-display text-3xl font-semibold md:text-4xl'>
              Ready to make a difference?
            </h2>
            <p className='mt-3 text-base text-muted-foreground'>
              Be first to access Awalingo and help shape the launch.
            </p>
          </div>
          <div className='rounded-2xl border border-border bg-card text-card-foreground p-6 shadow-sm'>
            <WaitlistForm />
          </div>
        </motion.div>
      </section>

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
