import { ProductService } from "@/features/products/product.service";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShieldCheck, Truck, RefreshCcw } from "lucide-react";
import { AddToCartButton } from "@/features/cart/add-to-cart-button";


export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await ProductService.getProductBySlug(slug);

    if (!product) return notFound();

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 max-w-[1460px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/20 shadow-inner">
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-2">
                            {product.categories?.name || 'Uncategorized'}
                        </p>
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold">${product.price}</span>
                            {product.compare_at_price && (
                                <span className="text-xl text-muted-foreground line-through">
                                    ${product.compare_at_price}
                                </span>
                            )}
                            {product.compare_at_price && (
                                <Badge variant="destructive" className="animate-pulse">
                                    SAVE ${Math.round(product.compare_at_price - product.price)}
                                </Badge>
                            )}
                        </div>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                        {product.description}
                    </p>

                    <div className="space-y-4 mb-10">
                        <AddToCartButton
                            product={product as any}
                            className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20"
                        />
                        <Button size="lg" variant="outline" className="w-full h-14 text-lg rounded-xl">
                            <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
                        </Button>
                    </div>


                    {/* Trust Badges */}
                    <div className="grid grid-cols-3 gap-4 border-t pt-8">
                        <div className="flex flex-col items-center text-center">
                            <Truck className="h-6 w-6 text-primary mb-2" />
                            <span className="text-xs font-medium">Free Shipping</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                            <span className="text-xs font-medium">Secure Payment</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <RefreshCcw className="h-6 w-6 text-primary mb-2" />
                            <span className="text-xs font-medium">30-Day Returns</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
