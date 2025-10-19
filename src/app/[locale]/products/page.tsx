'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ProductHeroSection,
    ProductFilterSection,
    ProductGridSection,
    ContactSection
} from "@/components/sections";
import { ProductFilters } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';

export default function Products() {
    const [filters, setFilters] = useState<ProductFilters>({
        page: 1,
        per_page: 12
    });

    const { products, loading, totalPages, totalProducts } = useProducts(filters);

    const handleFiltersChange = (newFilters: ProductFilters) => {
        setFilters(newFilters);
    };

    const handlePageChange = (page: number) => {
        setFilters(prev => ({ ...prev, page }));
    };

    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <ProductHeroSection />
            <ProductFilterSection
                filters={filters}
                onFiltersChange={handleFiltersChange}
                totalProducts={totalProducts}
            />
            <ProductGridSection
                products={products}
                loading={loading}
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
            <ContactSection />
        </div>
    );
}
