import { ProductGridSkeleton } from "@/features/products/components/ProductSkeleton";

export default function ShopLoading() {
    return (
        <main className="min-h-screen pt-24 pb-12">
            <div className="max-w-[1460px] mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Skeleton */}
                    <aside className="w-full md:w-64 space-y-8">
                        <div className="space-y-4">
                            <div className="h-6 w-32 bg-secondary/50 rounded animate-pulse" />
                            <div className="space-y-2">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="h-10 w-full bg-secondary/30 rounded animate-pulse" />
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Skeleton */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div className="h-8 w-48 bg-secondary/50 rounded animate-pulse" />
                            <div className="h-10 w-32 bg-secondary/50 rounded animate-pulse" />
                        </div>
                        <ProductGridSkeleton count={8} />
                    </div>
                </div>
            </div>
        </main>
    );
}
