'use client';

import { motion } from 'framer-motion';
import { PenLine, Scale, Handshake } from 'lucide-react';
import type { ReactNode } from 'react';

const ROLES = [
  {
    icon: <PenLine className='h-6 w-6' />,
    role: 'Contributor',
    tagline: 'You are the author.',
    description:
      'Add words, craft definitions, and submit translations for your language community. Every entry you create becomes a permanent part of the living record — proof that your mother tongue is alive and growing.',
    cta: 'Write the words your community needs.',
    accent: 'from-amber-500/20 to-amber-500/5',
    border: 'border-amber-500/30',
    iconColor: 'text-amber-500',
  },
  {
    icon: <Scale className='h-6 w-6' />,
    role: 'Juror',
    tagline: 'Your vote is law.',
    description:
      'Review submitted words and definitions, cast informed votes, and ensure the dictionary remains accurate and culturally faithful. Jurors are the conscience of Awalingo — the guardians of linguistic truth.',
    cta: 'Shape what gets preserved.',
    accent: 'from-violet-500/20 to-violet-500/5',
    border: 'border-violet-500/30',
    iconColor: 'text-violet-500',
  },
  {
    icon: <Handshake className='h-6 w-6' />,
    role: 'Partner',
    tagline: 'Build the future together.',
    description:
      'Institutions, universities, and language organisations who want to co-author the infrastructure of preservation. Partners get early API access, co-branding, and a seat at the table when we define the roadmap.',
    cta: 'Grow the ecosystem at scale.',
    accent: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/30',
    iconColor: 'text-emerald-500',
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

export function RolesSection() {
  return (
    <section className='mx-auto max-w-6xl px-6 pb-24'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className='text-center mb-12'
      >
        <p className='text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3'>
          How you can help
        </p>
        <h2 className='font-display text-3xl font-semibold md:text-4xl'>
          Find your place in the mission
        </h2>
        <p className='mt-3 text-base text-muted-foreground max-w-lg mx-auto'>
          Every language saved starts with someone who chose to act. Which role
          is yours?
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial='hidden'
        animate='show'
        className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'
      >
        {ROLES.map(role => (
          <RoleCard key={role.role} {...role} />
        ))}
      </motion.div>
    </section>
  );
}

function RoleCard({
  icon,
  role,
  tagline,
  description,
  cta,
  accent,
  border,
  iconColor,
}: {
  icon: ReactNode;
  role: string;
  tagline: string;
  description: string;
  cta: string;
  accent: string;
  border: string;
  iconColor: string;
}) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -5, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`relative flex flex-col rounded-2xl border ${border} bg-gradient-to-b ${accent} p-6 backdrop-blur-sm`}
    >
      {/* Icon */}
      <div
        className={`inline-flex h-11 w-11 items-center justify-center rounded-xl border ${border} bg-background/60 ${iconColor}`}
      >
        {icon}
      </div>

      {/* Role label */}
      <p className='mt-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground'>
        {role}
      </p>

      {/* Tagline */}
      <h3 className='mt-1 font-display text-xl font-semibold leading-snug'>
        {tagline}
      </h3>

      {/* Description */}
      <p className='mt-3 flex-1 text-sm leading-6 text-muted-foreground'>
        {description}
      </p>

      {/* CTA line */}
      <p className={`mt-5 text-sm font-semibold ${iconColor}`}>{cta}</p>
    </motion.div>
  );
}
