'use client';

import { useTranslations } from 'next-intl';
import { Container, Section, Card, Button } from '@/components/ui';
import { Product, RelatedProduct } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ProductDetailSectionProps {
    product: Product;
    relatedProducts: RelatedProduct[];
}

const ProductDetailSection = ({ product, relatedProducts }: ProductDetailSectionProps) => {
    const t = useTranslations('products.productDetail');
    const tCategories = useTranslations('products.categories');
    const [selectedImage, setSelectedImage] = useState(product.image_url);
    const [quantity, setQuantity] = useState(1);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const getCategoryLabel = (category: string) => {
        const categoryTranslations: Record<string, string> = {
            solar: tCategories('solar.title'),
            wind: tCategories('wind.title'),
            hydro: tCategories('hydro.title'),
            battery: tCategories('battery.title'),
            inverter: tCategories('inverter.title'),
        };
        return categoryTranslations[category] || category;
    };

    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        console.log('Adding to cart:', { product: product.id, quantity });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // TODO: Show toast notification
        }
    };

    return (
        <Section className="py-16">
            <Container>
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/products"
                        className="text-primary hover:text-accent transition-colors"
                    >
                        ← {t('backToProducts')}
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                            <Image
                                src={selectedImage}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image Gallery */}
                        <div className="grid grid-cols-4 gap-2">
                            {[product.image_url, product.image_url, product.image_url].map((image, index) => (
                                <div
                                    key={index}
                                    className="aspect-square relative overflow-hidden rounded-lg cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <Image
                                        src={image}
                                        alt={`${product.name} ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                                {getCategoryLabel(product.category)}
                            </span>
                            <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                                {product.name}
                            </h1>
                            <div className="text-3xl font-bold text-accent mb-6">
                                {formatPrice(product.price)}
                            </div>
                        </div>

                        <div className="prose prose-lg max-w-none">
                            <p className="text-muted-foreground leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <label className="text-sm font-medium text-secondary">
                                    Số lượng:
                                </label>
                                <div className="flex items-center border rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-2 border-x">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-3 py-2 hover:bg-gray-100 transition-colors"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    onClick={handleAddToCart}
                                    className="flex-1"
                                    size="lg"
                                >
                                    {t('addToCart')}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleShare}
                                    size="lg"
                                >
                                    {t('share')}
                                </Button>
                            </div>
                        </div>

                        {/* Product Features */}
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-primary mb-4">
                                {t('features')}
                            </h3>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                                    Chất lượng cao, bền bỉ
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                                    Bảo hành 25 năm
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                                    Hiệu suất cao, tiết kiệm năng lượng
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-accent rounded-full"></span>
                                    Dễ dàng lắp đặt và bảo trì
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>

                {/* Product Specifications */}
                <Card className="p-8 mb-16">
                    <h2 className="text-2xl font-bold text-primary mb-6">
                        {t('specifications')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-secondary">Công suất</span>
                                <span className="font-medium">300W</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-secondary">Hiệu suất</span>
                                <span className="font-medium">20.5%</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-secondary">Kích thước</span>
                                <span className="font-medium">1956 x 992 x 40mm</span>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-secondary">Trọng lượng</span>
                                <span className="font-medium">22kg</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-secondary">Bảo hành</span>
                                <span className="font-medium">25 năm</span>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <span className="text-secondary">Xuất xứ</span>
                                <span className="font-medium">Việt Nam</span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                            {t('relatedProducts')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300">
                                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                        <Image
                                            src={relatedProduct.image_url}
                                            alt={relatedProduct.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                                            {relatedProduct.name}
                                        </h3>
                                        <div className="text-accent font-bold mb-3">
                                            {formatPrice(relatedProduct.price)}
                                        </div>
                                        <Link href={`/products/${relatedProduct.id}`}>
                                            <Button className="w-full" variant="outline" size="sm">
                                                Xem chi tiết
                                            </Button>
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </Section>
    );
};

export default ProductDetailSection;
