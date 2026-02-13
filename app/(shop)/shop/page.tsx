import { ProductService } from "@/features/products/product.service";
import { ProductGrid } from "@/features/products/product-grid";
import { ShopSidebar } from "@/features/shop/components/ShopSidebar";
import { ShopCategoryIcons } from "@/features/shop/components/ShopCategoryIcons";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Grid, List } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default async function ShopPage() {
    const [products, categories] = await Promise.all([
        ProductService.getPublishedProducts(20),
        ProductService.getCategories()
    ]);

    return (
        <main className="min-h-screen bg-[#F8F9FA] pb-24">
            <div className="max-w-[1460px] mx-auto px-4">
                {/* Breadcrumbs */}
                <div className="py-6">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>All Products</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <ShopSidebar categories={categories} />

                    {/* Content */}
                    <div className="flex-1">
                        <section className="bg-white border rounded-xl p-8 mb-8 shadow-sm">
                            <h1 className="text-2xl font-bold mb-8">All Products</h1>
                            <ShopCategoryIcons categories={categories} />

                            {/* Toolbar */}
                            <div className="border rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 font-medium">12,345 items in</span>
                                    <span className="text-sm font-bold">Mobile accessory</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Select defaultValue="best">
                                        <SelectTrigger className="w-[140px] h-10 bg-white">
                                            <SelectValue placeholder="Sort by" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="best">Best match</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <div className="flex border rounded-lg overflow-hidden bg-white">
                                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-none bg-secondary text-primary">
                                            <Grid className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" className="h-10 w-10 p-0 rounded-none hover:bg-secondary">
                                            <List className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <ProductGrid products={products as any} />
                    </div>
                </div>
            </div>
        </main>
    );
}

