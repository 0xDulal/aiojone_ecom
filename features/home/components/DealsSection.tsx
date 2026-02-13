'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/types/product'

interface DealsSectionProps {
    deals: Product[]
}

export function DealsSection({ deals }: DealsSectionProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 4,
        hours: 13,
        mins: 34,
        secs: 56
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 }
                if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 }
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 }
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 }
                return prev
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        <section className="py-6 w-full">
            <div className="max-w-[1460px] mx-auto px-4">
                <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
                    <div className="flex flex-col md:flex-row">
                        {/* Timer Block */}
                        <div className="md:w-72 border-b md:border-b-0 md:border-r p-6 pb-8 md:pb-6 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Deals and offers</h3>
                            <p className="text-gray-500 mb-6 font-medium">Electronics & Gadgets</p>

                            <div className="flex gap-2">
                                {[
                                    { label: 'Days', val: timeLeft.days },
                                    { label: 'Hours', val: timeLeft.hours },
                                    { label: 'Min', val: timeLeft.mins },
                                    { label: 'Sec', val: timeLeft.secs },
                                ].map((item) => (
                                    <div key={item.label} className="bg-gray-800 text-white w-14 h-14 rounded-lg flex flex-col items-center justify-center">
                                        <span className="text-lg font-bold leading-none">{item.val < 10 ? `0${item.val}` : item.val}</span>
                                        <span className="text-[10px] uppercase font-bold text-white/50">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Products Row */}
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 divide-x">
                            {deals.map((p) => {
                                const discount = p.compare_at_price
                                    ? Math.round(((p.compare_at_price - p.price) / p.compare_at_price) * 100)
                                    : 0

                                return (
                                    <Link
                                        key={p.id}
                                        href={`/product/${p.slug}`}
                                        className="p-6 flex flex-col items-center group hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="relative w-full aspect-square mb-4">
                                            <Image
                                                src={p.images[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80'}
                                                alt={p.name}
                                                fill
                                                className="object-contain transition-transform group-hover:scale-110"
                                            />
                                        </div>
                                        <h4 className="text-sm font-medium text-gray-800 text-center mb-2 line-clamp-1">{p.name}</h4>
                                        <Badge className="bg-[#FFE3E3] text-[#EB001B] hover:bg-[#FFE3E3] border-none font-bold rounded-full px-3">
                                            -{discount}%
                                        </Badge>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

