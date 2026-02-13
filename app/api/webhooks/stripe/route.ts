import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe/server'
import { OrderService } from '@/features/orders/order.service'

export async function POST(req: Request) {
    const body = await req.text()
    const signature = (await headers()).get('Stripe-Signature') as string

    let event

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
    }

    const session = event.data.object as any

    if (event.type === 'payment_intent.succeeded') {
        await OrderService.updateOrderStatusByStripeId(session.id, 'processing')
    }

    if (event.type === 'payment_intent.payment_failed') {
        await OrderService.updateOrderStatusByStripeId(session.id, 'cancelled')
    }

    return new NextResponse(null, { status: 200 })
}
