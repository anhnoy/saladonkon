/*
  # Create Database Schema

  1. New Tables
    - reviews
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - name (text)
      - location (text)
      - rating (integer)
      - text (text)
      - image (text)
      - status (text)
      - created_at (timestamptz)
    
    - bookings
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - type (text)
      - item_id (text)
      - check_in (timestamptz)
      - check_out (timestamptz)
      - date (timestamptz)
      - time (text)
      - guests (integer)
      - status (text)
      - total_amount (numeric)
      - payment_status (text)
      - payment_method (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for read/write access
*/

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  image text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Reviews Policies
CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Users can create reviews"
  ON reviews
  FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reviews"
  ON reviews
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'role' = 'super_admin'
  );

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  type text NOT NULL CHECK (type IN ('room', 'activity')),
  item_id text NOT NULL,
  check_in timestamptz,
  check_out timestamptz,
  date timestamptz,
  time text,
  guests integer NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_amount numeric NOT NULL,
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid')),
  payment_method text NOT NULL CHECK (payment_method IN ('card', 'hotel')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Bookings Policies
CREATE POLICY "Users can read their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own bookings"
  ON bookings
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all bookings"
  ON bookings
  USING (
    auth.jwt() ->> 'role' = 'admin' OR
    auth.jwt() ->> 'role' = 'super_admin'
  );