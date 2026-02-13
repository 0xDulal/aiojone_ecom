import { Smartphone, Laptop, Watch, Headphones, MousePointer2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Category } from '@/types/product'

const iconMap: Record<string, any> = {
    'smartphones': Smartphone,
    'laptops': Laptop,
    'watches': Watch,
    'headphones': Headphones,
    'electronics': Smartphone,
}

interface ShopCategoryIconsProps {
    categories: Category[]
}

export function ShopCategoryIcons({ categories }: ShopCategoryIconsProps) {
    return (
        <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar mb-8">
            {categories.map((cat, i) => {
                const Icon = iconMap[cat.slug] || MousePointer2
                return (
                    <div
                        key={cat.id}
                        className={cn(
                            "flex flex-col items-center gap-3 shrink-0 cursor-pointer group",
                            i === 0 ? "opacity-100" : "opacity-60 hover:opacity-100 transition-opacity"
                        )}
                    >
                        <div className={cn(
                            "w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
                            i === 0 ? "bg-white border-2 border-primary shadow-lg text-primary" : "bg-white border shadow-sm group-hover:border-primary group-hover:text-primary"
                        )}>
                            <Icon className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-bold text-gray-600 group-hover:text-primary transition-colors">{cat.name}</span>
                    </div>
                )
            })}
        </div>
    )
}
