-- CV-Pilot SaaS Database Schema --
-- Run this inside the Supabase SQL Editor --

-- 1. Users Extension (We link our profile table to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'premium', 'pro')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CV Versions Table (Storing the comprehensive JSON schema)
CREATE TABLE IF NOT EXISTS public.cv_versions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL, -- e.g. "Software Engineer Google", "Frontend Master"
    cv_data JSONB NOT NULL, -- The massive Universal Schema
    is_master BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Job Applications Tracker
CREATE TABLE IF NOT EXISTS public.job_applications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    cv_version_id UUID REFERENCES public.cv_versions(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    company_url TEXT,
    job_title TEXT NOT NULL,
    job_url TEXT,
    match_score INTEGER,
    cover_letter TEXT,
    status TEXT DEFAULT 'preparing' CHECK (status IN ('preparing', 'applied', 'interviewing', 'rejected', 'hired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Row Level Security (RLS) for public endpoints if needed
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- 5. Storage Bucket for User Uploads (Profile pictures, raw PDFs)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cv_assets', 'cv_assets', true)
ON CONFLICT (id) DO NOTHING;
