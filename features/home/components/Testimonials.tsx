'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
    {
        name: 'Sarah Jenkins',
        role: 'Tech Reviewer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        content: "The build quality of their wireless headphones is absolutely unmatched. AioJone has truly set a new standard for premium tech accessories.",
        rating: 5
    },
    {
        name: 'Marcus Chen',
        role: 'Creative Director',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        content: "Minimalist design that actually functions. Their watch has become my everyday essential. The attention to detail is remarkable.",
        rating: 5
    },
    {
        name: 'Elena Rodriguez',
        role: 'Travel Blogger',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        content: "Finally, a backpack that looks professional but handles the rigors of travel. Fast shipping and excellent customer service too!",
        rating: 4
    }
]

export function Testimonials() {
    return (
        <section className="py-24 bg-secondary/5 overflow-hidden">
            <div className="max-w-[1460px] mx-auto px-4">
                <header className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Community</h2>
                    <h3 className="text-4xl font-black tracking-tight">Voices of <span className="italic opacity-50">Excellence</span></h3>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-background p-8 rounded-[2.5rem] shadow-xl shadow-black/5 flex flex-col justify-between border border-transparent hover:border-primary/20 transition-all group"
                        >
                            <div className="space-y-6">
                                <div className="flex gap-1 text-primary">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={i < t.rating ? 'fill-current h-4 w-4' : 'text-muted-foreground h-4 w-4'} />
                                    ))}
                                </div>
                                <div className="relative">
                                    <Quote className="absolute -top-4 -left-4 h-8 w-8 text-primary/10 -z-0" />
                                    <p className="relative z-10 text-lg leading-relaxed italic text-muted-foreground group-hover:text-foreground transition-colors">
                                        "{t.content}"
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center gap-4 border-t pt-6">
                                <div className="relative h-12 w-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{t.name}</h4>
                                    <p className="text-xs text-muted-foreground uppercase tracking-widest">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
