import type { Metadata } from "next";
import { HeroSection } from "@/components/layout/hero-section";
import { FeaturedProducts } from "@/components/commerce/featured-products";
import { SITE_NAME, SITE_URL, buildCanonicalUrl } from "@/lib/metadata";
import { BadgeCheck, Truck, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: {
        absolute: `${SITE_NAME} - Your One-Stop Shop`,
    },
    description:
        "Discover high-quality products at competitive prices. Shop now for the best deals on electronics, fashion, home goods, and more.",
    alternates: {
        canonical: buildCanonicalUrl("/"),
    },
    openGraph: {
        title: `${SITE_NAME} - Your One-Stop Shop`,
        description:
            "Discover high-quality products at competitive prices. Shop now for the best deals.",
        type: "website",
        url: SITE_URL,
    },
};

export default async function Home(_props: PageProps<'/'>) {
    const collectionStyle = {
        backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuBpwgEi5iXCd0AUeqOncYJ243HqM8Sbt8jEULjvIESL1zOdowjXVCffDcZwfxWGMD-b4hbwBckwBgjIXztOeJ0AYpuiZCcZ-D4uvRFG65qbvD21S8Av6jA5BC_qpzp9S6476JUwSd2efokvbwqf3yMfBNjG9pwg8JauT1pXnHwZdZxTyIuFmZOyrfqA6qATbrvrKrpyO7PSDcwhd2AkYUkGhlV2EiaYnAlQh8Bq4KIFTQv4yVJh-0pvglZAPw7oU36o0umu9v9hAyI)`, // Use template literal to insert the imported variable
    }
    const collectionStyle2 = {
        backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuDO0Dbsu6GeAss_gK0MlIAhvPIZGdCmSKB8TDxVfhrnE5qR4_xayTkXY_WxR7YK1tSAPKamqxWvjEZHtQJ9N0g4AWlqJqPTfgp78iMwOc8dknNIqD0c9WlBSoMAzP1EUFrTl080BUycKHFpl-lrez494uRi_VmNrkXq3F2bIQuO6PwSDXxsQ6MuAcOLkSJPo62W_VS-QnWT4066KEY5-4mTUIEEGc0YnIKUX5rvQBOLte0Z0u77yOMhOSo7gf80tHZXPLVQMcUhu7w)`, // Use template literal to insert the imported variable
    }
    const collectionStyle3 = {
        backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuB5WhBwZ7QpJ47czs7IfJNr3KG5jDIULkqRdFjZowYelI_QrS9r_mMKfJT2yk5Uln3Tt2gg579GZ9sMtxHWwayl2bdWfDNzAmovWhBDt9IkhFohofEADDZzLJFVTMqkBwvPL2cHegOHqRcUPbMCkjp6JV3ofEJ1ycu817Ao-o9d-JHPZ8tC__UXlOKBQDOjXo7etKQVBuQRjzlDnc2bIaVLI_aC-skAl9JmnsHKgQwEJf9b4BRyqevCo1oVuBs2Ni1enmoEKRwlY-I)`,
    }
    const collectionStyle4 = {
        backgroundImage: `url(https://lh3.googleusercontent.com/aida-public/AB6AXuA7W62Obnu4WBmtjrt8_ZTU0kbs2UBlPSpCueLSMPO0IuO9TXhETE_7p3HMxx8rN2tLInjydV9WfvG6E0SLKOiCgQ7SJHqChE7EzV1CTZMbaZpwVUDjQ5I0caNXq33_rlcJsa0VZ1ZUBsKb1dGj6ZbKLJKrTxoNmnLliK_nkhNZMfqcvCpk1cFigEfKO-KPzVOmS7mJ0nsJCmZOCYQu0eVkHB25OwtORv6cX5PQSUXhAz50y3mBYX7DhpRoyAAuwagoBu96cc8QZDg)`,
    }
    return (
        <div className="min-h-screen">
            <HeroSection />

            {/* You can add more sections here */}
            <section className="max-w-360 mx-auto w-full px-6 md:px-10 py-20">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold mb-2 text-[#2C241B]">Curated Collections</h2>
                        <p className="text-[#78716C]">Hand-picked themes for the discerning collector.</p>
                    </div>
                    <a className="hidden md:flex items-center text-sm font-bold gap-2 hover:gap-4 transition-all text-primary"
                        href="#">
                        View All Collections  <ArrowRight className="w-3.5 h-3.5 text-[#9A674F]"></ArrowRight>
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto gap-4 md:gap-6 auto-rows-[300px]">
                    <div
                        className="relative group md:col-span-2 md:row-span-2 overflow-hidden rounded-xl bg-[#E6E0D4] cursor-pointer shadow-sm">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt="Vintage Chanel black quilted bag on a marble table" style={collectionStyle}
                        >
                        </div>
                        <div
                            className="absolute inset-0 bg-linear-to-t from-[#1C1917]/70 to-transparent flex flex-col justify-end p-8">
                            <p className="text-[#E6E0D4] text-sm uppercase tracking-wider font-medium mb-1">The Classics</p>
                            <h3 className="text-white text-3xl font-bold">Timeless Chanel</h3>
                            <button
                                className="mt-4 w-fit bg-white/20 backdrop-blur-sm hover:bg-[#F2EFE9] text-white hover:text-[#2C241B] px-4 py-2 rounded-lg text-sm font-bold transition-colors">Explore
                                Edit</button>
                        </div>
                    </div>
                    <div
                        className="relative group md:col-span-1 md:row-span-2 overflow-hidden rounded-xl bg-[#E6E0D4] cursor-pointer shadow-sm">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt="Brown leather Hermes Birkin bag sitting on a chair" style={collectionStyle2}
                        >
                        </div>
                        <div
                            className="absolute inset-0 bg-[#2C241B]/20 group-hover:bg-[#2C241B]/30 transition-colors p-6 flex flex-col justify-between">
                            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded w-fit shadow-md">Rare
                                Find</span>
                            <div>
                                <h3 className="text-white text-xl font-bold">Hermès Grails</h3>
                                <p className="text-[#E6E0D4] text-sm mt-1">Sourced from private collections.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-xl bg-[#E6E0D4] cursor-pointer shadow-sm">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt="Close up of a Louis Vuitton monogram canvas detail"
                            style={collectionStyle3}
                        >
                        </div>
                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#2C241B]/40">
                            <span className="text-white font-bold tracking-widest uppercase border-b-2 border-white pb-1">Louis
                                Vuitton</span>
                        </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-xl bg-[#E6E0D4] cursor-pointer shadow-sm">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            data-alt="Bright pink designer mini bag isolated on abstract background"
                            style={collectionStyle4}
                        >
                        </div>
                        <div
                            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#2C241B]/40">
                            <span className="text-white font-bold tracking-widest uppercase border-b-2 border-white pb-1">Pop
                                Colors</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-surface-off py-20 border-t border-b border-[#E6E0D4]">
                <FeaturedProducts />
            </section>
            <section className="py-20 bg-surface-light">
                <div className="max-w-360 mx-auto w-full px-6 md:px-10">
                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="size-12 rounded-lg bg-[#9A674F]/10 flex items-center justify-center text-primary">
                                <BadgeCheck className="w-6 h-6 text-[#9A674F]"></BadgeCheck>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-[#2C241B]">Guaranteed Authentication</h3>
                                <p className="text-[#78716C] text-sm leading-relaxed">Every item is reviewed by two independent
                                    experts and AI technology to ensure 100% authenticity.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="size-12 rounded-lg bg-[#9A674F]/10 flex items-center justify-center text-primary">
                                <Truck className="w-6 h-6 text-[#9A674F]"></Truck>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-[#2C241B]">Global Priority Shipping</h3>
                                <p className="text-[#78716C] text-sm leading-relaxed">Fully insured, express delivery to over 50
                                    countries worldwide. Next day delivery available.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-4">
                            <div className="size-12 rounded-lg bg-[#9A674F]/10 flex items-center justify-center text-primary">
                                <svg className="w-6 h-6 text-[#9A674F]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-2 text-[#2C241B]">Buy Back Guarantee</h3>
                                <p className="text-[#78716C] text-sm leading-relaxed">Ready for a refresh? Sell your bag back to
                                    us within 12 months for 70% of the purchase price.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-[#2A231E] text-white py-24 relative overflow-hidden">
                <div
                    className="absolute top-0 right-0 w-125 h-125 bg-primary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none">
                </div>
                <div
                    className="max-w-360 mx-auto w-full px-6 md:px-10 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="max-w-xl">
                        <h2 className="text-4xl font-bold mb-4">Join The Inner Circle</h2>
                        <p className="text-[#D6D1C7] text-lg">Gain early access to new arrivals, exclusive private sales, and
                            invites to our pop-up events.</p>
                    </div>
                    <div className="w-full max-w-md bg-white/5 p-2 rounded-xl border border-white/10 backdrop-blur-sm">
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                className="bg-transparent border-none text-white placeholder:text-[#998F85] flex-1 px-4 focus:ring-0"
                                placeholder="Your email address" type="email" />
                            <button
                                className="bg-primary hover:bg-[#8A5A44] text-white font-bold px-6 py-3 rounded-lg transition-colors whitespace-nowrap">
                                Join Club
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}
