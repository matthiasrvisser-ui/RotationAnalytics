-- Run this in Supabase SQL Editor

create extension if not exists "uuid-ossp";

create table if not exists engagements (
  id                    uuid primary key default uuid_generate_v4(),
  created_at            timestamptz not null default now(),
  status                text not null default 'draft'
                        check (status in (
                          'draft','agreement_signed','submission_complete',
                          'in_analysis','invoice_issued','awaiting_payment',
                          'paid','delivered','closed'
                        )),
  -- Client
  org_name              text not null,
  contact_name          text not null,
  email                 text not null,
  phone                 text,
  -- Agreement
  agreement_version     text not null,
  agreement_signed_at   timestamptz not null,
  agreement_ip          text,
  -- Submission
  collective_agreement  text not null,
  local_conditions      text,
  notes                 text,
  rotation_file_path    text,
  -- Status token (for client status page — not a secret, just a stable identifier)
  status_token          uuid not null default uuid_generate_v4(),
  -- Deliverable
  deliverable_path      text,
  deliverable_token     uuid,
  deliverable_expires_at timestamptz,
  -- Invoice
  invoice_number        text,
  invoice_amount        numeric(10,2),
  invoice_issued_at     timestamptz,
  payment_confirmed_at  timestamptz,
  -- Admin
  admin_notes           text
);

create unique index on engagements (status_token);

create table if not exists audit_log (
  id              uuid primary key default uuid_generate_v4(),
  engagement_id   uuid not null references engagements(id) on delete cascade,
  action          text not null,
  actor           text not null check (actor in ('admin','system','client')),
  created_at      timestamptz not null default now(),
  metadata        jsonb
);

-- Storage buckets (run via Supabase Storage UI or API):
-- 1. "rotations"   — private, for client-uploaded rotation files
-- 2. "deliverables" — private, for analyst-uploaded deliverables

-- RLS: engagements table — deny all public access (all reads/writes via service role key in API routes)
alter table engagements enable row level security;
alter table audit_log enable row level security;
-- No permissive policies — all access is via supabaseAdmin (service role bypasses RLS)
