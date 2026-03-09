'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const FAQS = [
  {
    category: 'About Awalingo',
    items: [
      {
        q: 'What is Awalingo?',
        a: 'Awalingo is a community-driven platform for preserving and growing low-resource languages (LRLs). It brings together speakers, learners, and language enthusiasts to collaboratively build dictionaries, suggest new words, vote on definitions, and curate the living vocabulary of their mother tongues.',
      },
      {
        q: 'Which languages does Awalingo currently support?',
        a: 'We currently support Yoruba, Igbo, Hausa, and are actively working on Swahili, Amharic, and Zulu. More languages will be added over time — often driven by community demand.',
      },
      {
        q: "What does 'low-resource language' mean?",
        a: "A low-resource language (LRL) is one that has limited digital content, tools, or datasets compared to widely documented languages like English or French. Many indigenous African and global languages fall into this category. Awalingo is specifically built to bridge that gap.",
      },
    ],
  },
  {
    category: 'Getting Started',
    items: [
      {
        q: 'How do I join Awalingo?',
        a: "Awalingo is currently in early access. You can reserve your spot by joining the waitlist on our homepage. We're onboarding communities gradually to ensure a quality experience.",
      },
      {
        q: 'Is Awalingo free to use?',
        a: 'Yes — contributing to and browsing the dictionary is free. We believe language preservation should be accessible to everyone. We may introduce optional premium features in the future, but the core community tools will always remain free.',
      },
      {
        q: 'Do I need to be a native speaker to contribute?',
        a: "Not at all! Learners, linguists, diaspora members, and enthusiasts are all welcome. The platform uses a peer-review and voting system to ensure accuracy, so everyone's contribution is evaluated by the community.",
      },
    ],
  },
  {
    category: 'Contributing & Community',
    items: [
      {
        q: 'How does the suggestion and voting system work?',
        a: "Any member can suggest a new word or an alternative definition. Community members then vote on suggestions, and a jury of trusted contributors reviews top-voted entries before they are accepted into the permanent dictionary. It's democratic, transparent, and rigorous.",
      },
      {
        q: 'What is a Neo in Awalingo?',
        a: "A 'Neo' is a newly coined or emerging word proposed for inclusion in the dictionary. Neos go through the full community suggestion → voting → jury review pipeline before becoming official dictionary entries.",
      },
      {
        q: 'Can I report an incorrect or offensive entry?',
        a: 'Yes. Every entry has a report option. Our moderation team and community jurors review flagged content promptly. We have a zero-tolerance policy for entries that are inaccurate, offensive, or culturally disrespectful.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    items: [
      {
        q: 'Who owns the content I contribute?',
        a: 'You retain authorship credit for your contributions. By submitting content, you grant Awalingo a licence to display and distribute it as part of the open dictionary. Content is always attributed to contributors.',
      },
      {
        q: 'How is my personal data handled?',
        a: 'We take privacy seriously. We only collect the data necessary to run the platform. We do not sell your data to third parties. For full details, please refer to our Privacy Policy.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className='border-b border-border last:border-0'>
      <button
        onClick={() => setOpen(o => !o)}
        className='flex w-full items-center justify-between gap-4 py-5 text-left'
        aria-expanded={open}
      >
        <span className='text-sm font-semibold leading-snug sm:text-base'>{q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className='shrink-0 text-muted-foreground'
        >
          <ChevronDown className='h-5 w-5' />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='answer'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className='overflow-hidden'
          >
            <p className='pb-5 text-sm leading-7 text-muted-foreground'>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className='min-h-screen bg-background text-foreground'>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className='mx-auto max-w-3xl px-6 pb-16 pt-6 text-center'>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className='text-xs font-semibold uppercase tracking-widest text-muted-foreground'
        >
          Help &amp; Support
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className='font-display mt-3 text-4xl font-semibold leading-tight md:text-5xl'
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16 }}
          className='mt-4 text-base leading-7 text-muted-foreground'
        >
          Everything you need to know about Awalingo. Can&apos;t find an answer?{' '}
          <a
            href='mailto:awalingoteam@gmail.com'
            className='font-medium text-primary underline-offset-4 hover:underline'
          >
            Email us
          </a>
          .
        </motion.p>
      </section>

      {/* ── FAQ ACCORDION ────────────────────────────────────── */}
      <section className='mx-auto max-w-3xl px-6 pb-28'>
        <div className='space-y-10'>
          {FAQS.map(({ category, items }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
            >
              <p className='mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
                {category}
              </p>
              <div className='rounded-2xl border border-border bg-card px-6'>
                {items.map(item => (
                  <FAQItem key={item.q} {...item} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='mt-16 rounded-2xl border border-border bg-card p-8 text-center'
        >
          <p className='font-display text-xl font-semibold'>Still have questions?</p>
          <p className='mt-2 text-sm text-muted-foreground'>
            Our team is happy to help with anything not covered here.
          </p>
          <a
            href='mailto:awalingoteam@gmail.com'
            className='mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
          >
            Get in touch
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
