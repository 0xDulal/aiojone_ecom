import { AdminService } from "@/features/admin/admin.service"
import { ProductForm } from "@/features/admin/components/ProductForm"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function NewProductPage() {
    const categories = await AdminService.getCategories()

    return (
        <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
            <div className="flex flex-col gap-4">
                <Link
                    href="/admin/products"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                    <ChevronLeft className="h-4 w-4" /> Back to Products
                </Link>
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-2">Add <span className="text-primary italic">New Product</span></h1>
                    <p className="text-muted-foreground">Define your product details, pricing, and visibility settings.</p>
                </div>
            </div>

            <ProductForm categories={categories} />
        </div>
    )
}
