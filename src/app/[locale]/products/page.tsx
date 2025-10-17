'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ProductHeroSection,
    ProductFilterSection,
    ProductGridSection,
    ContactSection
} from "@/components/sections";
import { Product, ProductFilters, RelatedProduct } from '@/types/product';


export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<ProductFilters>({
        page: 1,
        per_page: 12
    });
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Real API call to get products
    const fetchProducts = async (currentFilters: ProductFilters) => {
        setLoading(true);

        try {
            // Build query parameters
            const queryParams = new URLSearchParams();

            if (currentFilters.category) {
                queryParams.append('category', currentFilters.category);
            }
            if (currentFilters.search) {
                queryParams.append('search', currentFilters.search);
            }
            if (currentFilters.sort) {
                queryParams.append('sort', currentFilters.sort);
            }
            if (currentFilters.page) {
                queryParams.append('page', currentFilters.page.toString());
            }
            if (currentFilters.per_page) {
                queryParams.append('per_page', currentFilters.per_page.toString());
            }

            // Make API call
            const response = await fetch(`/api/products?${queryParams.toString()}`);

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.totalPages);
            setTotalProducts(data.totalProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
            setTotalPages(1);
            setTotalProducts(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(filters);
    }, [filters]);

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
