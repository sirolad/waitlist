import { describe, expect, it } from 'vitest';
import { waitlistSchema } from './schema';

describe('waitlistSchema', () => {
  it('normalizes valid email to lowercase', () => {
    const parsed = waitlistSchema.parse({
      email: 'User@Example.COM',
      source: 'landing',
    });

    expect(parsed.email).toBe('user@example.com');
  });

  it('rejects invalid email', () => {
    const result = waitlistSchema.safeParse({
      email: 'invalid-email',
    });

    expect(result.success).toBe(false);
  });
});
