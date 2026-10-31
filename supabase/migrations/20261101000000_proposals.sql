-- Payment proposals and the rate card they are priced from.
--
-- Both tables are reached only by the admin area, which talks to Supabase from the server with
-- the service role key. That role bypasses row level security, so the tables get RLS switched on
-- and no policies: anon (the website) and authenticated have no way in at all.

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  number text not null unique check (char_length(number) <= 40),
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'accepted', 'declined')),
  -- The enquiry this came from, when it started as one. Kept as plain text rather than a foreign
  -- key so the proposal survives an enquiry being deleted, and so neither table blocks the other.
  enquiry_id text not null default '' check (char_length(enquiry_id) <= 64),
  -- Name, email, company, country, timeline, project title and brief, as shown on the proposal.
  client jsonb not null default '{}'::jsonb,
  services text[] not null default '{}' check (cardinality(services) <= 10),
  -- { "<scope item key>": quantity }
  items jsonb not null default '{}'::jsonb,
  -- Monthly care plan item keys.
  care text[] not null default '{}' check (cardinality(care) <= 20),
  -- { "<item key>": price in USD } — a rate changed for this one proposal, leaving the card alone.
  overrides jsonb not null default '{}'::jsonb,
  -- currency, rate per USD, discount, rush, tax, validity days, delivery text, payment stages.
  pricing jsonb not null default '{}'::jsonb,
  notes text not null default '' check (char_length(notes) <= 4000),
  -- Stored in US dollars so the pipeline stays comparable whatever a proposal was quoted in.
  total_usd numeric(12, 2) not null default 0,
  monthly_usd numeric(12, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists proposals_updated_at_idx on public.proposals (updated_at desc);
create index if not exists proposals_status_idx on public.proposals (status);

-- One row holding every rate that differs from the built-in starting price: { "<key>": usd }.
create table if not exists public.rate_card (
  id boolean primary key default true check (id),
  prices jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.proposals enable row level security;
alter table public.rate_card enable row level security;

revoke all on public.proposals from anon, authenticated;
revoke all on public.rate_card from anon, authenticated;
