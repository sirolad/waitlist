import { NextRequest, NextResponse } from 'next/server';
import { waitlistSchema } from '@/lib/waitlist/schema';
import { insertWaitlistEntry } from '@/lib/waitlist/service';

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
      },
    });

    if (!result.created) {
      return NextResponse.json(
        { ok: true, message: 'You are already on the waitlist.' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { ok: true, message: 'Success! You are on the waitlist.' },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Submission failed. Please try again.' },
      { status: 500 }
    );
  }
}
