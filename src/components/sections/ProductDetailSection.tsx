'use client'

import { useTranslations } from 'next-intl';
import { Container, Section, Card, Button, AnimationSection } from '@/components/ui';
import { Product, RelatedProduct } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { placeholderImage } from '@/lib/utils';

interface ProductDetailSectionProps {
    product: Product;
    relatedProducts: Product[];
}

export const getCategoryLabel = (category: string, tCategories: any) => {
    const categoryTranslations: Record<string, string> = {
        solar: tCategories('solar.title'),
        wind: tCategories('wind.title'),
        hydro: tCategories('hydro.title'),
        battery: tCategories('battery.title'),
        inverter: tCategories('inverter.title'),
    };
    return categoryTranslations[category] || category;
};


const ProductDetailSection = ({ product, relatedProducts }: ProductDetailSectionProps) => {
    const t = useTranslations('products.productDetail');
    const tCategories = useTranslations('products.categories');
    const [selectedImage, setSelectedImage] = useState(product.image_url);

    return (
        <Section className="py-16">
            <Container className='flex flex-col gap-4'>
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/products"
                        className="text-primary hover:text-accent transition-colors"
                    >
                        ← {t('backToProducts')}
                    </Link>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
                    <div className="space-y-4">
                        <div className="aspect-square relative overflow-hidden rounded-lg shadow-sm">
                            <Image
                                src={selectedImage[0]}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Image Gallery */}
                        {Array.isArray(product.image_url) && product.image_url.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.image_url.map((image, index) => (
                                    <div
                                        key={index}
                                        className="aspect-square relative overflow-hidden rounded-lg cursor-pointer border-2 border-transparent hover:border-primary transition-colors"
                                        onClick={() => setSelectedImage([image])}
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
                        )}
                    </div>

                    {/* Product Info */}
                    <AnimationSection
                        animation="slideInRight"
                        timing="normal"
                        delay="medium"
                        trigger="onMount"
                        className="my-0"
                        padding='none'
                        once
                    >
                        <div className="space-y-6">
                            <div>
                                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                                    {getCategoryLabel(product.category, tCategories)}
                                </span>
                                <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                                    {product.name}
                                </h1>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-muted-foreground leading-relaxed">
                                    {product.description}
                                </p>
                            </div>

                            {/* Product Features */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-primary mb-4">
                                    {t('features')}
                                </h3>
                                <ul className="space-y-2 text-muted-foreground">
                                    {Array.isArray(product.features) && product.features.length > 0 ? (
                                        product.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-muted-foreground italic">
                                            {t('noFeaturesAvailable') || 'No features available'}
                                        </li>
                                    )}
                                </ul>
                            </Card>
                        </div>
                    </AnimationSection>
                </div>

                {/* Product Specifications */}
                <AnimationSection
                    animation="slideInUp"
                    timing="normal"
                    delay="medium"
                    trigger="onMount"
                    className="my-0"
                    padding='none'
                    once
                >
                    <Card className="">
                        <div className="flex flex-row justify-between items-center">
                            <h2 className="text-2xl font-bold text-primary mb-6">
                                {t('specifications')}
                            </h2>
                            {product.pdf_url && (
                                <Button className="flex justify-end" onClick={() => window.open(product.pdf_url, '_blank')}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l4-4m-4 4l-4-4m16 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1" />
                                    </svg>
                                    {t('downloadPdf') || 'Tải PDF'}
                                </Button>
                            )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-secondary">Công suất</span>
                                    <span className="font-medium">{product.specifications?.capacity}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-secondary">Hiệu suất</span>
                                    <span className="font-medium">{product.specifications?.efficiency}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-secondary">Kích thước</span>
                                    <span className="font-medium">{product.specifications?.size}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-secondary">Trọng lượng</span>
                                    <span className="font-medium">{product.specifications?.weight}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-secondary">Bảo hành</span>
                                    <span className="font-medium">{product.specifications?.warranty}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b">
                                    <span className="text-secondary">Xuất xứ</span>
                                    <span className="font-medium">{product.specifications?.origin}</span>
                                </div>
                            </div>
                        </div>

                    </Card>
                </AnimationSection>


                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                            {t('relatedProducts')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                    <Link href={`/products/${relatedProduct.id}`}>
                                        <div className="relative aspect-square rounded-lg overflow-hidden">
                                            <Image
                                                src={relatedProduct.thumbnail_url || placeholderImage}
                                                alt={relatedProduct.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-primary mb-2 line-clamp-2">
                                                {relatedProduct.name}
                                            </h3>
                                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{relatedProduct.description}</p>
                                        </div>
                                    </Link>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </Section >
    );
};

export default ProductDetailSection;
