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

type Params = Promise<{ id: string }>;

export default function ProductDetail() {
    const params = useParams();
    const productId = parseInt(params.id as string);

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch product details from API
                const response = await fetch(`/api/products/${productId}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError('Sản phẩm không tồn tại');
                    } else {
                        setError('Không thể tải thông tin sản phẩm');
                    }
                    setLoading(false);
                    return;
                }

                const productData: Product = await response.json();

                // Ensure features and image_url are always arrays
                const transformedProduct: Product = {
                    ...productData,
                    features: Array.isArray(productData.features)
                        ? productData.features
                        : productData.features
                            ? [productData.features]
                            : [],
                    image_url: Array.isArray(productData.image_url)
                        ? productData.image_url
                        : productData.image_url
                            ? [productData.image_url]
                            : [productData.thumbnail_url || '/solar.svg']
                };

                setProduct(transformedProduct);

                // Fetch related products from the same category
                try {
                    const relatedResponse = await fetch(`/api/products?category=${productData.category}&per_page=4`);
                    if (relatedResponse.ok) {
                        const data = await relatedResponse.json();
                        console.log(data);
                        if (data.products && data.products.length > 0) {
                            console.log(productData.id);
                            const related = data.products
                                ?.filter((p: Product) => p.id != productData.id)
                                ?.slice(0, 4) || [];
                            setRelatedProducts(related);
                        }
                    }
                } catch (relatedError) {
                    console.warn('Failed to fetch related products:', relatedError);
                    // Don't set error for related products failure, just log it
                }

            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Đã xảy ra lỗi khi tải dữ liệu');
            }

            setLoading(false);
        };

        if (productId && !isNaN(productId)) {
            fetchProduct();
        } else {
            setError('ID sản phẩm không hợp lệ');
            setLoading(false);
        }
    }, [productId]);

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
