'use client';

import { useTranslations } from 'next-intl';
import { Container, Section, Card, Button } from '@/components/ui';
import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

interface ProductGridSectionProps {
    products: Product[];
    loading?: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const ProductGridSection = ({
    products,
    loading = false,
    currentPage,
    totalPages,
    onPageChange
}: ProductGridSectionProps) => {
    const t = useTranslations('products.productGrid');
    const tCategories = useTranslations('products.categories');

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

    if (loading) {
        return (
            <Section className="py-16">
                <Container>
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">{t('loading')}</p>
                    </div>
                </Container>
            </Section>
        );
    }

    if (products.length === 0) {
        return (
            <Section className="py-16">
                <Container>
                    <div className="text-center">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-primary mb-2">
                            {t('noProducts')}
                        </h3>
                        <p className="text-muted-foreground">
                            Hãy thử điều chỉnh bộ lọc để tìm sản phẩm phù hợp
                        </p>
                    </div>
                </Container>
            </Section>
        );
    }

    return (
        <Section className="py-16">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 mb-12">
                    {products.map((product) => (
                        <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
                            <div className="relative aspect-square overflow-hidden rounded-t-lg">
                                <Link href={`/products/${product.id}`}>
                                    <Image
                                        src={product.image_url[0]}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </Link>
                                <div className="absolute top-2 left-2 bg-primary-600 p-1 rounded-lg">
                                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                                        {getCategoryLabel(product.category)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <Link href={`/products/${product.id}`}>
                                    <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>
                                </Link>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl font-bold text-accent">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            {t('pagination.previous')}
                        </Button>

                        <div className="flex gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <Button
                                    key={page}
                                    variant={page === currentPage ? "primary" : "outline"}
                                    onClick={() => onPageChange(page)}
                                    className="w-10 h-10"
                                >
                                    {page}
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            {t('pagination.next')}
                        </Button>
                    </div>
                )}
            </Container>
        </Section>
    );
};

export default ProductGridSection;
