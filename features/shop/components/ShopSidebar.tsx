'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { Category } from '@/types/product'

const filterGroups = [
    {
        title: 'Brands',
        items: ['Apple', 'Samsung', 'Huawei', 'Xiaomi', 'Sony']
    },
    {
        title: 'Condition',
        items: ['New', 'Refurbished', 'Used', 'Open box']
    }
]

interface ShopSidebarProps {
    categories: Category[]
}

export function ShopSidebar({ categories }: ShopSidebarProps) {
    return (
        <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="space-y-4">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs">Category</h3>
                <div className="space-y-3">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex items-center gap-3 group cursor-pointer">
                            <Checkbox id={cat.slug} className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                            <Label
                                htmlFor={cat.slug}
                                className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors cursor-pointer"
                            >
                                {cat.name}
                            </Label>
                        </div>
                    ))}
                </div>
                <button className="text-primary text-xs font-bold hover:underline">See all</button>
            </div>

            {filterGroups.map((group) => (
                <div key={group.title} className="space-y-4 border-t pt-6">
                    <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs">{group.title}</h3>
                    <div className="space-y-3">
                        {group.items.map((item) => (
                            <div key={item} className="flex items-center gap-3 group cursor-pointer">
                                <Checkbox id={item} className="border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                                <Label
                                    htmlFor={item}
                                    className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors cursor-pointer"
                                >
                                    {item}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {group.title === 'Category' && (
                        <button className="text-primary text-xs font-bold hover:underline">See all</button>
                    )}
                </div>
            ))}

            <div className="border-t pt-6">
                <h3 className="font-bold text-gray-900 uppercase tracking-wider text-xs mb-4">Price range</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-bold uppercase">Min</Label>
                        <input type="number" placeholder="0" className="w-full h-10 border rounded-lg px-3 text-sm focus:border-primary outline-none" />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-[10px] text-gray-500 font-bold uppercase">Max</Label>
                        <input type="number" placeholder="9999" className="w-full h-10 border rounded-lg px-3 text-sm focus:border-primary outline-none" />
                    </div>
                </div>
                <button className="w-full mt-4 h-10 bg-white border border-primary/20 text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">Apply</button>
            </div>
        </aside>
    )
}
