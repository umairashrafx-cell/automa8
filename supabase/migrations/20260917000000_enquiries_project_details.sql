-- Structured project details from the contact form (needs, country, timeline, current site),
-- and budgets shown in the visitor's currency, e.g. "PKR 30,000 – 150,000 (≈ $100 – $500)".
alter table public.enquiries
  add column if not exists services text[] not null default '{}'
    check (cardinality(services) <= 10),
  add column if not exists country text not null default ''
    check (char_length(country) <= 80),
  add column if not exists timeline text not null default ''
    check (char_length(timeline) <= 40),
  add column if not exists current_site text not null default ''
    check (char_length(current_site) <= 300);

alter table public.enquiries drop constraint if exists enquiries_budget_check;
alter table public.enquiries
  add constraint enquiries_budget_check check (char_length(budget) <= 120);

-- The website (anon role) may only insert, and only into listed columns.
grant insert (services, country, timeline, current_site) on public.enquiries to anon;
