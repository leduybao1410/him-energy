'use client';

import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ProductDetailSection,
    ContactSection
} from "@/components/sections";
import { useProduct, useRelatedProducts } from '@/hooks/useProducts';

type Params = Promise<{ id: string }>;

export default function ProductDetail() {
    const params = useParams();
    const productId = params.id as string;

    const { product, loading, error } = useProduct(productId);
    const { relatedProducts } = useRelatedProducts(productId, 4);

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary w-full align-center justify-center">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Đang tải thông tin sản phẩm...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || (!loading && !product)) {
        return (
            <div className="min-h-screen bg-secondary w-full align-center justify-center">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            {error || 'Không tìm thấy sản phẩm'}
                        </h1>
                        <p className="text-muted-foreground">
                            {error === 'Sản phẩm không tồn tại'
                                ? 'Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'
                                : 'Vui lòng thử lại sau hoặc liên hệ với chúng tôi để được hỗ trợ.'
                            }
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            {product && (
                <ProductDetailSection
                    product={product}
                    relatedProducts={relatedProducts}
                />
            )}
            <ContactSection />
        </div>
    );
}
