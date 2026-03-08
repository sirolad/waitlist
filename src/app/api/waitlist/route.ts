import { NextRequest, NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/waitlist/schema';
import { insertWaitlistEntry } from '@/lib/waitlist/service';
import { Resend } from 'resend';
import WaitlistWelcomeEmail from '@/components/emails/welcome-email';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const rateLimitStore = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 10;

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (entry.count >= MAX_PER_WINDOW) return true;

  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

export async function POST(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Too many requests. Please try again soon.' },
      { status: 429 }
    );
  }

  const payload = await request.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Please provide valid details.' },
      { status: 400 }
    );
  }

  if (parsed.data.honeypot && parsed.data.honeypot.trim().length > 0) {
    return NextResponse.json(
      { ok: true, message: 'Thanks! You are on the waitlist.' },
      { status: 200 }
    );
  }

  try {
    const result = await insertWaitlistEntry({
      email: parsed.data.email,
      name: parsed.data.name,
      role: parsed.data.role,
      note: parsed.data.note,
      source: parsed.data.source,
      metadata: {
        userAgent: request.headers.get('user-agent'),
        referer: request.headers.get('referer'),
        phone:
          parsed.data.phone
            ? `${parsed.data.countryCode ?? ''}${parsed.data.phone}`.trim()
            : null,
      },
    });

    if (!result.created) {
      return NextResponse.json(
        { ok: true, message: 'You are already on the waitlist.' },
        { status: 200 }
      );
    }

    if (resend) {
      // Fire and forget the email so we don't slow down the response
      resend.emails.send({
        from: 'Awalingo <awalingoteam@gmail.com>', // MUST update to a verified domain on Resend
        to: parsed.data.email!,
        subject: 'Welcome to the Awalingo Waitlist 🎉',
        react: WaitlistWelcomeEmail({ name: parsed.data.name }),
      }).catch(console.error);
    }

    return NextResponse.json(
      { ok: true, message: 'Success! You are on the waitlist.' },
      { status: 201 }
    );
  } catch (err) {
    console.error('[waitlist] insertion error:', err);
    return NextResponse.json(
      { ok: false, message: 'Submission failed. Please try again.' },
      { status: 500 }
    );
  }
}
