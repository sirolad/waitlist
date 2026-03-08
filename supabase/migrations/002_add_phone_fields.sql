-- Add phone fields to waitlist_entries
ALTER TABLE waitlist_entries
  ADD COLUMN IF NOT EXISTS phone        TEXT CHECK (char_length(phone) <= 20),
  ADD COLUMN IF NOT EXISTS country_code TEXT CHECK (char_length(country_code) <= 10);
