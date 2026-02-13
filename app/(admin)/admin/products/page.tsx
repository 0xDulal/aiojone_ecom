import { AdminService } from "@/features/admin/admin.service"
import Link from "next/link"
import { DeleteProductAction } from "@/features/admin/components/DeleteProductAction"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal, Edit, ExternalLink } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

export default async function AdminProductsPage() {
    const products = await AdminService.getAllProducts()

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Product <span className="text-primary italic">Management</span></h1>
                    <p className="text-muted-foreground">Manage your catalog, inventory, and product visibility.</p>
                </div>
                <Link href="/admin/products/new">
                    <Button className="rounded-xl h-11 gap-2 shadow-lg shadow-primary/20">
                        <Plus className="h-4 w-4" /> Add Product
                    </Button>
                </Link>
            </div>

            <div className="bg-background rounded-3xl shadow-xl overflow-hidden border">
                <Table>
                    <TableHeader className="bg-secondary/20">
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.map((product: any) => (
                            <TableRow key={product.id} className="hover:bg-secondary/10 group transition-colors">
                                <TableCell>
                                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-secondary">
                                        <Image
                                            src={product.images?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"}
                                            alt={product.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-bold">{product.name}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        {product.slug}
                                        {product.categories && (
                                            <span className="bg-primary/5 text-primary px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                                                {product.categories.name}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={product.status === 'published' ? 'default' : 'secondary'} className="rounded-full">
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-sm">
                                        {/* Since products don't have stock directly in the table, we'll use a placeholder or check variants if implemented */}
                                        Active
                                    </span>
                                </TableCell>
                                <TableCell className="font-black">${Number(product.price).toFixed(2)}</TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="rounded-xl w-40">
                                            <Link href={`/admin/products/${product.id}`}>
                                                <DropdownMenuItem className="gap-2 cursor-pointer">
                                                    <Edit className="h-4 w-4" /> Edit
                                                </DropdownMenuItem>
                                            </Link>
                                            <DropdownMenuItem className="gap-2"><ExternalLink className="h-4 w-4" /> View</DropdownMenuItem>
                                            <DeleteProductAction id={product.id} name={product.name} />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
