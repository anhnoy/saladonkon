/*
  # Hotel Management System Database Schema

  1. New Tables
    - profiles
      - id (uuid, primary key, references auth.users)
      - email (text)
      - full_name (text)
      - phone (text)
      - role (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - rooms
      - id (uuid, primary key)
      - room_number (text, unique)
      - name (text)
      - slug (text)
      - description (text)
      - long_description (text)
      - price (numeric)
      - size (integer)
      - capacity (integer)
      - beds (text)
      - amenities (text[])
      - featured (boolean)
      - images (text[])
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - activities
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - category_id (text)
      - images (text[])
      - pricing_format (text)
      - pricing_data (jsonb)
      - schedule_type (text)
      - schedule_data (jsonb)
      - capacity_min (integer)
      - capacity_max (integer)
      - duration (text)
      - included (text[])
      - requirements (text[])
      - notes (text)
      - contact_options (jsonb)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
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
      - updated_at (timestamptz)
    
    - bookings
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - type (text)
      - item_id (text)
      - room_id (uuid, references rooms)
      - activity_id (uuid, references activities)
      - check_in (timestamptz)
      - check_out (timestamptz)
      - booking_date (timestamptz)
      - booking_time (text)
      - adults (integer)
      - children (integer)
      - children_ages (integer[])
      - special_requests (text)
      - pricing_details (jsonb)
      - status (text)
      - total_amount (numeric)
      - payment_status (text)
      - payment_method (text)
      - payment_data (jsonb)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - pricing_settings
      - id (uuid, primary key)
      - extra_adult_price (numeric)
      - extra_child_price (numeric)
      - child_free_age (integer)
      - service_fee (numeric)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - hotel_settings
      - id (uuid, primary key)
      - hotel_name (text)
      - email (text)
      - phone (text)
      - address (text)
      - website_url (text)
      - timezone (text)
      - currency (text)
      - social_media (jsonb)
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - homepage_content
      - id (uuid, primary key)
      - hero_slides (jsonb)
      - sections_content (jsonb)
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and admins
    - Public read access for certain data
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role text DEFAULT 'guest' CHECK (role IN ('guest', 'admin', 'super_admin')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Rooms Table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number text UNIQUE NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  description text NOT NULL,
  long_description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  size integer NOT NULL CHECK (size > 0),
  capacity integer NOT NULL CHECK (capacity > 0),
  beds text NOT NULL,
  amenities text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  images text[] DEFAULT '{}',
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Rooms Policies
CREATE POLICY "Anyone can read active rooms"
  ON rooms
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can manage rooms"
  ON rooms
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Activities Table
CREATE TABLE IF NOT EXISTS activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  category_id text NOT NULL,
  images text[] DEFAULT '{}',
  pricing_format text NOT NULL CHECK (pricing_format IN ('fixed', 'hourly', 'daily', 'tiered')),
  pricing_data jsonb NOT NULL DEFAULT '{}',
  schedule_type text NOT NULL CHECK (schedule_type IN ('specific', 'weekly', 'flexible')),
  schedule_data jsonb NOT NULL DEFAULT '{}',
  capacity_min integer NOT NULL CHECK (capacity_min > 0),
  capacity_max integer NOT NULL CHECK (capacity_max >= capacity_min),
  duration text NOT NULL,
  included text[] DEFAULT '{}',
  requirements text[] DEFAULT '{}',
  notes text,
  contact_options jsonb NOT NULL DEFAULT '{}',
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

-- Activities Policies
CREATE POLICY "Anyone can read active activities"
  ON activities
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Admins can manage activities"
  ON activities
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text text NOT NULL,
  image text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Reviews Policies
CREATE POLICY "Anyone can read approved reviews"
  ON reviews
  FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Authenticated users can create reviews"
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
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE SET NULL,
  type text NOT NULL CHECK (type IN ('room', 'activity')),
  item_id text NOT NULL,
  room_id uuid REFERENCES rooms(id) ON DELETE SET NULL,
  activity_id uuid REFERENCES activities(id) ON DELETE SET NULL,
  check_in timestamptz,
  check_out timestamptz,
  booking_date timestamptz,
  booking_time text,
  adults integer NOT NULL DEFAULT 1 CHECK (adults > 0),
  children integer NOT NULL DEFAULT 0 CHECK (children >= 0),
  children_ages integer[] DEFAULT '{}',
  special_requests text,
  pricing_details jsonb NOT NULL DEFAULT '{}',
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_amount numeric NOT NULL CHECK (total_amount >= 0),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_method text NOT NULL CHECK (payment_method IN ('card', 'bank', 'hotel')),
  payment_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Bookings Policies
CREATE POLICY "Users can read their own bookings"
  ON bookings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create bookings"
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
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Pricing Settings Table
CREATE TABLE IF NOT EXISTS pricing_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  extra_adult_price numeric NOT NULL DEFAULT 10 CHECK (extra_adult_price >= 0),
  extra_child_price numeric NOT NULL DEFAULT 10 CHECK (extra_child_price >= 0),
  child_free_age integer NOT NULL DEFAULT 6 CHECK (child_free_age >= 0),
  service_fee numeric NOT NULL DEFAULT 25 CHECK (service_fee >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE pricing_settings ENABLE ROW LEVEL SECURITY;

-- Pricing Settings Policies
CREATE POLICY "Anyone can read pricing settings"
  ON pricing_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage pricing settings"
  ON pricing_settings
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Hotel Settings Table
CREATE TABLE IF NOT EXISTS hotel_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_name text NOT NULL DEFAULT 'SaLaDonKon',
  email text NOT NULL DEFAULT 'saladonekhone@gmail.com',
  phone text NOT NULL DEFAULT '+856 20 9876 4429',
  address text NOT NULL DEFAULT 'No. 09 Unit 01 Ban Khone Village Khong District, Champassak Province, Lao PDR',
  website_url text DEFAULT 'https://www.saladonkon.com',
  timezone text NOT NULL DEFAULT 'Asia/Bangkok',
  currency text NOT NULL DEFAULT 'USD',
  social_media jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE hotel_settings ENABLE ROW LEVEL SECURITY;

-- Hotel Settings Policies
CREATE POLICY "Anyone can read hotel settings"
  ON hotel_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage hotel settings"
  ON hotel_settings
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Homepage Content Table
CREATE TABLE IF NOT EXISTS homepage_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_slides jsonb NOT NULL DEFAULT '[]',
  sections_content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Homepage Content Policies
CREATE POLICY "Anyone can read homepage content"
  ON homepage_content
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage homepage content"
  ON homepage_content
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'super_admin')
    )
  );

-- Insert default pricing settings
INSERT INTO pricing_settings (extra_adult_price, extra_child_price, child_free_age, service_fee)
VALUES (10, 10, 6, 25)
ON CONFLICT DO NOTHING;

-- Insert default hotel settings
INSERT INTO hotel_settings (hotel_name, email, phone, address)
VALUES (
  'SaLaDonKon',
  'saladonekhone@gmail.com',
  '+856 20 9876 4429',
  'No. 09 Unit 01 Ban Khone Village Khong District, Champassak Province, Lao PDR'
)
ON CONFLICT DO NOTHING;

-- Insert default homepage content
INSERT INTO homepage_content (hero_slides, sections_content)
VALUES (
  '[
    {
      "image": "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "title": "Experience Luxury",
      "subtitle": "Where elegance meets comfort"
    },
    {
      "image": "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "title": "Unforgettable Moments",
      "subtitle": "Create memories that last a lifetime"
    },
    {
      "image": "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "title": "Serene Retreats",
      "subtitle": "Find peace in our unique accommodations"
    }
  ]',
  '{
    "rooms": {
      "title": "Our SaLaDonKon Accommodations",
      "subtitle": "Experience the perfect blend of traditional elegance and modern comfort in our carefully designed rooms and villas."
    },
    "activities": {
      "title": "Discover Our Experiences",
      "subtitle": "Immerse yourself in authentic cultural experiences and relaxing activities designed to enrich your stay."
    }
  }'
)
ON CONFLICT DO NOTHING;

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers to all tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_rooms_updated_at BEFORE UPDATE ON rooms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pricing_settings_updated_at BEFORE UPDATE ON pricing_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hotel_settings_updated_at BEFORE UPDATE ON hotel_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_homepage_content_updated_at BEFORE UPDATE ON homepage_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_featured ON rooms(featured);
CREATE INDEX IF NOT EXISTS idx_activities_status ON activities(status);
CREATE INDEX IF NOT EXISTS idx_activities_category ON activities(category_id);
CREATE INDEX IF NOT EXISTS idx_reviews_status ON reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON reviews(rating);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_type ON bookings(type);
CREATE INDEX IF NOT EXISTS idx_bookings_check_in ON bookings(check_in);
CREATE INDEX IF NOT EXISTS idx_bookings_check_out ON bookings(check_out);