'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ShoppingBag } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
            {/* Background Abstract Shapes */}
            <div className="absolute inset-0 -z-10 bg-background">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center lg:text-left space-y-8 relative z-10"
                    >

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Next Generation Collection
                        </div>

                        <h1 className="text-5xl sm:text-7xl font-black tracking-tight leading-[1.1]">
                            Elevate Your <br />
                            <span className="text-primary italic">Digital Lifestyle.</span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Experience the pinnacle of premium design and performance. Our curated summer drops are here to redefine your everyday carries.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Button size="lg" className="h-14 px-8 text-lg rounded-2xl shadow-xl shadow-primary/20 group" asChild>
                                <Link href="/shop">
                                    Shop All Products <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-2xl border-2" asChild>
                                <Link href="/shop?tab=categories">
                                    View Collections
                                </Link>
                            </Button>
                        </div>

                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Trusted BY</div>
                            <div className="flex gap-6 items-center">
                                <div className="text-xl font-bold tracking-tighter">VOGUE</div>
                                <div className="text-xl font-bold tracking-tighter">NIKE</div>
                                <div className="text-xl font-bold tracking-tighter">APPLE</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-[4/5] w-full max-w-md mx-auto group">
                            {/* Floating Card UI */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -top-10 -left-10 z-20 bg-background/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/20 hidden xl:block"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                                        <ShoppingBag className="text-primary-foreground h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Market Status</p>
                                        <p className="text-lg font-black tracking-tight">Trending Now</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-[3rem] -rotate-6 scale-95 transition-transform group-hover:rotate-0 duration-700" />
                            <div className="relative h-full w-full rounded-[3rem] overflow-hidden border-8 border-background shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&q=90"
                                    alt="Featured Premium Item"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
