import { Button } from '@/components/ui/button'
import { HomeSidebar } from './HomeSidebar'
import Image from 'next/image'
import Link from 'next/link'

export async function MarketplaceHero() {
    return (
        <section className="py-6 w-full">
            <div className="max-w-[1460px] mx-auto px-4">
                <div className="bg-white border rounded-xl overflow-hidden flex flex-col lg:flex-row p-4 gap-4 shadow-sm">
                    {/* Sidebar */}
                    <div className="hidden lg:block shrink-0">
                        <HomeSidebar />
                    </div>

                    {/* Main Banner */}
                    <div className="flex-1 relative rounded-lg overflow-hidden min-h-[400px] bg-[#BBEDFF]">
                        <div className="absolute inset-0 opacity-40" style={{
                            background: 'radial-gradient(circle at 70% 50%, #87CEEB 0%, transparent 100%), radial-gradient(circle at 10% 80%, #E0FFFF 0%, transparent 100%)'
                        }} />

                        <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12">
                            <div className="max-w-xs space-y-4 relative z-10 text-center lg:text-left">
                                <h2 className="text-xl md:text-2xl font-medium text-blue-600">New trending</h2>
                                <h3 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                                    Electronic <br /> items
                                </h3>
                                <Button variant="secondary" className="mt-8 px-8 h-12 rounded-xl font-bold bg-white/80 backdrop-blur-md text-gray-900 hover:bg-white border-none shadow-sm">
                                    Learn more
                                </Button>
                            </div>

                            <div className="relative w-full lg:w-1/2 h-full min-h-[250px] lg:min-h-0">
                                <Image
                                    src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80"
                                    alt="Mobile"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Promotion Card */}
                    <div className="lg:w-72 relative rounded-lg overflow-hidden group min-h-[400px] bg-[#5B778B]">
                        <Image
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
                            alt="Promo"
                            fill
                            className="object-cover opacity-80 mix-blend-multiply transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 p-8 flex flex-col items-start bg-gradient-to-b from-black/20 to-transparent">
                            <h4 className="text-xl font-medium text-white max-w-[150px] leading-snug">
                                Get US $10 off for first order
                            </h4>

                            <div className="mt-auto w-full">
                                <Button variant="outline" className="w-fit h-11 px-6 rounded-full border-white text-white hover:bg-white hover:text-gray-900 font-bold transition-all backdrop-blur-sm" asChild>
                                    <Link href="/shop">Get offer</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

