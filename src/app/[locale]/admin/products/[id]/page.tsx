'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Card } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { ArrowLeft, Eye } from 'lucide-react';
import { ClientRouteMap } from '@/constants/client-route/client-route-map';
import { apiFetch } from '@/lib/api/apiFetch';
import { Product } from '@/types/product';
import { HeroSectionBackground } from '@/components/sections/HeroSection';
import ProductForm from '@/components/forms/ProductForm';


export default function EditProductPage() {
    const params = useParams();
    const router = useRouter();
    const productId = parseInt(params.id as string);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [product, setProduct] = useState<Product | null>(null);

    // Fetch product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`/api/products/${productId}`);
                const data = await response.json();

                if (response.ok) {
                    setProduct(data);
                } else {
                    setError(data.error || 'Failed to fetch product');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Network error occurred while fetching product');
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [productId]);

    const handleSubmit = async (productData: Product) => {
        setSaving(true);
        setError(null);

        try {
            const response = await apiFetch(ClientRouteMap.products.update.url(productId.toString()), {
                method: ClientRouteMap.products.update.method,
                body: JSON.stringify(productData),
            });
            const responseData = await response.json();

            if (response.ok) {
                router.push('/admin/products');
            } else {
                setError(responseData.error || 'Có lỗi xảy ra khi cập nhật sản phẩm');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Network error occurred while updating product');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        router.push('/admin/products');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary w-full">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    if (error && !loading) {
        return (
            <div className="min-h-screen bg-secondary w-full">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            Không tìm thấy sản phẩm
                        </h1>
                        <p className="text-muted-foreground mb-6">
                            {error}
                        </p>
                        <Button onClick={() => router.push('/admin/products')}>
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Quay lại
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <HeroSectionBackground>
            <Section className="py-16 flex-1 bg-transparent z-10">
                <Container className='bg-transparent'>
                    <div className="max-w-4xl mx-auto z-20">
                        <div className="flex justify-between items-center mb-8">
                            <div className="text-white">
                                <Button
                                    variant="outline"
                                    onClick={() => router.push('/admin/products')}
                                    className="flex items-center gap-2 mb-4"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Quay lại
                                </Button>
                                <h1 className="text-3xl font-bold text-primary mb-2">
                                    Chỉnh sửa sản phẩm
                                </h1>
                                <p className="text-muted-foreground">
                                    Cập nhật thông tin sản phẩm
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => router.push(`/products/${productId}`)}
                                className="flex items-center gap-2"
                            >
                                <Eye className="w-5 h-5" />
                                Xem sản phẩm
                            </Button>
                        </div>

                        <Card className="p-8 bg-black/30">
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{error}</p>
                                </div>
                            )}

                            <ProductForm
                                product={product}
                                onSubmit={handleSubmit}
                                onCancel={handleCancel}
                                isEditing={true}
                                loading={saving}
                            />
                        </Card>
                    </div>
                </Container>
            </Section>
        </HeroSectionBackground>
    );
}
