import { z } from 'zod';

export const waitlistSchema = z.object({
  name: z.string().trim().max(120).optional(),
  email: z.email().transform(email => email.trim().toLowerCase()),
  role: z.string().trim().max(80).optional(),
  source: z.string().trim().max(80).optional(),
  note: z.string().trim().max(500).optional(),
  phone: z.string().trim().max(20).optional(),
  countryCode: z.string().trim().max(10).optional(),
  motherTongue: z.string().trim().max(80).optional(),
  honeypot: z.string().optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;
