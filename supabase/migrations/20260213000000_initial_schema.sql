-- Initial Supabase Schema for Production Ecommerce Platform

-- 1. Profiles (linked to auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text check (role in ('admin', 'customer')) default 'customer',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Categories
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  parent_id uuid references public.categories(id),
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Products
create table public.products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  images text[] default '{}',
  category_id uuid references public.categories(id),
  status text check (status in ('draft', 'published', 'archived')) default 'draft',
  is_featured boolean default false,
  metadata jsonb default '{}'::jsonb,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Product Variants
create table public.product_variants (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  name text not null,
  sku text unique not null,
  price_override numeric(10,2),
  inventory_count integer default 0,
  options jsonb default '{}'::jsonb, -- e.g., {"size": "L", "color": "Red"}
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Orders
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  status text check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')) default 'pending',
  total_amount numeric(10,2) not null,
  shipping_address jsonb not null,
  stripe_payment_intent_id text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Order Items
create table public.order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) not null,
  variant_id uuid references public.product_variants(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Wishlist
create table public.wishlists (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, product_id)
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.wishlists enable row level security;

-- RLS Policies

-- Profiles: Users can select/update their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Categories: Publicly readable
create policy "Categories are publicly readable" on categories for select using (true);

-- Products: Publicly readable if published
create policy "Published products are publicly readable" on products for select using (status = 'published');

-- Product Variants: Publicly readable
create policy "Variants are publicly readable" on product_variants for select using (true);

-- Orders: Users can see their own orders
create policy "Users can view own orders" on orders for select using (auth.uid() = user_id);

-- Order Items: Users can see items of their own orders
create policy "Users can view own order items" on order_items for select using (
  exists (
    select 1 from orders where orders.id = order_id and orders.user_id = auth.uid()
  )
);

-- Wishlist: Users can manage their own wishlist
create policy "Users can manage own wishlist" on wishlists for all using (auth.uid() = user_id);

-- Admin Policies (Simplified Check)
create policy "Admins have full access to products" on products for all using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
-- ... (Similar policies for other tables for admins)
