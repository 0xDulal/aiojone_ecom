'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { createProductAction, updateProductAction } from '../admin.actions'

const productSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    slug: z.string().min(2, 'Slug must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    price: z.coerce.number().positive('Price must be positive'),
    compare_at_price: z.coerce.number().optional().nullable(),
    category_id: z.string().min(1, 'Please select a category'),
    status: z.enum(['draft', 'published', 'archived']),
    images: z.string().min(1, 'At least one image URL is required')
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
    initialData?: any
    categories: any[]
}

export function ProductForm({ initialData, categories }: ProductFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: initialData ? {
            ...initialData,
            images: initialData.images?.join(', ') || ''
        } : {
            name: '',
            slug: '',
            description: '',
            price: 0,
            compare_at_price: null,
            category_id: '',
            status: 'draft',
            images: ''
        }
    })

    const onSubmit = async (values: ProductFormValues) => {
        setLoading(true)
        try {
            const formattedValues = {
                ...values,
                images: values.images.split(',').map(s => s.trim()).filter(Boolean)
            }

            const res = initialData
                ? await updateProductAction(initialData.id, formattedValues)
                : await createProductAction(formattedValues)

            if (res.success) {
                toast.success(initialData ? 'Product updated' : 'Product created')
                router.push('/admin/products')
                router.refresh()
            } else {
                toast.error(res.error || 'Something went wrong')
            }
        } catch (error) {
            toast.error('Failed to save product')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-xl shadow-black/5 bg-background/60 backdrop-blur-md">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Product Name</Label>
                                <Input id="name" {...form.register('name')} placeholder="e.g. Premium Wireless Headphones" className="rounded-xl" />
                                {form.formState.errors.name && <p className="text-xs text-destructive font-medium">{form.formState.errors.name.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" {...form.register('slug')} placeholder="e.g. premium-wireless-headphones" className="rounded-xl" />
                                {form.formState.errors.slug && <p className="text-xs text-destructive font-medium">{form.formState.errors.slug.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" {...form.register('description')} rows={5} placeholder="Describe your product in detail..." className="rounded-xl resize-none" />
                                {form.formState.errors.description && <p className="text-xs text-destructive font-medium">{form.formState.errors.description.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-xl shadow-black/5 bg-background/60 backdrop-blur-md">
                        <CardContent className="pt-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="images">Images (Comma separated URLs)</Label>
                                <Input id="images" {...form.register('images')} placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" className="rounded-xl" />
                                <p className="text-[10px] text-muted-foreground italic">Add direct image URLs separated by commas.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card className="border-none shadow-xl shadow-black/5 bg-background/60 backdrop-blur-md border-t-4 border-t-primary">
                        <CardContent className="pt-6 space-y-6">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select
                                    onValueChange={(val) => form.setValue('status', val as any)}
                                    defaultValue={form.getValues('status')}
                                >
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                        <SelectItem value="archived">Archived</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select
                                    onValueChange={(val) => form.setValue('category_id', val)}
                                    defaultValue={form.getValues('category_id')}
                                >
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {form.formState.errors.category_id && <p className="text-xs text-destructive font-medium">{form.formState.errors.category_id.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price ($)</Label>
                                    <Input id="price" type="number" step="0.01" {...form.register('price')} className="rounded-xl font-bold" />
                                    {form.formState.errors.price && <p className="text-xs text-destructive font-medium">{form.formState.errors.price.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="compare_at_price">Discount Price ($)</Label>
                                    <Input id="compare_at_price" type="number" step="0.01" {...form.register('compare_at_price')} className="rounded-xl text-muted-foreground line-through decoration-destructive" />
                                </div>
                            </div>

                            <Button type="submit" className="w-full rounded-xl h-12 shadow-lg shadow-primary/20 font-black" disabled={loading}>
                                {loading ? 'Saving...' : initialData ? 'Update Product' : 'Create Product'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    )
}
