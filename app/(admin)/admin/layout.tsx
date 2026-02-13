'use client'

import { AdminSidebar } from "@/features/admin/admin-sidebar"
import { Menu, Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="min-h-screen bg-secondary/10 flex">
            {/* Sidebar - Desktop */}
            <div className="hidden lg:block">
                <AdminSidebar />
            </div>

            {/* Sidebar - Mobile Overlay */}
            <div className={cn(
                "fixed inset-0 z-50 bg-black/50 lg:hidden transition-opacity duration-300",
                isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}>
                <div className={cn(
                    "fixed inset-y-0 left-0 z-50 w-64 bg-background transition-transform duration-300",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <AdminSidebar onClose={() => setIsSidebarOpen(false)} />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Topbar */}
                <header className="h-16 bg-background/80 backdrop-blur-md border-b sticky top-0 z-40 px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(true)}>
                            <Menu className="h-5 w-5" />
                        </Button>
                        <div className="relative group hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <input
                                placeholder="Search anything..."
                                className="h-10 w-64 bg-secondary/50 rounded-full pl-10 pr-4 text-sm border-none ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full" />
                        </Button>
                        <Separator orientation="vertical" className="h-6 mx-1" />
                        <Button variant="ghost" size="sm" className="gap-2 px-2">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                                <User className="h-4 w-4" />
                            </div>
                            <span className="text-sm font-semibold hidden sm:inline">Admin</span>
                        </Button>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

function Separator({ orientation, className }: { orientation: string, className?: string }) {
    return <div className={cn(orientation === 'vertical' ? 'w-[1px]' : 'h-[1px]', 'bg-border', className)} />
}
