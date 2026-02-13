import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    DollarSign,
    ShoppingBag,
    Users,
    TrendingUp,
    ArrowUpRight,
    Package
} from "lucide-react"
import { cn } from "@/lib/utils"

import { AdminService } from "@/features/admin/admin.service"

export default async function AdminDashboard() {
    const data = await AdminService.getDashboardStats()

    const stats = [
        {
            name: 'Total Revenue',
            value: `$${data.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
            change: '+2.1% from last month',
            icon: DollarSign
        },
        {
            name: 'Sales',
            value: `+${data.salesCount}`,
            change: '+5.5% from last month',
            icon: ShoppingBag
        },
        {
            name: 'Total Users',
            value: data.userCount.toString(),
            change: '+1.2% from last month',
            icon: Users
        },
        {
            name: 'Active Orders',
            value: data.activeOrders.toString(),
            change: '+0.5% from last month',
            icon: Package
        },
    ]

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black tracking-tight mb-2">Dashboard <span className="text-primary italic">Overview</span></h1>
                <p className="text-muted-foreground">Welcome back, Admin. Here&apos;s what&apos;s happening in your store today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.name} className="border-none shadow-lg shadow-black/5 hover:shadow-xl transition-shadow bg-background/60 backdrop-blur-md">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.name}
                            </CardTitle>
                            <stat.icon className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-black">{stat.value}</div>
                            <p className="text-xs text-muted-foreground pt-1 flex items-center gap-1">
                                <span className="text-emerald-500 font-bold flex items-center">
                                    <ArrowUpRight className="h-3 w-3" /> {stat.change.split(' ')[0]}
                                </span>
                                {stat.change.split(' ').slice(1).join(' ')}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-none shadow-lg bg-background/60 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Revenue Analytics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-xl m-4">
                        [REVENUE CHART PLACEHOLDER]
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-background/60 backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5 text-primary" />
                            Recent Orders
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {data.recentOrders.length > 0 ? data.recentOrders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold uppercase">
                                            {order.profiles?.full_name?.charAt(0) || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold">Order #{order.id.slice(0, 8)}</p>
                                            <p className="text-xs text-muted-foreground">{order.profiles?.full_name || 'Guest'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black">${Number(order.total_amount).toFixed(2)}</p>
                                        <p className={cn(
                                            "text-[10px] font-bold px-2 py-0.5 rounded-full inline-block",
                                            order.status === 'delivered' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                                        )}>
                                            {order.status.charAt(0) + order.status.slice(1)}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-8 text-muted-foreground italic">
                                    No orders found yet
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
