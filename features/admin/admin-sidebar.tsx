'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Package,
    ShoppingBag,
    Users,
    BarChart3,
    Settings,
    X
} from 'lucide-react'

const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function AdminSidebar({ onClose }: { onClose?: () => void }) {
    const pathname = usePathname()

    return (
        <aside className="w-64 bg-background border-r h-full flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
                <Link href="/admin" className="text-xl font-black tracking-tighter">
                    ADMIN<span className="text-primary italic">PANEL</span>
                </Link>
                {onClose && (
                    <button onClick={onClose} className="lg:hidden p-2 hover:bg-secondary rounded-md">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-5 w-5", isActive ? "" : "group-hover:scale-110 transition-transform")} />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 border-t">
                <div className="bg-secondary/20 rounded-2xl p-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Logged in as</p>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">A</div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold truncate">Admin User</p>
                            <p className="text-[10px] text-muted-foreground truncate">admin@aiojone.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}
