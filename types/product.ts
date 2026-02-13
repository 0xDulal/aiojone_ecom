import { z } from 'zod'

export const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    image_url: z.string().optional(),
    parent_id: z.string().uuid().optional().nullable(),
})

export const ProductVariantSchema = z.object({
    id: z.string().uuid(),
    product_id: z.string().uuid(),
    name: z.string(),
    sku: z.string(),
    price_override: z.number().optional().nullable(),
    inventory_count: z.number().default(0),
    options: z.record(z.string(), z.any()).default({}),
})

export const ProductSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    price: z.number(),
    compare_at_price: z.number().optional().nullable(),
    images: z.array(z.string()).default([]),
    category_id: z.string().uuid().optional().nullable(),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
    is_featured: z.boolean().default(false),
    metadata: z.record(z.string(), z.any()).default({}),
    created_at: z.string(),
    updated_at: z.string(),
})


export type Category = z.infer<typeof CategorySchema>
export type ProductVariant = z.infer<typeof ProductVariantSchema>
export type Product = z.infer<typeof ProductSchema> & {
    category?: Category
    variants?: ProductVariant[]
}
