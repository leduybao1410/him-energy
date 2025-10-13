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


export const mockFeatures = ["Chất lượng cao, bền bỉ", "Bảo hành 25 năm", "Hiệu suất cao, tiết kiệm năng lượng", "Dễ dàng lắp đặt và bảo trì"]
// Mock data - sẽ thay thế bằng API call thực tế
export const mockProducts: Product[] = [
    {
        id: 1,
        name: "Tấm Pin Mặt Trời Mono 300W",
        slug: "tam-pin-mat-troi-mono-300w",
        description: "Tấm pin mặt trời mono silicon hiệu suất cao, phù hợp cho hệ thống điện mặt trời dân dụng và thương mại.",
        price: 2500000,
        category: "solar",
        image_url: ["/solar.svg"],
        features: mockFeatures,
        thumbnail_url: "/solar.svg",
        specifications: {
            capacity: "300W",
            efficiency: "20.5%",
            size: "1956 x 992 x 40mm",
            weight: "10kg",
            warranty: "25 năm",
            origin: "Việt Nam"
        }
    },
    {
        id: 2,
        name: "Turbine Gió 1KW",
        slug: "turbine-gio-1kw",
        description: "Turbine gió công suất 1KW, thiết kế tối ưu cho vùng có tốc độ gió trung bình.",
        price: 15000000,
        category: "wind",
        image_url: ["/wind.svg"],
        features: mockFeatures,
        thumbnail_url: "/wind.svg",
        specifications: {
            capacity: "1KW",
            efficiency: "20.5%",
            size: "1956 x 992 x 40mm",
            weight: "10kg",
            warranty: "25 năm",
            origin: "Việt Nam"
        }
    },
    {
        id: 3,
        name: "Pin Lưu Trữ Lithium 5KWh",
        slug: "pin-luu-tru-lithium-5kwh",
        description: "Hệ thống pin lưu trữ lithium-ion công nghệ cao, dung lượng 5KWh.",
        price: 18000000,
        category: "battery",
        image_url: ["/hydro.svg"],
        features: mockFeatures,
        thumbnail_url: "/hydro.svg",
        specifications: {
            capacity: "5KWh",
            efficiency: "20.5%",
            size: "1956 x 992 x 40mm",
            weight: "10kg",
            warranty: "25 năm",
            origin: "Việt Nam"
        }
    },
    {
        id: 4,
        name: "Biến Tần Hybrid 5KW",
        slug: "bien-tan-hybrid-5kw",
        description: "Biến tần hybrid công suất 5KW, tích hợp MPPT và bộ sạc pin.",
        price: 12000000,
        category: "inverter",
        image_url: ["/solar.svg"],
        features: mockFeatures,
        thumbnail_url: "/solar.svg",
        specifications: {
            capacity: "5KW",
            efficiency: "20.5%",
            size: "1956 x 992 x 40mm",
            weight: "10kg",
            warranty: "25 năm",
            origin: "Việt Nam"
        }
    },
    {
        id: 5,
        name: "Tấm Pin Poly 250W",
        slug: "tam-pin-poly-250w",
        description: "Tấm pin mặt trời poly silicon, giá cả hợp lý cho các dự án quy mô lớn.",
        price: 2000000,
        category: "solar",
        image_url: ["/solar.svg"],
        features: mockFeatures,
        thumbnail_url: "/solar.svg",
        specifications: {
            capacity: "250W",
            efficiency: "20.5%",
            size: "1956 x 992 x 40mm",
            weight: "10kg",
            warranty: "25 năm",
            origin: "Việt Nam"
        }
    },
    {
        id: 6,
        name: "Turbine Gió 500W",
        slug: "turbine-gio-500w",
        description: "Turbine gió mini công suất 500W, phù hợp cho hộ gia đình.",
        price: 8000000,
        category: "wind",
        image_url: ["/wind.svg"],
        features: mockFeatures,
        thumbnail_url: "/wind.svg",
        specifications: {
            capacity: "500W",
            efficiency: "20.5%",
            size: "1956 x 992 x 40mm",
            weight: "10kg",
            warranty: "25 năm",
            origin: "Việt Nam"
        }
    }
];

export const mockRelatedProducts: RelatedProduct[] = [
    {
        id: 1,
        name: "Tấm Pin Mặt Trời Mono 300W",
        slug: "tam-pin-mat-troi-mono-300w",
        price: 15000000,
        category: "solar",
        thumbnail_url: "/solar.svg",
        description: "Tấm Pin Mặt Trời Mono 300W"
    },
    {
        id: 2,
        name: "Turbine Gió 1KW",
        slug: "turbine-gio-1kw",
        price: 15000000,
        category: "wind",
        thumbnail_url: "/wind.svg",
        description: "Turbine gió 1KW"
    },
    {
        id: 3,
        name: "Pin Lưu Trữ Lithium 5KWh",
        slug: "pin-luu-tru-lithium-5kwh",
        price: 18000000,
        category: "battery",
        thumbnail_url: "/hydro.svg",
        description: "Pin Lưu Trữ Lithium 5KWh"
    },
    {
        id: 4,
        name: "Biến Tần Hybrid 5KW",
        slug: "bien-tan-hybrid-5kw",
        price: 12000000,
        category: "inverter",
        thumbnail_url: "/solar.svg",
        description: "Biến Tần Hybrid 5KW"
    },
    {
        id: 5,
        name: "Tấm Pin Poly 250W",
        slug: "tam-pin-poly-250w",
        price: 2000000,
        category: "solar",
        thumbnail_url: "/solar.svg",
        description: "Tấm Pin Poly 250W"
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
            if (currentFilters.min_price) {
                queryParams.append('min_price', currentFilters.min_price.toString());
            }
            if (currentFilters.max_price) {
                queryParams.append('max_price', currentFilters.max_price.toString());
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
