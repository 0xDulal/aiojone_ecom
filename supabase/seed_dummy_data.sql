-- Dummy Data Seed Script for AioJone Ecommerce

-- 1. Insert Categories
INSERT INTO public.categories (id, name, slug, description, image_url) VALUES
('a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a101111', 'Electronics', 'electronics', 'High-end gadgets and tech essentials', 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80'),
('b2c3d4e5-f6a7-4b6c-cd7e-8f9a10111212', 'Fashion', 'fashion', 'Trendy apparel and premium footwear', 'https://images.unsplash.com/photo-1445205170230-053b830c6039?w=800&q=80'),
('c3d4e5f6-a7b8-4c7d-de8f-9a1011121313', 'Home & Decor', 'home-decor', 'Elegant furniture and minimalist home accessories', 'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?w=800&q=80')
ON CONFLICT (slug) DO NOTHING;

-- 2. Insert Products
INSERT INTO public.products (name, slug, description, price, compare_at_price, images, category_id, status, is_featured) VALUES
('Pro Wireless Headphones', 'pro-wireless-headphones', 'Active noise cancelling, 40-hour battery life, and spatial audio support.', 299.00, 349.00, '{"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"}', 'a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a101111', 'published', true),
('Minimalist Ceramic Vase', 'minimalist-ceramic-vase', 'Handcrafted matte ceramic vase for modern interiors.', 45.00, 60.00, '{"https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&q=80"}', 'c3d4e5f6-a7b8-4c7d-de8f-9a1011121313', 'published', false),
('Urban Runner Sneakers', 'urban-runner-sneakers', 'Lightweight, breathable, and designed for maximum comfort.', 120.00, 150.00, '{"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"}', 'b2c3d4e5-f6a7-4b6c-cd7e-8f9a10111212', 'published', true),
('Smart Tech Watch', 'smart-tech-watch', 'Track your health, notifications, and fitness goals with ease.', 199.00, null, '{"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"}', 'a1b2c3d4-e5f6-4a5b-bc6d-7e8f9a101111', 'published', false),
('Premium Cotton Tee', 'premium-cotton-tee', '100% organic cotton, tailored fit, available in multiple shades.', 35.00, 45.00, '{"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"}', 'b2c3d4e5-f6a7-4b6c-cd7e-8f9a10111212', 'published', true)
ON CONFLICT (slug) DO NOTHING;
