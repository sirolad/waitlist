'use client';

import { useState, useEffect } from 'react';
import { allCountries } from 'country-telephone-data';

type WaitlistResult = {
  ok: boolean;
  message: string;
};

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Converts an ISO2 country code to its emoji flag (e.g. "ng" → 🇳🇬)
function isoToFlag(iso2: string) {
  return [...iso2.toUpperCase()].map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('');
}

// Build a deduplicated list of { label, value } for the dropdown.
const COUNTRY_OPTIONS = allCountries
  .filter(c => c.dialCode)
  .map(c => ({
    value: `+${c.dialCode}`,
    label: `${isoToFlag(c.iso2)} +${c.dialCode} ${c.name.replace(/\s*\(.*?\)\s*/g, '').trim()}`,
    iso2: c.iso2,
  }));

const DEFAULT = COUNTRY_OPTIONS.find(c => c.iso2 === 'ng') ?? COUNTRY_OPTIONS[0];

const LRL_OPTIONS = [
  'Afar', 'Akan/Twi', 'Amharic', 'Annang', 'Aymara', 'Bambara', 'Baoulé', 'Basque', 'Bassa', 
  'Bemba', 'Berber/Tamazight', 'Béti', 'Breton', 'Buryat', 'Chichewa', 'Chokwe', 'Cornish', 
  'Dagbani', 'Dangme', 'Dinka', 'Diola', 'Duala', 'Ebira', 'Edo', 'Efik', 'Etsako', 'Ewe', 
  'Ewondo', 'Fang', 'Fijian', 'Fon', 'Fula/Fulfulde', 'Ga', 'Gbaya', 'Gikuyu', 'Gogo', 
  'Guaraní', 'Gurage', 'Hadiyya', 'Hausa', 'Hawaiian', 'Haya', 'Hehe', 'Ibibio', 'Idoma', 
  'Igala', 'Igbo', 'Ijaw', 'Irish/Gaelic', 'Isoko', 'Itsekiri', 'Kamba', 'Kalenjin', 
  'Kanuri', 'Khmer', 'Kinyarwanda', 'Kirundi', 'Kissi', 'Kongo', 'Krio', 'Kru', 'Lao', 
  'Luganda', 'Luhya', 'Lunda', 'Luo', 'Luvale', 'Maasai', 'Makonde', 'Malagasy', 'Mandinka', 
  'Mapuche', 'Mayan languages', 'Māori', 'Mende', 'Meru', 'Mongolian', 'Moore', 'Nahuatl', 
  'Ndebele', 'Nuer', 'Nupe', 'Nyamwezi', 'Nyanja', 'Occitan', 'Oromo', 'Pulaar', 'Quechua', 
  'Romani', 'Runyankore', 'Samoan', 'Sango', 'Sardinian', 'Scots Gaelic', 'Serer', 'Shona', 
  'Sidama', 'Somali', 'Sotho', 'Sukuma', 'Susu', 'Swahili', 'Swati', 'Temne', 'Tibetan', 
  'Tigrinya', 'Tiv', 'Tonga', 'Tongan', 'Tsonga', 'Tswana', 'Tuareg', 'Tumbuka', 'Uyghur', 
  'Urhobo', 'Venda', 'Welsh', 'Wolaytta', 'Wolof', 'Xhosa', 'Yakut/Sakha', 'Yao', 'Yiddish', 
  'Yoruba', 'Zande', 'Zarma', 'Zulu', 'Other'
];

// Progress bar config — adjust the goal to match your launch target
const WAITLIST_GOAL = 500;

function WaitlistProgress({ count, goal }: { count: number; goal: number }) {
  const pct = Math.min((count / goal) * 100, 100);

  return (
    <div className='mb-6 rounded-2xl border border-border bg-muted/30 px-5 py-4'>
      <div className='flex items-center justify-between mb-2'>
        <p className='text-sm font-semibold'>
          <span className='text-primary'>{count.toLocaleString()}</span>
          <span className='text-muted-foreground'> / {goal.toLocaleString()} early spots filled</span>
        </p>
        <span className='text-xs font-semibold text-primary'>{Math.round(pct)}%</span>
      </div>
      {/* Track */}
      <div className='h-2 w-full overflow-hidden rounded-full bg-border'>
        {/* Fill */}
        <div
          className='h-full rounded-full bg-primary transition-all duration-700 ease-out'
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className='mt-2 text-xs text-muted-foreground'>
        {goal - count > 0
          ? `${(goal - count).toLocaleString()} spots remaining — secure yours today.`
          : 'All early spots are filled! Join the general waitlist.'}
      </p>
    </div>
  );
}

export function WaitlistForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [note, setNote] = useState('');
  const [countryCode, setCountryCode] = useState(DEFAULT.value);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<WaitlistResult | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number | null>(null);

  // Fetch count on mount
  useEffect(() => {
    fetch('/api/waitlist/count')
      .then(r => r.json())
      .then((data: { count: number }) => setWaitlistCount(data.count))
      .catch(() => setWaitlistCount(null));
  }, []);

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
          role: role === 'none' ? '' : role,
          motherTongue: motherTongue === 'none' ? '' : motherTongue,
          note,
          phone: phone.trim() || undefined,
          countryCode: phone.trim() ? countryCode : undefined,
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
        setMotherTongue('');
        setNote('');
        setPhone('');
        setCountryCode(DEFAULT.value);
        // Bump the count optimistically after a successful signup
        setWaitlistCount(prev => (prev !== null && payload.ok ? prev + 1 : prev));
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

  const inputClass =
    'w-full rounded-xl border border-border bg-input-bg text-foreground px-4 py-2.5 text-sm placeholder:text-placeholder outline-none ring-0 focus:border-primary';

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

      {/* Progress bar — shown once count is loaded */}
      {waitlistCount !== null && (
        <WaitlistProgress count={waitlistCount} goal={WAITLIST_GOAL} />
      )}

      <div>
        <label htmlFor='name' className='mb-1 block text-sm font-medium'>
          Name <span className='text-red-500'>*</span>
        </label>
        <input
          id='name'
          value={name}
          onChange={event => setName(event.target.value)}
          className={inputClass}
          placeholder='Ciroma Chukwuma Adekunle'
          required
        />
      </div>
      <div>
        <label htmlFor='email' className='mb-1 block text-sm font-medium'>
          Email <span className='text-red-500'>*</span>
        </label>
        <input
          id='email'
          type='email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
          className={inputClass}
          placeholder='you@example.com'
        />
      </div>

      {/* Phone number with country code */}
      <div>
        <label htmlFor='phone' className='mb-1 block text-sm font-medium'>
          Phone number <span className='text-red-500'>*</span>{' '}
          <span className='text-muted-foreground'>(WhatsApp Preferred)</span>
        </label>
        <div className='flex items-stretch gap-2 h-11'>
          <div className='w-36 shrink-0 h-full'>
            <Select value={countryCode} onValueChange={(val) => setCountryCode(val ?? DEFAULT.value)}>
              <SelectTrigger className='w-full rounded-xl border border-border bg-input-bg !h-full px-3 focus:ring-0 focus:ring-offset-0 focus:border-primary data-[state=open]:border-primary'>
                <SelectValue placeholder='Code' />
              </SelectTrigger>
              <SelectContent 
                side='bottom' 
                align='start' 
                sideOffset={4}
                alignItemWithTrigger={false}
                className='max-h-64 z-50'
              >
                {COUNTRY_OPTIONS.map(c => (
                  <SelectItem key={c.iso2} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <input
            id='phone'
            type='tel'
            value={phone}
            onChange={event => setPhone(event.target.value)}
            className='h-full w-full rounded-xl border border-border bg-input-bg text-foreground px-4 text-sm placeholder:text-placeholder outline-none ring-0 focus:border-primary'
            placeholder='801 234 5678'
            maxLength={15}
          />
        </div>
      </div>

      <div>
        <label htmlFor='motherTongue' className='mb-1 block text-sm font-medium'>
          Mother tongue <span className='text-red-500'>*</span>
        </label>
        <Select value={motherTongue} onValueChange={(val) => setMotherTongue(val ?? '')}>
          <SelectTrigger className='w-full outline-none rounded-xl border border-border bg-input-bg !h-11 px-4 focus:ring-0 focus:ring-offset-0 focus:border-primary data-[state=open]:border-primary'>
            <SelectValue placeholder='Select language' />
          </SelectTrigger>
          <SelectContent 
            side='bottom' 
            align='start' 
            sideOffset={4}
            alignItemWithTrigger={false}
            className='z-50 max-h-64'
          >
            <SelectItem value='none'>Select language</SelectItem>
            {LRL_OPTIONS.map(lang => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label htmlFor='role' className='mb-1 block text-sm font-medium'>
          I am a...
        </label>
        <Select value={role} onValueChange={(val) => setRole(val ?? '')}>
          <SelectTrigger className='w-full outline-none rounded-xl border border-border bg-input-bg !h-11 px-4 focus:ring-0 focus:ring-offset-0 focus:border-primary data-[state=open]:border-primary'>
            <SelectValue placeholder='Select role (optional)' />
          </SelectTrigger>
          <SelectContent 
            side='bottom' 
            align='start' 
            sideOffset={4}
            alignItemWithTrigger={false}
            className='z-50'
          >
            <SelectItem value='none'>Select role (optional)</SelectItem>
            <SelectItem value='contributor'>Contributor</SelectItem>
            <SelectItem value='juror'>Juror</SelectItem>
            <SelectItem value='partner'>Partner</SelectItem>
          </SelectContent>
        </Select>
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
