import { createClient } from '@/lib/supabase/server'
import { Product, Category } from '@/types/product'

export class ProductService {
    static async getPublishedProducts(limit = 12) {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('status', 'published')
            .limit(limit)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching published products:', error.message || error)
            throw error
        }
        return data as (Product & { categories: Category })[]
    }

    static async getProductBySlug(slug: string) {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*), product_variants(*)')
            .eq('slug', slug)
            .eq('status', 'published')
            .single()

        if (error) {
            console.error(`Error fetching product ${slug}:`, error.message || error)
            return null
        }
        return data as (Product & { categories: Category; product_variants: any[] })
    }

    static async getFeaturedProducts() {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('status', 'published')
            .eq('is_featured', true)
            .limit(4)

        if (error) {
            console.error('Error fetching featured products:', error.message || error)
            throw error
        }
        return data as Product[]
    }

    static async getCategories() {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('name')

        if (error) {
            console.error('Error fetching categories:', error.message || error)
            throw error
        }
        return data as Category[]
    }

    static async getDeals(limit = 5) {
        const supabase = await createClient()
        const { data, error } = await supabase
            .from('products')
            .select('*, categories(*)')
            .eq('status', 'published')
            .not('compare_at_price', 'is', null)
            .limit(limit)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching deals:', error.message || error)
            throw error
        }

        // Filter in JS to double check compare_at_price > price
        return (data as (Product & { categories: Category })[]).filter(p =>
            p.compare_at_price && p.compare_at_price > p.price
        ).slice(0, limit)
    }
}
