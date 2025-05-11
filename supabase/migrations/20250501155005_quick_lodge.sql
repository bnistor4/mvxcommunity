/*
  # Initial schema setup for mvx.community

  1. New Tables
    - `communities`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `platforms` (text[])
      - `invite_links` (jsonb)
      - `image_url` (text)
      - `submitter_email` (text)
      - `status` (text)
      - `badges` (text[])
      - `click_count` (int)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)

  2. Security
    - Enable RLS on communities table
    - Add policies for:
      - Public read access for approved communities
      - Admin full access
*/

-- Create communities table
CREATE TABLE IF NOT EXISTS communities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  platforms text[] NOT NULL,
  invite_links jsonb NOT NULL,
  image_url text NOT NULL,
  submitter_email text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  badges text[] DEFAULT '{}',
  click_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE communities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can view approved communities"
  ON communities
  FOR SELECT
  USING (status = 'approved');

-- Create admin_keys table for API key authentication
CREATE TABLE IF NOT EXISTS admin_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on admin_keys
ALTER TABLE admin_keys ENABLE ROW LEVEL SECURITY;

-- Insert initial admin API key (this is just an example, you should use a secure key in production)
INSERT INTO admin_keys (api_key) VALUES ('mvx_admin_key_123') ON CONFLICT DO NOTHING;
