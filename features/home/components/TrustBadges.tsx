'use client'

import { motion } from 'framer-motion'
import { Truck, ShieldCheck, RefreshCcw, Headset } from 'lucide-react'


const perks = [
    {
        icon: Truck,
        title: 'Free Shipping',
        desc: 'On orders over $150'
    },
    {
        icon: ShieldCheck,
        title: 'Secure Payment',
        desc: '100% payment security'
    },
    {
        icon: RefreshCcw,
        title: 'Easy Returns',
        desc: '30-day return policy'
    },
    {
        icon: Headset,
        title: '24/7 Support',
        desc: 'Dedicated support team'
    }
]

export function TrustBadges() {
    return (
        <section className="bg-background py-16 sm:py-24 border-t">
            <div className="max-w-[1460px] mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-8">
                    {perks.map((perk, idx) => (
                        <motion.div
                            key={perk.title}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center space-y-4 group"
                        >
                            <div className="w-16 h-16 bg-secondary/50 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:shadow-primary/20 transition-all duration-500">
                                <perk.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-bold text-lg tracking-tight">{perk.title}</h4>
                                <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 italic">{perk.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

