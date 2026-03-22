-- Migration 002: Add messages, supporting_documents tables + work_order_number column
-- Run this in Supabase SQL Editor if your database was created from the original schema.sql

-- Add work_order_number column to engagements (if not already present)
alter table engagements add column if not exists work_order_number text;

-- Messages table (persistent client ↔ admin thread per engagement)
create table if not exists messages (
  id              uuid primary key default uuid_generate_v4(),
  engagement_id   uuid not null references engagements(id) on delete cascade,
  sender          text not null check (sender in ('admin','client')),
  body            text not null,
  created_at      timestamptz not null default now()
);

alter table messages enable row level security;

-- Supporting documents table (additional files attached to an engagement)
create table if not exists supporting_documents (
  id              uuid primary key default uuid_generate_v4(),
  engagement_id   uuid not null references engagements(id) on delete cascade,
  file_path       text not null,
  file_name       text not null,
  file_size       bigint,
  created_at      timestamptz not null default now()
);

alter table supporting_documents enable row level security;

-- Storage bucket for supporting documents (create via Supabase Storage UI or API):
-- 3. "supporting-documents" — private, for client-uploaded supplementary files
