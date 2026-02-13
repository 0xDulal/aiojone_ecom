import { AdminService } from "@/features/admin/admin.service"
import { ProductForm } from "@/features/admin/components/ProductForm"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [product, categories] = await Promise.all([
        AdminService.getProductById(id),
        AdminService.getCategories()
    ])

    if (!product) notFound()

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
                    <h1 className="text-3xl font-black tracking-tight mb-2">Edit <span className="text-primary italic">Product</span></h1>
                    <p className="text-muted-foreground">Updating: <span className="font-bold text-foreground">{product.name}</span></p>
                </div>
            </div>

            <ProductForm initialData={product} categories={categories} />
        </div>
    )
}
