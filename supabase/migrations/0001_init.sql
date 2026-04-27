create extension if not exists "uuid-ossp";
create extension if not exists "pgvector";

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  company_name text,
  preferred_locale text default 'en',
  hubspot_contact_id text,
  created_at timestamptz default now()
);

create table leads (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  phone text,
  source text,
  service_interest text,
  industry text,
  payload jsonb,
  utm jsonb,
  crm_synced_at timestamptz,
  created_at timestamptz default now()
);

create table companies (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete cascade,
  legal_name text not null,
  trade_name text,
  jurisdiction text,
  free_zone text,
  license_type text,
  created_at timestamptz default now()
);

create table licenses (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  license_number text,
  issuing_authority text,
  issue_date date,
  expiry_date date,
  status text,
  document_url text,
  created_at timestamptz default now()
);

create table visas (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  holder_name text,
  passport_number text,
  visa_type text,
  issue_date date,
  expiry_date date,
  emirates_id text,
  status text,
  created_at timestamptz default now()
);

create table compliance_items (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  item_type text,
  due_date date,
  status text,
  notes text,
  created_at timestamptz default now()
);

create table documents (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  category text,
  file_name text,
  storage_path text,
  uploaded_by uuid references profiles(id),
  created_at timestamptz default now()
);

create table reminders (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  title text,
  due_date date,
  related_type text,
  related_id uuid,
  notified boolean default false,
  created_at timestamptz default now()
);

create table chat_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  anonymous_id text,
  handoff_requested boolean default false,
  created_at timestamptz default now()
);

create table chat_messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references chat_sessions(id) on delete cascade,
  role text,
  content text,
  citations jsonb,
  created_at timestamptz default now()
);

create table rag_chunks (
  id uuid primary key default uuid_generate_v4(),
  source_type text,
  source_id text,
  locale text,
  content text,
  embedding vector(1536),
  url text,
  updated_at timestamptz default now()
);
create index on rag_chunks using ivfflat (embedding vector_cosine_ops);

-- RLS
alter table profiles enable row level security;
alter table companies enable row level security;
alter table licenses enable row level security;
alter table visas enable row level security;
alter table compliance_items enable row level security;
alter table documents enable row level security;
alter table reminders enable row level security;

create policy "owner_read_profile" on profiles for select using (auth.uid() = id);
create policy "owner_update_profile" on profiles for update using (auth.uid() = id);
create policy "owner_companies" on companies for all using (owner_id = auth.uid());
create policy "owner_licenses" on licenses for all using (company_id in (select id from companies where owner_id = auth.uid()));
create policy "owner_visas" on visas for all using (company_id in (select id from companies where owner_id = auth.uid()));
create policy "owner_compliance" on compliance_items for all using (company_id in (select id from companies where owner_id = auth.uid()));
create policy "owner_documents" on documents for all using (company_id in (select id from companies where owner_id = auth.uid()));
create policy "owner_reminders" on reminders for all using (company_id in (select id from companies where owner_id = auth.uid()));

-- Vector similarity helper
create or replace function match_rag_chunks(query_embedding vector(1536), match_count int, locale text)
returns table (id uuid, content text, url text, similarity float)
language sql stable as $$
  select id, content, url, 1 - (embedding <=> query_embedding) as similarity
  from rag_chunks
  where rag_chunks.locale = match_rag_chunks.locale
  order by embedding <=> query_embedding
  limit match_count;
$$;
