import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-01-27' as any, // Use latest stable
    appInfo: {
        name: 'AioJone Ecommerce',
        version: '0.1.0',
    },
})

export async function createPaymentIntent(amount: number, metadata: any) {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata,
        })

        return { clientSecret: paymentIntent.client_secret }
    } catch (error: any) {
        console.error('Stripe error:', error.message)
        throw new Error('Could not initialize payment')
    }
}
