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
import { Product, ProductFilters, ProductListResponse } from '@/types/product';

// Mock data - sẽ thay thế bằng API call thực tế
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Tấm Pin Mặt Trời Mono 300W",
        slug: "tam-pin-mat-troi-mono-300w",
        description: "Tấm pin mặt trời mono silicon hiệu suất cao, phù hợp cho hệ thống điện mặt trời dân dụng và thương mại.",
        price: 2500000,
        category: "solar",
        image_url: "/solar.svg"
    },
    {
        id: 2,
        name: "Turbine Gió 1KW",
        slug: "turbine-gio-1kw",
        description: "Turbine gió công suất 1KW, thiết kế tối ưu cho vùng có tốc độ gió trung bình.",
        price: 15000000,
        category: "wind",
        image_url: "/wind.svg"
    },
    {
        id: 3,
        name: "Pin Lưu Trữ Lithium 5KWh",
        slug: "pin-luu-tru-lithium-5kwh",
        description: "Hệ thống pin lưu trữ lithium-ion công nghệ cao, dung lượng 5KWh.",
        price: 18000000,
        category: "battery",
        image_url: "/hydro.svg"
    },
    {
        id: 4,
        name: "Biến Tần Hybrid 5KW",
        slug: "bien-tan-hybrid-5kw",
        description: "Biến tần hybrid công suất 5KW, tích hợp MPPT và bộ sạc pin.",
        price: 12000000,
        category: "inverter",
        image_url: "/solar.svg"
    },
    {
        id: 5,
        name: "Tấm Pin Poly 250W",
        slug: "tam-pin-poly-250w",
        description: "Tấm pin mặt trời poly silicon, giá cả hợp lý cho các dự án quy mô lớn.",
        price: 2000000,
        category: "solar",
        image_url: "/solar.svg"
    },
    {
        id: 6,
        name: "Turbine Gió 500W",
        slug: "turbine-gio-500w",
        description: "Turbine gió mini công suất 500W, phù hợp cho hộ gia đình.",
        price: 8000000,
        category: "wind",
        image_url: "/wind.svg"
    }
];

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<ProductFilters>({
        page: 1,
        per_page: 12
    });
    const [totalPages, setTotalPages] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);

    // Mock API call
    const fetchProducts = async (currentFilters: ProductFilters) => {
        setLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        let filteredProducts = [...mockProducts];

        // Apply filters
        if (currentFilters.category) {
            filteredProducts = filteredProducts.filter(
                product => product.category === currentFilters.category
            );
        }

        if (currentFilters.search) {
            filteredProducts = filteredProducts.filter(
                product =>
                    product.name.toLowerCase().includes(currentFilters.search!.toLowerCase()) ||
                    product.description.toLowerCase().includes(currentFilters.search!.toLowerCase())
            );
        }

        if (currentFilters.min_price) {
            filteredProducts = filteredProducts.filter(
                product => product.price >= currentFilters.min_price!
            );
        }

        if (currentFilters.max_price) {
            filteredProducts = filteredProducts.filter(
                product => product.price <= currentFilters.max_price!
            );
        }

        // Apply sorting
        if (currentFilters.sort) {
            switch (currentFilters.sort) {
                case 'priceLow':
                    filteredProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'priceHigh':
                    filteredProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default: // newest
                    filteredProducts.sort((a, b) => b.id - a.id);
            }
        }

        // Pagination
        const page = currentFilters.page || 1;
        const perPage = currentFilters.per_page || 12;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
        const totalPages = Math.ceil(filteredProducts.length / perPage);

        setProducts(paginatedProducts);
        setTotalPages(totalPages);
        setTotalProducts(filteredProducts.length);
        setLoading(false);
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
            <Header />
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
            <Footer />
        </div>
    );
}
