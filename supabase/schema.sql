-- Bondscoach2026 Supabase database schema

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  display_name text,
  is_admin boolean not null default false,
  has_paid boolean not null default false,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  amount_cents integer not null default 500,
  currency text not null default 'EUR',
  method text not null default 'tikkie',
  status text not null default 'pending',
  note text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.matches (
  id uuid primary key default gen_random_uuid(),
  round text not null,
  home_team text not null,
  away_team text not null,
  home_score integer,
  away_score integer,
  starts_at timestamptz not null,
  status text not null default 'scheduled',
  created_at timestamptz not null default now()
);

create table public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  match_id uuid not null references public.matches(id) on delete cascade,
  predicted_home_score integer not null,
  predicted_away_score integer not null,
  points integer not null default 0,
  locked boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, match_id)
);

create table public.bonus_questions (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  correct_answer text,
  points integer not null default 10,
  closes_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.bonus_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id uuid not null references public.bonus_questions(id) on delete cascade,
  answer text not null,
  points integer not null default 0,
  created_at timestamptz not null default now(),
  unique(user_id, question_id)
);

create or replace function public.calculate_prediction_points(
  predicted_home integer,
  predicted_away integer,
  actual_home integer,
  actual_away integer
)
returns integer
language plpgsql
as $$
declare
  predicted_diff integer;
  actual_diff integer;
  predicted_result text;
  actual_result text;
begin
  predicted_diff := predicted_home - predicted_away;
  actual_diff := actual_home - actual_away;

  predicted_result := case
    when predicted_home > predicted_away then 'home'
    when predicted_home < predicted_away then 'away'
    else 'draw'
  end;

  actual_result := case
    when actual_home > actual_away then 'home'
    when actual_home < actual_away then 'away'
    else 'draw'
  end;

  if predicted_home = actual_home and predicted_away = actual_away then
    return 10;
  end if;

  if predicted_result = actual_result and predicted_diff = actual_diff then
    return 7;
  end if;

  if predicted_result = actual_result then
    return 5;
  end if;

  return 0;
end;
$$;

create or replace function public.recalculate_match_points(target_match_id uuid)
returns void
language plpgsql
as $$
declare
  actual_home integer;
  actual_away integer;
begin
  select home_score, away_score
  into actual_home, actual_away
  from public.matches
  where id = target_match_id;

  if actual_home is null or actual_away is null then
    raise exception 'Match result is not filled in yet';
  end if;

  update public.predictions
  set points = public.calculate_prediction_points(
    predicted_home_score,
    predicted_away_score,
    actual_home,
    actual_away
  ),
  updated_at = now()
  where match_id = target_match_id;
end;
$$;
