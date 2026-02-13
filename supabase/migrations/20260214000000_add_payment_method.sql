-- 1. Add payment_method column
ALTER TABLE public.orders 
ADD COLUMN IF NOT EXISTS payment_method text CHECK (payment_method IN ('stripe', 'cod')) DEFAULT 'stripe';

-- 2. Make stripe_payment_intent_id optional
ALTER TABLE public.orders 
ALTER COLUMN stripe_payment_intent_id DROP NOT NULL;

-- 3. RLS Policies (Idempotent)
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders;
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own order items" ON public.order_items;
CREATE POLICY "Users can insert own order items" ON public.order_items FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders WHERE orders.id = order_id AND orders.user_id = auth.uid()
  )
);

-- 4. Profile Sync Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'customer')
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger (Idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Sync existing users
-- 5. Add inventory_count to products table (With safety check)
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS inventory_count integer DEFAULT 0 CHECK (inventory_count >= 0);

-- 6. Function to handle inventory decrement (RPC)
CREATE OR REPLACE FUNCTION public.decrement_inventory(p_items jsonb)
RETURNS void AS $$
DECLARE
  item record;
BEGIN
  FOR item IN SELECT * FROM jsonb_to_recordset(p_items) AS x(id uuid, quantity int)
  LOOP
    UPDATE public.products
    SET inventory_count = inventory_count - item.quantity
    WHERE id = item.id;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
