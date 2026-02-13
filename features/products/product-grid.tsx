'use client'

import { Product } from '@/types/product'
import { ProductCard } from './product-card'
import { motion } from 'framer-motion'

interface ProductGridProps {
    products: Product[]
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
}

export function ProductGrid({ products }: ProductGridProps) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
            {products.map((product) => (
                <motion.div key={product.id} variants={item}>
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </motion.div>
    )
}
