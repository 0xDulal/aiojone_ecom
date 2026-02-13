'use client'

import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { deleteProductAction } from "../admin.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DeleteProductAction({ id, name }: { id: string, name: string }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const handleDelete = async () => {
        setLoading(true)
        try {
            const res = await deleteProductAction(id)
            if (res.success) {
                toast.success('Product deleted')
                router.refresh()
            } else {
                toast.error(res.error || 'Failed to delete product')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-destructive focus:bg-destructive focus:text-destructive-foreground cursor-pointer rounded-sm hover:bg-destructive/10">
                    <Trash2 className="h-4 w-4" /> Delete
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently delete <span className="font-bold text-foreground">{name}</span> and remove it from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                        disabled={loading}
                    >
                        {loading ? 'Deleting...' : 'Delete Product'}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
