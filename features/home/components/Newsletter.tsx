'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export function Newsletter() {
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        // Mock API call
        setTimeout(() => {
            setStatus('success')
            toast.success('Joined the inner circle!', {
                description: 'You will be the first to know about our next drop.'
            })
            setEmail('')
        }, 1500)
    }

    return (
        <section className="py-24 px-4 max-w-[1460px] mx-auto w-full">
            <div className="bg-primary rounded-[3rem] p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-[80px] -ml-24 -mb-24" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-2xl relative z-10 space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-primary-foreground font-black text-4xl md:text-6xl tracking-tight">
                            Join the <span className="text-black italic">Inner Circle</span>
                        </h2>
                        <p className="text-primary-foreground/70 text-lg md:text-xl font-medium">
                            Subscribe to receive early access to premium drops, exclusive editorial content and private offers.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <div className="flex-1 relative">
                            <Input
                                type="email"
                                placeholder="Enter your premium email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-16 px-6 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:bg-white/20 transition-all outline-none border-none ring-0"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="h-16 px-10 rounded-2xl bg-black text-white hover:bg-black/80 font-bold transition-all disabled:opacity-50"
                            disabled={status !== 'idle'}
                        >
                            {status === 'loading' ? (
                                'Joining...'
                            ) : status === 'success' ? (
                                <Check className="h-6 w-6" />
                            ) : (
                                <span className="flex items-center gap-2 text-lg">
                                    Join <Send className="h-4 w-4" />
                                </span>
                            )}
                        </Button>
                    </form>

                    <p className="text-[10px] text-primary-foreground/40 uppercase tracking-[0.2em] font-bold">
                        NO SPAM. JUST PURE EXCELLENCE. UNKSUBSCRIBE ANYTIME.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
