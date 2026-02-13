import { AdminService } from "@/features/admin/admin.service"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, PackageCheck, Truck, XCircle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function AdminOrdersPage() {
    const orders = await AdminService.getAllOrders()

    const statusMap: Record<string, { label: string, variant: "default" | "secondary" | "destructive" | "outline" }> = {
        pending: { label: "Pending", variant: "outline" },
        processing: { label: "Processing", variant: "secondary" },
        delivered: { label: "Delivered", variant: "default" },
        cancelled: { label: "Cancelled", variant: "destructive" }
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-black tracking-tight mb-2">Order <span className="text-primary italic">Management</span></h1>
                <p className="text-muted-foreground">Monitor sales, track fulfillment, and manage customer communications.</p>
            </div>

            <div className="bg-background rounded-3xl shadow-xl overflow-hidden border">
                <Table>
                    <TableHeader className="bg-secondary/20">
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order: any) => (
                            <TableRow key={order.id} className="hover:bg-secondary/10 group transition-colors">
                                <TableCell className="font-bold">#{order.id.slice(0, 8)}</TableCell>
                                <TableCell>
                                    <div className="font-semibold">{order.profiles?.full_name || 'Guest Customer'}</div>
                                    <div className="text-xs text-muted-foreground">{order.profiles?.email || 'No email'}</div>
                                </TableCell>
                                <TableCell>Active</TableCell>
                                <TableCell>
                                    <Badge variant={statusMap[order.status]?.variant || 'outline'} className="rounded-full">
                                        {statusMap[order.status]?.label || order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-black">${Number(order.total_amount).toFixed(2)}</TableCell>
                                <TableCell className="text-muted-foreground text-sm">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl w-48">
                                            <DropdownMenuItem className="gap-2"><FileText className="h-4 w-4" /> Order Details</DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2"><PackageCheck className="h-4 w-4" /> Mark Processing</DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2"><Truck className="h-4 w-4" /> Ship Order</DropdownMenuItem>
                                            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive"><XCircle className="h-4 w-4" /> Cancel Order</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                        {orders?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-12 text-muted-foreground italic">
                                    No orders found yet
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
