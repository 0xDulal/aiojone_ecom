'use client'

import { useUIStore } from '@/store/ui-store'
import { useCartStore } from '@/store/cart-store'
import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function CartDrawer() {
    const { isCartOpen, closeCart } = useUIStore()
    const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <Sheet open={isCartOpen} onOpenChange={closeCart}>
            <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
                <SheetHeader className="p-6 border-b">
                    <SheetTitle className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" />
                            Your Cart ({totalItems()})
                        </div>
                        {items.length > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => useCartStore.getState().clearCart()}
                                className="text-xs text-muted-foreground hover:text-destructive gap-1 px-2"
                            >
                                <Trash2 className="h-3 w-3" /> Clear
                            </Button>
                        )}
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                            <div className="p-4 bg-secondary rounded-full">
                                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Your cart is empty</h3>
                                <p className="text-muted-foreground">Add some premium items to get started.</p>
                            </div>
                            <Button onClick={closeCart} variant="outline">
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6 py-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-secondary">
                                        <Image
                                            src={item.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-semibold text-base line-clamp-1">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">${item.price}</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border rounded-md">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-none"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-none"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <SheetFooter className="p-6 border-t block space-y-4">
                        <div className="flex items-center justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>${totalPrice().toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <Button className="w-full h-12 text-lg rounded-xl" asChild onClick={closeCart}>
                            <Link href="/checkout">Checkout Now</Link>
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    )
}
