'use client'

import { useCartStore } from '@/store/cart-store'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { getStripe } from '@/lib/stripe/client'
import { CheckoutForm } from '@/features/checkout/checkout-form'
import { createCheckoutSession, completeCodCheckout } from '@/features/checkout/checkout.actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Wallet, CreditCard } from 'lucide-react'

export default function CheckoutPage() {
    const { items, totalPrice } = useCartStore()
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'cod'>('cod')
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const { clearCart } = useCartStore()
    const router = useRouter()

    const subtotal = totalPrice()
    const shipping = 15.00
    const tax = subtotal * 0.08
    const total = subtotal + shipping + tax

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const shippingAddress = Object.fromEntries(formData.entries())

        if (paymentMethod === 'cod') {
            const result = await completeCodCheckout({
                items,
                total,
                shippingAddress
            })

            if (result.success) {
                toast.success("Order placed successfully!")
                clearCart()
                router.push('/checkout/success')
            } else {
                toast.error(result.error || "Failed to place order")
            }
        } else {
            const result = await createCheckoutSession({
                items,
                total,
                shippingAddress
            })

            if (result.clientSecret) {
                setClientSecret(result.clientSecret)
            } else {
                toast.error(result.error || "Initialization failed")
            }
        }
        setLoading(false)
    }

    if (items.length === 0 && !clientSecret) {
        return (
            <main className="min-h-screen pt-24 flex items-center justify-center">
                <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold">Your cart is empty</h1>
                    <Button asChild><a href="/shop">Go Shopping</a></Button>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 max-w-[1460px] mx-auto">
            <h1 className="text-3xl font-black mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {!clientSecret ? (
                        <section>
                            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                            <form onSubmit={handleCheckout} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" name="firstName" required className="rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" name="lastName" required className="rounded-xl" />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input id="address" name="address" required className="rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" name="city" required className="rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="postalCode">Postal Code</Label>
                                        <Input id="postalCode" name="postalCode" required className="rounded-xl" />
                                    </div>
                                </div>

                                <section className="pt-6 border-t">
                                    <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                                    <RadioGroup
                                        defaultValue="cod"
                                        onValueChange={(val: any) => setPaymentMethod(val as any)}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                                    >
                                        <Label
                                            htmlFor="cod"
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-secondary/20",
                                                paymentMethod === 'cod' ? "border-primary bg-primary/5" : "border-secondary"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                                    <Wallet className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Cash on Delivery</p>
                                                    <p className="text-xs text-muted-foreground">Pay when you receive</p>
                                                </div>
                                            </div>
                                            <RadioGroupItem value="cod" id="cod" className="sr-only" />
                                        </Label>

                                        <Label
                                            htmlFor="stripe"
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer hover:bg-secondary/20 opacity-50 grayscale",
                                                paymentMethod === 'stripe' ? "border-primary bg-primary/5" : "border-secondary"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                                                    <CreditCard className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Card Payment</p>
                                                    <p className="text-xs text-muted-foreground">Currently unavailable</p>
                                                </div>
                                            </div>
                                            <RadioGroupItem value="stripe" id="stripe" className="sr-only" disabled />
                                        </Label>
                                    </RadioGroup>
                                </section>

                                <Button type="submit" size="lg" className="w-full h-14 mt-6 rounded-2xl font-black text-lg shadow-xl shadow-primary/20" disabled={loading}>
                                    {loading ? "Processing..." : paymentMethod === 'cod' ? "Confirm Order" : "Proceed to Payment"}
                                </Button>
                            </form>
                        </section>
                    ) : (
                        <section className="animate-in fade-in slide-in-from-bottom duration-500">
                            <h2 className="text-xl font-bold mb-6">Secure Payment</h2>
                            <Elements stripe={getStripe()} options={{ clientSecret }}>
                                <CheckoutForm clientSecret={clientSecret} />
                            </Elements>
                            <Button variant="ghost" className="mt-4" onClick={() => setClientSecret(null)}>
                                ← Edit Shipping Info
                            </Button>
                        </section>
                    )}
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-xl bg-secondary/5 overflow-hidden">
                        <CardHeader className="bg-secondary/10 pt-6">
                            <CardTitle className="text-lg">Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="relative h-16 w-16 flex-shrink-0">
                                            <Image src={item.images[0]} alt={item.name} fill className="object-cover rounded" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">{item.quantity} x ${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
                                <div className="flex justify-between font-black text-lg pt-2 border-t"><span>Total</span><span>${total.toFixed(2)}</span></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
    )
}
