'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'


const categories = [
    {
        name: 'Tech & Gadgets',
        count: '24+ Items',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        slug: 'tech',
        className: 'md:col-span-2 md:row-span-2'
    },
    {
        name: 'Lifestyle',
        count: '12+ Items',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
        slug: 'lifestyle',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        name: 'Home Office',
        count: '18+ Items',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        slug: 'home-office',
        className: 'md:col-span-1 md:row-span-1'
    },
    {
        name: 'Accessories',
        count: '32+ Items',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
        slug: 'accessories',
        className: 'md:col-span-2 md:row-span-1'
    }
]

export function FeaturedCategories() {
    return (
        <section className="py-24 px-4 max-w-[1460px] mx-auto">
            <header className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-8">
                <div className="space-y-3">
                    <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-primary">Discover</h2>
                    <h3 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
                        Shop by <br className="sm:hidden" />
                        <span className="italic opacity-30">Category</span>
                    </h3>
                </div>
                <Link href="/shop" className="group flex items-center gap-2 font-bold hover:text-primary transition-all text-sm uppercase tracking-widest border-b-2 border-transparent hover:border-primary pb-1">
                    Explore All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </header>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className={cn(
                            "relative overflow-hidden rounded-[2.5rem] bg-secondary group",
                            cat.slug === 'tech' ? "md:col-span-2 md:row-span-2" : "col-span-1 row-span-1"
                        )}
                    >
                        <Link
                            href={`/shop?category=${cat.slug}`}
                            className="block h-full w-full"
                        >
                            <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end items-start">
                                <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">{cat.count}</p>
                                <h4 className="text-2xl font-black text-white group-hover:translate-x-2 transition-transform leading-tight">{cat.name}</h4>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}

