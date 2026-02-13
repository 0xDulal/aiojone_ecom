import Link from 'next/link'
import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from 'lucide-react'

const footerLinks = [
    {
        title: 'Collections',
        links: [
            { name: 'Digital Tools', href: '/shop?cat=tech' },
            { name: 'Lifestyle Gear', href: '/shop?cat=lifestyle' },
            { name: 'Limited Drops', href: '/shop?tag=limited' },
            { name: 'Best Sellers', href: '/shop?tag=best-seller' },
        ]
    },
    {
        title: 'Company',
        links: [
            { name: 'Our Story', href: '/about' },
            { name: 'Sustainability', href: '/ecology' },
            { name: 'Careers', href: '/jobs' },
            { name: 'Journal', href: '/journal' },
        ]
    },
    {
        title: 'Support',
        links: [
            { name: 'Shipping Guide', href: '/shipping' },
            { name: 'Easy Returns', href: '/returns' },
            { name: 'Track Order', href: '/track' },
            { name: 'Contact Us', href: '/contact' },
        ]
    }
]

export function Footer() {
    return (
        <footer className="bg-background border-t pt-24 pb-12">
            <div className="max-w-[1460px] mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
                    <div className="lg:col-span-2 space-y-8">
                        <Link href="/" className="text-3xl font-black tracking-tighter">
                            Aio<span className="text-primary italic">Jone</span>
                        </Link>
                        <p className="text-muted-foreground text-lg max-w-sm">
                            Redefining the digital lifestyle through premium gear and minimalist design excellence.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Twitter, Facebook, Youtube].map((Icon, idx) => (
                                <Link key={idx} href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all">
                                    <Icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((group) => (
                        <div key={group.title} className="space-y-6">
                            <h4 className="font-bold uppercase tracking-widest text-xs text-primary">{group.title}</h4>
                            <ul className="space-y-4">
                                {group.links.map((link) => (
                                    <li key={link.name}>
                                        <Link href={link.href} className="text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all inline-block font-medium">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-muted-foreground">
                        © 2026 AioJone Ecommerce. All rights reserved. Built for Excellence.
                    </p>
                    <div className="flex gap-8">
                        <Link href="#" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Privacy Policy</Link>
                        <Link href="#" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
