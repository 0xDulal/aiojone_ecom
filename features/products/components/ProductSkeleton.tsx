import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
    return (
        <div className="group relative flex flex-col gap-4 p-4 rounded-2xl border bg-white shadow-sm border-transparent transition-all">
            <Skeleton className="aspect-square w-full rounded-xl bg-secondary/50" />
            <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                    <Skeleton className="h-6 w-3/4 rounded-md" />
                    <Skeleton className="h-6 w-12 rounded-md" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl mt-2" />
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
}
