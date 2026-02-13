'use server'

import { AdminService } from "./admin.service"
import { revalidatePath } from "next/cache"

export async function createProductAction(formData: any) {
    try {
        const product = await AdminService.createProduct(formData)
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        return { success: true, data: product }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function updateProductAction(id: string, formData: any) {
    try {
        const product = await AdminService.updateProduct(id, formData)
        revalidatePath('/admin/products')
        revalidatePath(`/admin/products/${id}`)
        revalidatePath('/shop')
        revalidatePath(`/product/${product.slug}`)
        return { success: true, data: product }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}

export async function deleteProductAction(id: string) {
    try {
        await AdminService.deleteProduct(id)
        revalidatePath('/admin/products')
        revalidatePath('/shop')
        return { success: true }
    } catch (error: any) {
        return { success: false, error: error.message }
    }
}
