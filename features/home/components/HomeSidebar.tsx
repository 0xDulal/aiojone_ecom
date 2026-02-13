import {
    Monitor,
    Shirt,
    Home,
    Book,
    Wrench,
    Trophy,
    Fish,
    Gamepad2,
    LayoutGrid,
    Smartphone,
    Watch,
    Package
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ProductService } from '@/features/products/product.service'

const iconMap: Record<string, any> = {
    'electronics': Monitor,
    'clothing': Shirt,
    'home': Home,
    'books': Book,
    'tools': Wrench,
    'sports': Trophy,
    'pets': Fish,
    'toys': Gamepad2,
    'smartphones': Smartphone,
    'watches': Watch
}

export async function HomeSidebar() {
    const categories = await ProductService.getCategories()
    return (
        <nav className="w-64 bg-white flex flex-col py-2">
            {categories.slice(0, 8).map((cat) => {
                const Icon = iconMap[cat.slug] || Package
                return (
                    <Link
                        key={cat.id}
                        href={`/shop?cat=${cat.slug}`}
                        className={cn(
                            "px-6 py-2.5 text-[15px] font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-4 group",
                        )}
                    >
                        <Icon className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                        {cat.name}
                    </Link>
                )
            })}
            <Link
                href="/shop?tab=categories"
                className="px-6 py-2.5 text-[15px] font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-4 group"
            >
                <LayoutGrid className="h-5 w-5 opacity-40 group-hover:opacity-100" />
                More category
            </Link>
        </nav>
    )
}

