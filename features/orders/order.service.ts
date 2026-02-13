import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export class OrderService {
    static async createOrder(orderData: {
        userId: string
        items: any[]
        total: number
        shippingAddress: any
        paymentIntentId?: string
        paymentMethod: 'stripe' | 'cod'
    }) {
        const supabase = await createClient()

        // 1. Create order
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: orderData.userId,
                total_amount: orderData.total,
                shipping_address: orderData.shippingAddress,
                stripe_payment_intent_id: orderData.paymentIntentId || null,
                payment_method: orderData.paymentMethod,
                status: orderData.paymentMethod === 'cod' ? 'processing' : 'pending'
            })
            .select()
            .single()

        if (orderError) throw orderError

        // 2. Create order items
        const orderItems = orderData.items.map(item => ({
            order_id: order.id,
            product_id: item.id,
            variant_id: item.variantId || null,
            quantity: item.quantity,
            unit_price: item.price
        }))

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItems)

        if (itemsError) throw itemsError

        // 3. Decrement inventory (Using RPC for atomicity)
        const { error: inventoryError } = await supabaseAdmin.rpc('decrement_inventory', {
            p_items: orderData.items.map(item => ({ id: item.id, quantity: item.quantity }))
        })

        if (inventoryError) {
            console.error('Inventory Error:', inventoryError)
        }

        return order
    }

    static async updateOrderStatusByStripeId(paymentIntentId: string, status: string) {
        // Use admin client since webhooks might not have a user session
        const { error } = await supabaseAdmin
            .from('orders')
            .update({ status })
            .eq('stripe_payment_intent_id', paymentIntentId)

        if (error) throw error
    }
}
