'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types/product'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ShoppingCart, Star, Heart } from 'lucide-react'

import { AddToCartButton } from '@/features/cart/add-to-cart-button'
import { Button } from '@/components/ui/button'

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const discount = product.compare_at_price
        ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
        : 0

    // Randomize some marketplace stats for demo
    const rating = 4.5
    const orders = 12

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <Card className="group overflow-hidden border bg-white transition-all hover:shadow-lg rounded-xl">
                <div className="relative aspect-square overflow-hidden bg-gray-50 border-b">
                    <Link href={`/product/${product.slug}`} className="block h-full w-full">
                        <Image
                            src={product.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80'}
                            alt={product.name}
                            fill
                            className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                        />
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-3 top-3 h-9 w-9 bg-white border shadow-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Heart className="h-5 w-5 text-gray-400 group-hover:text-primary" />
                    </Button>
                </div>

                <CardContent className="p-4 space-y-3">
                    <Link href={`/product/${product.slug}`} className="block">
                        <h3 className="text-sm font-medium text-gray-700 line-clamp-2 leading-relaxed min-h-[40px] hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={cn("h-3.5 w-3.5", i < 4 ? "fill-[#FF9017] text-[#FF9017]" : "text-gray-300")} />
                            ))}
                        </div>
                        <span className="text-xs font-bold text-[#FF9017]">{rating}</span>
                        <span className="text-xs font-medium text-gray-400">({orders} orders)</span>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-black text-gray-900">${product.price}</span>
                        {product.compare_at_price && (
                            <span className="text-sm text-gray-400 line-through">
                                ${product.compare_at_price}
                            </span>
                        )}
                    </div>

                    <Button
                        className="w-full h-10 gap-2 bg-white border border-primary/20 text-primary hover:bg-primary/5 font-bold rounded-lg shadow-sm"
                        asChild
                    >
                        <Link href={`/product/${product.slug}`}>
                            <ShoppingCart className="h-4 w-4" />
                            Add to cart
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}

