import { cacheLife } from 'next/cache';
import { getTopCollections } from '@/lib/vendure/cached';
import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";


async function Copyright() {
    'use cache'
    cacheLife('days');

    return (
        <div>
            © {new Date().getFullYear()} La Maison Mahal. All rights reserved.
        </div>
    )
}

export async function Footer() {
    'use cache'
    cacheLife('days');

    const collections = await getTopCollections();

    return (
        <footer className="border-t border-border mt-auto">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <Link href="/" className="text-xl font-bold">
                            <Image src="/lmm-full.svg" alt="La Maison Mahal" width={40} height={50} className="h-18 w-auto dark:invert" />
                        </Link>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-4">Policies</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Shipping Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Refund Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Consignment Agreement
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="text-sm font-semibold mb-4">Collections</p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {collections.map((collection) => (
                                <li key={collection.id}>
                                    <Link
                                        href={`/collection/${collection.slug}`}
                                        className="hover:text-foreground transition-colors"
                                    >
                                        {collection.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Authenticity
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Shipping & Returns
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-foreground transition-colors"
                                >
                                    Sell with Us
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Bottom Section */}
                <div
                    className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <Copyright />
                    <div className="flex items-center gap-2">
                        <span>Powered by</span>
                        <span>Omnigami</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
