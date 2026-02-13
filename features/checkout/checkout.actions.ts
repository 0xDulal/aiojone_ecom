'use server'

import { createPaymentIntent } from '@/lib/stripe/server'
import { OrderService } from '@/features/orders/order.service'
import { createClient } from '@/lib/supabase/server'

export async function createCheckoutSession(orderData: {
    items: any[]
    total: number
    shippingAddress: any
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Authentication required' }
    }

    try {
        // 1. Create Payment Intent in Stripe
        const { clientSecret } = await createPaymentIntent(orderData.total, {
            userId: user.id,
            itemCount: orderData.items.length
        })

        if (!clientSecret) throw new Error('Failed to create payment intent')

        // 2. Extract Payment Intent ID from Secret (before the _secret_ part)
        const paymentIntentId = clientSecret.split('_secret')[0]

        // 3. Create initial order in database
        await OrderService.createOrder({
            userId: user.id,
            items: orderData.items,
            total: orderData.total,
            shippingAddress: orderData.shippingAddress,
            paymentIntentId: paymentIntentId,
            paymentMethod: 'stripe'
        })

        return { clientSecret }
    } catch (error: any) {
        console.error('Checkout error:', error)
        return { error: error.message || 'Failed to initialize checkout' }
    }
}

export async function completeCodCheckout(orderData: {
    items: any[]
    total: number
    shippingAddress: any
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return { error: 'Authentication required' }

    try {
        const order = await OrderService.createOrder({
            userId: user.id,
            items: orderData.items,
            total: orderData.total,
            shippingAddress: orderData.shippingAddress,
            paymentMethod: 'cod'
        })

        return { success: true, orderId: order.id }
    } catch (error: any) {
        console.error('COD Checkout error:', error)
        return { error: error.message || 'Failed to complete order' }
    }
}
