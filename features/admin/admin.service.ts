import { supabaseAdmin } from '@/lib/supabase/admin'

export class AdminService {
    static async getDashboardStats() {
        const [
            { data: orders, error: ordersError },
            { count: userCount, error: usersError },
            { data: recentOrders, error: recentOrdersError }
        ] = await Promise.all([
            // Fetch all orders for revenue calculation
            supabaseAdmin.from('orders').select('total_amount, status'),
            // Fetch total users count
            supabaseAdmin.from('profiles').select('*', { count: 'exact', head: true }),
            // Fetch 5 most recent orders with profile info
            supabaseAdmin.from('orders')
                .select('*, profiles(full_name)')
                .order('created_at', { ascending: false })
                .limit(5)
        ])

        if (ordersError || usersError || recentOrdersError) {
            console.error('Admin Stats Error:', { ordersError, usersError, recentOrdersError })
            throw new Error('Failed to fetch admin statistics')
        }

        const stats = {
            totalRevenue: orders?.reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) || 0,
            salesCount: orders?.length || 0,
            userCount: userCount || 0,
            activeOrders: orders?.filter(o => !['delivered', 'cancelled'].includes(o.status)).length || 0,
            recentOrders: recentOrders || []
        }

        return stats
    }

    static async getAllProducts() {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('*, categories(*)')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    static async getAllOrders() {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*, profiles(*)')
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }

    static async getCategories() {
        const { data, error } = await supabaseAdmin
            .from('categories')
            .select('*')
            .order('name')

        if (error) throw error
        return data
    }

    static async createProduct(productData: any) {
        const { data, error } = await supabaseAdmin
            .from('products')
            .insert(productData)
            .select()
            .single()

        if (error) throw error
        return data
    }

    static async updateProduct(id: string, productData: any) {
        const { data, error } = await supabaseAdmin
            .from('products')
            .update(productData)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }

    static async deleteProduct(id: string) {
        const { error } = await supabaseAdmin
            .from('products')
            .delete()
            .eq('id', id)

        if (error) throw error
    }

    static async getProductById(id: string) {
        const { data, error } = await supabaseAdmin
            .from('products')
            .select('*, categories(*)')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }

    static async updateOrderStatus(id: string, status: string) {
        const { data, error } = await supabaseAdmin
            .from('orders')
            .update({ status })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}
