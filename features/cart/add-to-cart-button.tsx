'use client'

import { Button } from '@/components/ui/button'
import { useCartStore } from '@/store/cart-store'
import { Product } from '@/types/product'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'

interface AddToCartButtonProps {
    product: Product
    variant?: 'default' | 'outline' | 'secondary'
    className?: string
    showIcon?: boolean
}

export function AddToCartButton({
    product,
    variant = 'default',
    className,
    showIcon = true
}: AddToCartButtonProps) {
    const { addItem } = useCartStore()

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem(product)
        toast.success(`${product.name} added to cart!`, {
            description: 'Your items are waiting in the cart.',
            action: {
                label: 'View Cart',
                onClick: () => console.log('Open Cart') // We could trigger openCart here if needed
            }
        })
    }

    return (
        <Button
            onClick={handleAddToCart}
            variant={variant}
            className={className}
        >
            {showIcon && <ShoppingCart className="mr-2 h-4 w-4" />}
            Add to Cart
        </Button>
    )
}
