# Database Setup Instructions

Your application is failing because the database tables haven't been created yet. Follow these steps to set up your database:

## Option 1: Using Supabase Dashboard (Recommended)

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** tab
3. Copy the entire contents of `supabase/migrations/20250605072313_icy_lodge.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the migration

## Option 2: Using Supabase CLI (if available)

If you have the Supabase CLI installed and configured:

```bash
supabase db push
```

## What this creates:

- **reviews** table with columns: id, user_id, name, location, rating, text, image, status, created_at
- **bookings** table with columns: id, user_id, type, item_id, check_in, check_out, date, time, guests, status, total_amount, payment_status, payment_method, created_at
- Row Level Security (RLS) policies for both tables
- Proper authentication and authorization rules

## After setup:

Once you've run the migration, refresh your application and the errors should be resolved.