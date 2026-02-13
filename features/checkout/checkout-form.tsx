'use client'

import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { toast } from 'sonner'

export function CheckoutForm({ clientSecret }: { clientSecret: string }) {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { clearCart } = useCartStore()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/checkout/success`,
            },
        })

        if (error) {
            toast.error(error.message || 'An unexpected error occurred.')
            setLoading(false)
        } else {
            // confirmPayment usually redirects, but if not:
            clearCart()
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button
                type="submit"
                size="lg"
                className="w-full h-12 rounded-xl text-lg font-bold"
                disabled={loading || !stripe || !elements}
            >
                {loading ? "Processing..." : "Pay Now"}
            </Button>
        </form>
    )
}
