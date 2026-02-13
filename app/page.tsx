import { MarketplaceHero } from "@/features/home/components/MarketplaceHero";
import { DealsSection } from "@/features/home/components/DealsSection";
import { TrustBadges } from "@/features/home/components/TrustBadges";
import { Testimonials } from "@/features/home/components/Testimonials";
import { Newsletter } from "@/features/home/components/Newsletter";
import { ProductGrid } from "@/features/products/product-grid";
import { ProductService } from "@/features/products/product.service";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
  const [trendingProducts, deals] = await Promise.all([
    ProductService.getPublishedProducts(8),
    ProductService.getDeals(5)
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Marketplace Hero & Categories */}
      <MarketplaceHero />

      {/* Deals and Offers */}
      <DealsSection deals={deals} />

      {/* Trending Section */}
      <section className="mb-12">
        <div className="max-w-[1460px] mx-auto px-4">
          <div className="bg-white border p-8 rounded-xl shadow-sm">
            <header className="mb-8 flex items-end justify-between">
              <h3 className="text-2xl font-bold tracking-tight">Trending products</h3>
              <Link href="/shop" className="text-primary font-bold hover:underline text-sm">View all</Link>
            </header>
            <ProductGrid products={trendingProducts as any} />
          </div>
        </div>
      </section>

      {/* Social & Polish */}
      <TrustBadges />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

