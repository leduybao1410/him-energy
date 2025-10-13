'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ProductDetailSection,
    ContactSection
} from "@/components/sections";
import { Product, RelatedProduct } from '@/types/product';
import { mockProducts, mockRelatedProducts } from '../page';

export default function ProductDetail() {
    const params = useParams();
    const productId = parseInt(params.id as string);

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Find product by ID
            const foundProduct = mockProducts.find(p => p.id === productId);

            if (foundProduct) {
                setProduct(foundProduct);
                // Get related products (same category, excluding current product)
                const related = mockRelatedProducts.filter(
                    p => p.category === foundProduct.category && p.id !== foundProduct.id
                );
                setRelatedProducts(related)
            }

            setLoading(false);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary w-full align-center justify-center">
                <Header />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Đang tải thông tin sản phẩm...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-secondary w-full align-center justify-center">
                <Header />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            Không tìm thấy sản phẩm
                        </h1>
                        <p className="text-muted-foreground">
                            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <Header />
            <ProductDetailSection
                product={product}
                relatedProducts={relatedProducts}
            />
            <ContactSection />
            <Footer />
        </div>
    );
}
