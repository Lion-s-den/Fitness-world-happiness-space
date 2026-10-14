# Fitness World Happiness Space

A membership-focused fitness web application with Supabase authentication.

## Features (Phase 1 – Membership)

- User Sign Up / Login / Logout
- Protected Dashboard
- Profile management
- Membership status tracking
- Shared Header & Footer on every page
- Responsive design

## Tech Stack

- **Frontend**: Pure HTML + CSS + Vanilla JavaScript
- **Auth & Database**: Supabase
- **Hosting**: Vercel (recommended)
- **Version Control**: GitHub

## Project Structure

```
├── index.html          # Landing page
├── login.html
├── signup.html
├── dashboard.html      # Protected
├── profile.html        # Protected
├── css/
│   ├── style.css
│   ├── auth.css
│   └── dashboard.css
├── js/
│   ├── supabase-config.js
│   ├── auth.js
│   ├── protected.js
│   ├── header.js
│   └── footer.js
├── .gitignore
├── .env.example
└── README.md
```

## Setup Instructions

### 1. Supabase Setup

1. Go to your Supabase project: https://xctkmaxffamccaxreqam.supabase.co
2. Enable **Email** authentication (Authentication → Providers)
3. Create the `profiles` table:

```sql
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  membership_status text default 'free',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);
```

### 2. Local Development

1. Clone the repo
2. Copy `.env.example` → `.env` and fill in your keys
3. Open any HTML file with a local server

Recommended: use VS Code Live Server or:

```bash
npx serve .
```

### 3. Deploy to Vercel

1. Import the repo in Vercel
2. Add Environment Variables (optional, keys are already in supabase-config.js):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Deploy

## Next Phases

- Camera-based movement tracking
- AI-generated exercise suggestions
- Real membership tiers & payments

---

**Move better. Feel happier.**
