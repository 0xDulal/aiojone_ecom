'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    ShoppingCart,
    User,
    Menu,
    Search,
    Heart,
    Package,
    ChevronDown,
    MapPin
} from 'lucide-react'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { useUIStore } from '@/store/ui-store'
import { useCartStore } from '@/store/cart-store'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Category } from '@/types/product'

interface NavbarProps {
    categories: Category[]
}

export function Navbar({ categories = [] }: NavbarProps) {
    const pathname = usePathname()
    const { openCart } = useUIStore()
    const { totalItems } = useCartStore()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const navLinks = [
        { name: 'All categories', href: '/shop?tab=categories' },
        { name: 'Recommends', href: '/shop?tag=recommends' },
        { name: 'New arrivals', href: '/shop?tag=new' },
        { name: 'Bestsellers', href: '/shop?tag=best-seller' },
        { name: 'Gift boxes', href: '/shop?cat=gifts' },
        { name: 'Articles', href: '/journal' },
    ]

    return (
        <header className="w-full bg-white border-b z-50">
            {/* Main Header Row */}
            <div className="max-w-[1460px] mx-auto px-4 py-4 flex items-center justify-between gap-4">
                {/* Logo - Column 1 */}
                <div className="flex-1 flex items-center">
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                            <ShoppingCart className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-[#1C1C1C]">
                            brand<span className="text-primary italic">name</span>
                        </span>
                    </Link>
                </div>

                {/* Search Bar - Column 2 (Center) */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        const query = (e.currentTarget.elements.namedItem('search') as HTMLInputElement).value;
                        if (query) window.location.href = `/shop?q=${encodeURIComponent(query)}`;
                    }}
                    className="hidden md:flex flex-[2] max-w-2xl relative group justify-center"
                >
                    <div className="flex w-full overflow-hidden border-2 border-primary rounded-xl shadow-sm focus-within:ring-4 focus-within:ring-primary/10 transition-all">
                        <Input
                            name="search"
                            autoComplete="off"
                            placeholder="Search everything you need..."
                            className="flex-1 border-none focus-visible:ring-0 rounded-none h-11 px-4 text-base"
                        />
                        <div className="h-11 border-l flex items-center px-4 bg-white hover:bg-gray-50 cursor-pointer text-sm font-medium gap-2 text-muted-foreground whitespace-nowrap hidden lg:flex group/cat relative">
                            All category <ChevronDown className="h-4 w-4" />
                            <div className="absolute top-full right-0 w-64 bg-white border shadow-xl rounded-b-xl hidden group-hover/cat:block z-[60] py-2">
                                {categories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        href={`/shop?cat=${cat.slug}`}
                                        className="block px-6 py-2 hover:bg-blue-50 hover:text-primary transition-colors text-gray-700 font-medium"
                                    >
                                        {cat.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Button type="submit" className="h-11 rounded-none px-8 font-bold text-base bg-primary hover:bg-primary/90">
                            Search
                        </Button>
                    </div>
                </form>

                {/* Action Icons - Column 3 */}
                <div className="flex-1 flex items-center justify-end gap-2 lg:gap-6 shrink-0">
                    <Link href="/login" className="flex flex-col items-center gap-1 group">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-secondary transition-colors">
                            <User className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary">Sign in</span>
                    </Link>

                    <Link href="/wishlist" className="hidden lg:flex flex-col items-center gap-1 group">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-secondary transition-colors">
                            <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary">Saved</span>
                    </Link>

                    <Link href="/admin" className="hidden lg:flex flex-col items-center gap-1 group">
                        <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-secondary transition-colors">
                            <Package className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary">Orders</span>
                    </Link>

                    <button
                        onClick={openCart}
                        className="flex flex-col items-center gap-1 group relative"
                    >
                        <div className="w-10 h-10 flex items-center justify-center rounded-full group-hover:bg-secondary transition-colors">
                            <ShoppingCart className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                            {mounted && totalItems() > 0 && (
                                <span className="absolute top-0 right-0 bg-destructive text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                                    {totalItems()}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest group-hover:text-primary whitespace-nowrap">My cart</span>
                    </button>

                    {/* Mobile Menu Trigger */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </div>
            </div>

            {/* Mobile Sidebar Navigation */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="left" className="w-[300px] p-0 flex flex-col">
                    <SheetHeader className="p-6 border-b text-left">
                        <SheetTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5 text-primary" />
                            Navigation
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-4">
                        <div className="px-6 mb-6">
                            <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">Categories</h4>
                            <div className="grid gap-2">
                                {categories.map(cat => (
                                    <Link
                                        key={cat.id}
                                        href={`/shop?cat=${cat.slug}`}
                                        className="flex items-center justify-between text-base font-bold py-2 hover:text-primary transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {cat.name}
                                        <ChevronDown className="h-4 w-4 -rotate-90 opacity-20" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Separator className="mx-6 mb-6" />

                        <div className="px-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="block text-sm font-bold hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t bg-secondary/10">
                        <Button className="w-full font-bold" asChild onClick={() => setMobileMenuOpen(false)}>
                            <Link href="/login">Sign in to your account</Link>
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>

            {/* Secondary Navigation Row */}
            <div className="border-t hidden md:block">
                <div className="max-w-[1460px] mx-auto px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <Menu className="h-5 w-5 group-hover:text-primary transition-colors" />
                            <span className="font-bold text-sm">All categories</span>
                        </div>

                        <div className="h-4 w-px bg-gray-200" />

                        <nav className="flex items-center gap-6">
                            {categories.slice(0, 5).map((cat) => (
                                <Link
                                    key={cat.id}
                                    href={`/shop?cat=${cat.slug}`}
                                    className={cn(
                                        "text-sm font-bold transition-all hover:text-primary py-1 border-b-2 border-transparent hover:border-primary whitespace-nowrap",
                                        pathname === `/shop?cat=${cat.slug}` ? "text-primary border-primary" : "text-[#1C1C1C]"
                                    )}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                            <Link href="/journal" className="text-sm font-bold transition-all hover:text-primary py-1 border-b-2 border-transparent hover:border-primary text-[#1C1C1C]">
                                Articles
                            </Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-sm font-bold cursor-pointer hover:text-primary transition-colors">
                            <span>English, USD</span>
                            <ChevronDown className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold cursor-pointer hover:text-primary transition-colors">
                            <span>Ship to</span>
                            <MapPin className="h-4 w-4 text-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

