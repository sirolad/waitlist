'use client';

import { useState } from 'react';

type WaitlistResult = {
  ok: boolean;
  message: string;
};

export function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          role,
          note,
          source: 'landing',
          honeypot: '',
        }),
      });
      const payload = (await response.json()) as WaitlistResult;
      setResult(payload);
      if (response.ok) {
        setName('');
        setEmail('');
        setRole('');
        setNote('');
      }
    } catch {
      setResult({
        ok: false,
        message: 'Unable to submit now. Please try again shortly.',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <input
        type='text'
        name='company'
        tabIndex={-1}
        autoComplete='off'
        className='hidden'
        aria-hidden='true'
      />
      <div>
        <label htmlFor='name' className='mb-1 block text-sm font-medium'>
          Name <span className='text-muted-foreground'>(optional)</span>
        </label>
        <input
          id='name'
          value={name}
          onChange={event => setName(event.target.value)}
          className='w-full rounded-xl border border-border bg-input-bg text-foreground px-4 py-2.5 text-sm placeholder:text-placeholder outline-none ring-0 focus:border-primary'
          placeholder='Adaeze Okafor'
        />
      </div>
      <div>
        <label htmlFor='email' className='mb-1 block text-sm font-medium'>
          Email
        </label>
        <input
          id='email'
          type='email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
          className='w-full rounded-xl border border-border bg-input-bg text-foreground px-4 py-2.5 text-sm placeholder:text-placeholder outline-none ring-0 focus:border-primary'
          placeholder='you@example.com'
        />
      </div>
      <div>
        <label htmlFor='role' className='mb-1 block text-sm font-medium'>
          I am a...
        </label>
        <select
          id='role'
          value={role}
          onChange={event => setRole(event.target.value)}
          className='w-full rounded-xl border border-border bg-input-bg text-foreground px-4 py-2.5 text-sm outline-none ring-0 focus:border-primary'
        >
          <option value='' className='bg-input-bg text-foreground'>Select role (optional)</option>
          <option value='contributor' className='bg-input-bg text-foreground'>Contributor</option>
          <option value='juror' className='bg-input-bg text-foreground'>Juror</option>
          <option value='partner' className='bg-input-bg text-foreground'>Partner</option>
        </select>
      </div>
      <div>
        <label htmlFor='note' className='mb-1 block text-sm font-medium'>
          Anything you&apos;d like us to know?{' '}
          <span className='text-muted-foreground'>(optional)</span>
        </label>
        <textarea
          id='note'
          value={note}
          onChange={event => setNote(event.target.value)}
          rows={3}
          maxLength={500}
          placeholder='Tell us your language, what brought you here, or what you hope to build…'
          className='w-full resize-none rounded-xl border border-border bg-input-bg text-foreground px-4 py-2.5 text-sm placeholder:text-placeholder outline-none ring-0 focus:border-primary'
        />
        <p className='mt-1 text-right text-xs text-muted-foreground'>
          {note.length}/500
        </p>
      </div>
      <button
        type='submit'
        disabled={loading}
        className='w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60'
      >
        {loading ? 'Submitting...' : 'Join waitlist'}
      </button>
      {result ? (
        <p
          className={`text-sm ${result.ok ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}
        >
          {result.message}
        </p>
      ) : null}
    </form>
  );
}
