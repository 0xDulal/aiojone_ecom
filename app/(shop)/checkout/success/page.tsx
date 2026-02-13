'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/store/cart-store'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SuccessPage() {
    const { clearCart } = useCartStore()

    useEffect(() => {
        clearCart()
    }, [clearCart])

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center bg-gradient-to-b from-background to-primary/5">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-background rounded-3xl shadow-2xl p-8 text-center space-y-6 border"
            >
                <div className="flex justify-center">
                    <div className="bg-primary/10 p-4 rounded-full">
                        <CheckCircle2 className="h-16 w-16 text-primary" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black tracking-tight">Order Placed Successfully!</h1>
                    <p className="text-muted-foreground italic">Thank you for choosing AioJone.</p>
                </div>

                <div className="p-4 bg-secondary/20 rounded-xl text-sm text-left space-y-2">
                    <p><strong>Order #TEMP-ORDER-ID</strong></p>
                    <p>A confirmation email has been sent to your inbox. We&apos;ll notify you once your premium items ship.</p>
                </div>

                <div className="flex flex-col gap-3">
                    <Button size="lg" className="w-full h-12 rounded-xl" asChild>
                        <Link href="/shop">
                            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button size="lg" variant="ghost" className="w-full h-12 rounded-xl" asChild>
                        <Link href="/profile">
                            View Orders
                        </Link>
                    </Button>
                </div>
            </motion.div>
        </main>
    )
}
