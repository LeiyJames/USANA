-- Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own data" ON public.users;
DROP POLICY IF EXISTS "Users can update their own data" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own data" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.users;

-- Create a default policy that allows reading the role column
CREATE POLICY "Enable read access for all users"
  ON public.users
  FOR SELECT
  USING (true);

-- Create policies for other operations
CREATE POLICY "Users can update their own data"
  ON public.users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data"
  ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.users TO authenticated;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.products CASCADE;

-- Create products table
CREATE TABLE public.products (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    name text NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    image text,
    category text,
    stock integer DEFAULT 0,
    featured boolean DEFAULT false,
    tags text[] DEFAULT '{}',
    body_benefits text[] DEFAULT '{}',
    ingredients text[] DEFAULT '{}',
    usage_instructions text,
    key_features text[] DEFAULT '{}',
    safety_info text,
    best_seller boolean DEFAULT false
);

-- Enable RLS on products table
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policies for products table
DROP POLICY IF EXISTS "Enable read access for all users" ON public.products;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.products;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON public.products;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON public.products;

CREATE POLICY "Enable read access for all users"
  ON public.products
  FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for authenticated users only"
  ON public.products
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
  ON public.products
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Enable delete for authenticated users only"
  ON public.products
  FOR DELETE
  TO authenticated
  USING (true);

-- Drop existing storage bucket and policies
DROP POLICY IF EXISTS "Give public access to product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update product images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete product images" ON storage.objects;

-- Create or update storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Create new storage policies with proper permissions
CREATE POLICY "Give public access to product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

CREATE POLICY "Allow authenticated users to upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

-- Grant storage permissions
GRANT ALL ON storage.objects TO authenticated;
GRANT ALL ON storage.objects TO service_role;
GRANT ALL ON storage.buckets TO authenticated;
GRANT ALL ON storage.buckets TO service_role;

-- Add missing columns if they don't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'users' AND column_name = 'role') THEN
        ALTER TABLE public.users ADD COLUMN role text DEFAULT 'user';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'users' AND column_name = 'name') THEN
        ALTER TABLE public.users ADD COLUMN name text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'users' AND column_name = 'phone') THEN
        ALTER TABLE public.users ADD COLUMN phone text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                  WHERE table_name = 'users' AND column_name = 'address') THEN
        ALTER TABLE public.users ADD COLUMN address jsonb;
    END IF;
END $$;

-- Insert or update the admin user
INSERT INTO public.users (id, email, name, role)
VALUES (
  '20e97295-6a12-4efb-881e-0f9f7069e50f',
  'leighpresno114@gmail.com',
  'Leigh',
  'admin'
)
ON CONFLICT (id) DO UPDATE
SET role = 'admin'; 